// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Card,
  Box,
} from "@mui/material";
import LoginForm from "../../section/auth/login/LoginForm";
import Logo from "../../components/logo/logo";
import PasswordForm from "../../section/auth/password/PasswordForm";
// sections

// ----------------------------------------------------------------------
const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 700,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

// ----------------------------------------------------------------------

export default function PasswordPage() {
  return (
    <>
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <HeadingStyle component={'div'}>
              <img src="/assets/logo.png" style={{ width: '60%', margin: 'auto'}} />
              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Cambio de contraseña
              </Typography>
            </HeadingStyle>
            <PasswordForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
