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
// components
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { apiUrl } from "../../../config/api";
import useNotifications from "../../../hooks/useNotification";

// ----------------------------------------------------------------------

export default function ForgotForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [, notificationsActions] = useNotifications();

  const schema = yup
    .object({
      email: yup.string().required("Este campo es requerido").email('Ingrese un formato de email válido'),
    })
    .required();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  console.log(errors)

  const handleForgot = async (valuesForm) => {
    try {
      fetch(`${apiUrl}/auth/forgot`, {
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
            notificationsActions.push({
                options: {
                  content: (
                    <Alert
                      sx={{ backgroundColor: "#fff" }}
                      variant="outlined"
                      severity="success"
                    >
                      New password has been send to email
                    </Alert>
                  )
                }
              })
              navigate('/login', {replace: true})
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
    <form onSubmit={handleSubmit(handleForgot)}>
      <Stack spacing={3} sx={{mb: 3}}>
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
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={!isValid}
      >
        Enviar solicitud
      </LoadingButton>
    </form>
  );
}
