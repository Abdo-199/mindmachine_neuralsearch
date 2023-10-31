import "./LoginStyles.css";
import {useState} from 'react'

export function checkUser(username, password){
  // temporary
  username = true
  password = true
  // console.log(password)

  // user/admin creds ok
  if (username == true && password == true){
    // TODO check if user is admin
    // ...
    if (username == 'admin'){
      // if its the admin  -> route to Admin Page
    }
    // if its a normal user -> route to User Page
    // ...
    return true
  
    // user/admin creds not ok
  } else {
    alert("Error. Try again.")
    return false
  }

  // and then somehow lead user and admin to their specific page, solutions: history, router ...
}

const LoginCard = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      <input id="username" placeholder="type in username ..." value={username} onChange={e => setUsername(e.target.value)}>
      </input>
      <br></br>
      <label htmlFor="password">Password</label>
      <br></br>
      <input id="password" placeholder="type in password ..." type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
      <br></br>
      <br></br>
      <div>
        <button onClick={() => checkUser(username, password)}>
          Login
        </button>
      </div>
    </div>
    //
  );
};

export default LoginCard;
