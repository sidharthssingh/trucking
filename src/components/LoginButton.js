import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <Button
        variant="contained"
        color="primary"
        onClick={() => loginWithRedirect()}
        style={{ margin: "auto", display: "block" }}
      >
        Login
      </Button>
    )
  );
};

export default LoginButton;
