import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext)
  async function login(event){
    event.preventDefault();
    const response = await fetch("https://blogger-2bi2.onrender.com/login",{
      method:"POST",
      body:JSON.stringify({username,password}),
      headers: {"Content-Type":"application/json"},
      credentials : "include",
    });

    if(response.ok){
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }else{
      alert("wrong credentials")
    }

  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input 
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        autoComplete="new-password"
        value={password}
        onChange={(event) =>setPassword(event.target.value)}

      />
      <button>Login</button>
    </form>
  );
}
