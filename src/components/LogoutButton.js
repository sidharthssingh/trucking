import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={() => logout()}
        style={{ margin: "20px 0" }}
      >
        Log Out
      </Button>
    )
  );
};

export default LogoutButton;
