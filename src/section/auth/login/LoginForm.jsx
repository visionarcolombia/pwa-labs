import { useState } from "react";
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

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [, notificationsActions] = useNotifications();

  const schema = yup
    .object({
      email: yup.string().required("Este campo es requerido"),
      password: yup.string().required("Este campo es requerido"),
    })
    .required();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleUser = async(token) => {
    const object = JSON.parse(window.atob(token.split('.')[1]))
    console.log(object)
    try {
      fetch(`${apiUrl}/users/${object.sub}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        if(!response.ok){
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
              )
            }
          })
        }else{
          return response.json()
        }
        
      }) 
      .then(json => {
        if(json){
          if(json.resetPassword){
            navigate('/app/change-password')
          }else{
            navigate('/app/home')
          }         
        }         
      })
      .catch(err => {
        notificationsActions.push({
          options: {
            content: (
              <Alert
                sx={{ backgroundColor: "#fff" }}
                variant="outlined"
                severity="error"
              >
                {{err}}
              </Alert>
            )
          }
        })
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
              {{error}}
            </Alert>
          )
        }
      })
    }
  }

  const handleLogin = async (valuesForm) => {
    try {
      fetch(`${apiUrl}/auth`, {
        method: "POST",
        body: JSON.stringify(valuesForm),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => {
        if(!response.ok){
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
              )
            }
          })
        }else{
          return response.json()
        }
        
      }) 
      .then(json => {
        console.log(json)
        if(json){
          notificationsActions.push({
            options: {
              content: (
                <Alert
                  sx={{ backgroundColor: "#fff" }}
                  variant="outlined"
                  severity="success"
                >
                  Login Success
                </Alert>
              )
            }
          })
          ReactSession.set("user", json.access_token);
          handleUser(json.access_token)
        }         
      })
      .catch(err => {
        notificationsActions.push({
          options: {
            content: (
              <Alert
                sx={{ backgroundColor: "#fff" }}
                variant="outlined"
                severity="error"
              >
                {{err}}
              </Alert>
            )
          }
        })
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
              {{error}}
            </Alert>
          )
        }
      })
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Stack spacing={3}>
        <Controller
          render={({ field }) => (
            <TextField
              type="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              label="Correo Electrónico"
              {...field}
            />
          )}
          name="email"
          control={control}
        />
        <Controller
          render={({ field }) => (
            <TextField
              label="Contraseña"
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
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Link variant="subtitle2" underline="hover" onClick={() => navigate('/forgot')}>
          ¿Olvidaste la contraseña?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={!isDirty || !isValid}
      >
        Iniciar sesión
      </LoadingButton>
    </form>
  );
}
