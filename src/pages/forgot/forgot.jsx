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
import ForgotForm from "../../section/auth/login/ForgotForm";
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
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
  boxShadow: '0 8px 16px 0 rgba(32, 101, 209, 0.24)'
});

// ----------------------------------------------------------------------

export default function ForgotPage() {
  return (
    <>
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <HeadingStyle component={'div'}>
              <img src="/assets/logo.png" style={{ width: '60%', margin: 'auto'}} />
              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Olvidaste la contraseña
              </Typography>
            </HeadingStyle>
            <ForgotForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
