import { Fragment } from "react";
import { CssBaseline } from "@mui/material";
import SW from "./adapters/SW/SW";
import Router from "./routes";
import ReactSession from "./adapters/session/session";

function App() {
  ReactSession.setStoreType('cookie')
  return (
    <Fragment>
      <CssBaseline />
      <SW />
      <Router />
    </Fragment>
  );
}

export default App;
