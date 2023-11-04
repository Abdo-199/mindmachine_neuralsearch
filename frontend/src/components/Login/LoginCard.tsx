import "../../styles/Login/LoginStyles.css";
import { useState } from "react";

async function Login(username: string, password: string) {

  //Weiterleitung zu MainWindow (erst einmal... später wird das geändert)
  
  // create user object
  let data = { username: username, password: password };

  let fetchData = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = "http://localhost:5000/api/login";
  const response = await fetch(url, fetchData)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let user = data;
      console.log(user);
      // check if user is authenticated (needs to be updated with the correct property)
      if (!user.isAuthenticated) {
        // push an error warning due to wrong credentials
        alert("Error. Wrong Credentials");
      }
      else {
        localStorage.setItem("userID", username)
        localStorage.setItem("isAdmin", user.isAdmin)
        // TODO weiterleiten zu HomeWindow
        
      }
    })
    .catch(function (error) {
      console.log(error);
    });

}

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    // Username input, password input, ... on a card
    <div className="loginContainer">
      <img
        className="avatar"
        // put in a much cooler logo for our web-app maybe?
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9YZj5Mx_JuC9-pYmy9DLJD9gTMl-jvV5lRoUNti104l9fSOxRqyE40rMajuUD2JYDCy0&usqp=CAU"
        alt="avatar"
        width={100}
        height={100}
      />
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <br></br>
      <input
        id="username"
        placeholder="type in username ..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <br></br>
      <label htmlFor="password">Password</label>
      <br></br>
      <input
        id="password"
        placeholder="type in password ..."
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br></br>
      <br></br>
      <div>
        <button onClick={() => Login(username, password)}>Login</button>
      </div>
    </div>
    //
  );
};

export default LoginCard;
