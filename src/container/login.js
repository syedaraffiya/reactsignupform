import { useState } from "react";
import Input from "../component/Input";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../config/firebase";
import { useNavigate } from "react-router";
import { db, ref, onValue } from "../config/firebase";
import Box from '@mui/material/Box';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    let obj = {
      email,
      password,
    };
    signInWithEmailAndPassword(auth, obj.email, obj.password)
      .then((succes) => {
        console.log("User Sign In Successfully ", succes);
        const refrence = ref(db, `/users/${succes.user.uid}`);

        onValue(refrence, (snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            let userObj = snapshot.val();
            navigate("/", { state: userObj });
          }
        });

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(obj);
  };

  return (
    <>
      <div className="App-header">
      <Box   sx={{ p: 2,m:6, border: '1px dashed grey' }}>
     

        <h1>Login</h1>
        <form onSubmit={(e) => login(e)}>
          <div>
            <Input
              value={email}
              placeholder="Enter Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              value={password}
              placeholder="Enter Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button value="login" />
          </div>
        </form>
        <div>
          <Link to="/signup">Register</Link>
        </div>
        </Box>
      </div>
    </>
  );
}
export default Login;