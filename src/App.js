import React from "react";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import MainApp from "./components/MainApp";

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading....</div>;

  return (
    <>
      <LoginButton />
      <Profile />
      <MainApp />
    </>
  );
}

export default App;
