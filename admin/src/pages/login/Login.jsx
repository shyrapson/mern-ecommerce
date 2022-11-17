import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../userList/redux/apiCalls"
import './login.css';

const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  console.log({email,password})
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="login-container" >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
