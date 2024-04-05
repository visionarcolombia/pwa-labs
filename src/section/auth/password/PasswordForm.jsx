import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Alert,
  FormControlLabel,
  Modal,
  Typography,
  Dialog,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { config } from "../../../config";
import ReactSession from "../../../adapters/session/session";
import { apiUrl } from "../../../config/api";
import useNotifications from "../../../hooks/useNotification";
import { Box } from "@mui/system";
import { EditorState, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

// ----------------------------------------------------------------------

export default function PasswordForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [, notificationsActions] = useNotifications();
  const [modalTerms, setModalTerms] = useState(false);
  const [user, setUser] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const schema = yup
    .object()
    .shape({
      password: yup
        .string()
        .required("Este campo es requerido")
        .min(8, "La contraseña debe contener 8 caracteres")
        .matches(/[0-9]/, "La contraseña requiere un número")
        .matches(/[a-z]/, "La contraseña requiere una letra minúscula")
        .matches(/[A-Z]/, "La contraseña requiere una letra mayúscula")
        .matches(/[^\w]/, "La contraseña requiere un símbolo"),
      confirmPwd: yup
        .string()
        .required("Este campo es requerido")
        .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
      terms: yup
        .bool()
        .oneOf([true], "Debe aceptar los terminos y condiciones"),
    })
    .required();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const handlePass = async (valuesForm) => {
    try {
      fetch(`${apiUrl}/users/${user && user.id}`, {
        method: "POST",
        body: JSON.stringify({ newPassord: valuesForm.password }),
        headers: { 
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${ReactSession.get('user')}`
        },
      })
        .then((response) => {
          if (!response.ok) {
            notificationsActions.push({
              options: {
                content: (
                  <Alert
                    sx={{ backgroundColor: "#fff" }}
                    variant="outlined"
                    severity="error"
                  >
                    {`${response.status} - ${response.statusText}`}
                  </Alert>
                ),
              },
            });
          } else {
            return response.json();
          }
        })
        .then((json) => {
          if (json) {
            ReactSession.remove('user');
            navigate('/login',{replace: true})
          }
        })
        .catch((err) => {
          notificationsActions.push({
            options: {
              content: (
                <Alert
                  sx={{ backgroundColor: "#fff" }}
                  variant="outlined"
                  severity="error"
                >
                  {{ err }}
                </Alert>
              ),
            },
          });
        });
    } catch (error) {
      notificationsActions.push({
        options: {
          content: (
            <Alert
              sx={{ backgroundColor: "#fff" }}
              variant="outlined"
              severity="error"
            >
              {{ error }}
            </Alert>
          ),
        },
      });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const token = ReactSession.get("user");
    if (token) {
      const object = JSON.parse(window.atob(token.split(".")[1]));
      setUser({
        username: object.username,
        email: object.email,
        id: object.sub,
      });
      handlerTerms(token)
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  const handlerTerms = (token) => {
    try {
      fetch(`${apiUrl}/terms`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            notificationsActions.push({
              options: {
                content: (
                  <Alert
                    sx={{ backgroundColor: "#fff" }}
                    variant="outlined"
                    severity="error"
                  >
                    {`${response.status} - ${response.statusText}`}
                  </Alert>
                ),
              },
            });
          }
        })
        .then((json) => {
          if (json) {
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(json[0].terms))))
          }
        })
        .catch((err) => {
          notificationsActions.push({
            options: {
              content: (
                <Alert
                  sx={{ backgroundColor: "#fff" }}
                  variant="outlined"
                  severity="error"
                >
                  {err}
                </Alert>
              ),
            },
          });
        });
    } catch (error) {
      notificationsActions.push({
        options: {
          content: (
            <Alert
              sx={{ backgroundColor: "#fff" }}
              variant="outlined"
              severity="error"
            >
              {error}
            </Alert>
          ),
        },
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(handlePass)}>
      <Stack spacing={3}>
        <Controller
          render={({ field }) => (
            <TextField
              label="Nueva Contraseña"
              error={!!errors.password}
              helperText={errors?.password?.message}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
          name="password"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <TextField
              label="Confirmar la nueva contraseña"
              error={!!errors.password}
              helperText={errors?.password?.message}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...field}
            />
          )}
          name="confirmPwd"
          control={control}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Controller
          control={control}
          name="terms"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={<Checkbox checked={value} onChange={onChange} />}
              label={
                <p>
                  Acepto los
                  <Link
                    sx={{ paddingLeft: 0.5 }}
                    onClick={(e) => {
                      e.preventDefault();
                    setModalTerms(true)
                    }}
                  >
                    terminos y condiciones de uso
                  </Link>
                </p>
              }
            />
          )}
        />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={!isDirty || !isValid}
      >
        Cambiar contraseña
      </LoadingButton>
      <Dialog
      fullWidth
      maxWidth='lg'
        open={modalTerms}
        onClose={() => setModalTerms(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{p: 5}}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Terminos y condiciones de uso
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div dangerouslySetInnerHTML={{ __html: stateToHTML(editorState.getCurrentContent())}} />
          </Typography>
        </Box>
      </Dialog>
    </form>
  );
}
