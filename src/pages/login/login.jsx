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

export default function LoginPage() {
  return (
    <>
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <HeadingStyle component={'div'}>
              <img src="/assets/logo.png" style={{ width: '60%', margin: 'auto'}} />
              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Inicie sesión con su cuenta
              </Typography>
            </HeadingStyle>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
}
