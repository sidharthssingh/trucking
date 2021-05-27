import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div style={{ float: "right" }}>
        <img alt="User" src={user.picture} />
        <p>{user.name}</p>
        <p>{user.email}</p>
        <LogoutButton />
      </div>
    )
  );
};

export default Profile;
