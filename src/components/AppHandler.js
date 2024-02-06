import { useState } from "react";
import LogInForm from "./LogInForm";
import App from "./App";

function AppHandler() {
  const [logInStatus, setLogInStatus] = useState(false);
  const [userData, setUserData] = useState([]);

  function getUserAccount(accountDetails) {
    fetch(
      `https://localhost:7010/api/Users/${accountDetails.username}/${accountDetails.password}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("The user does not exist.");
        }
        return response.json();
      })
      .then((json) => {
        setUserData(json);
        setLogInStatus(true);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Invalid!");
      });
  }

  return (
    <div>
      {logInStatus === false ? (
        <LogInForm onLog={getUserAccount} />
      ) : (
        <App userName={userData.userName} userId={userData.id} />
      )}
    </div>
  );
}

export default AppHandler;
