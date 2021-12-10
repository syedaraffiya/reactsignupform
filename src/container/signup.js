import { useState } from "react";
import Input from "../component/Input";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../config/firebase";
import { db, set, ref } from "../config/firebase";
import Box from '@mui/material/Box';


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    let obj = {
      name,
      email,
      password,
    };
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then((res) => {
        let uid = res.user.uid;
        console.log(uid);
        obj.uid = uid;
        const refrence = ref(db, `/users/${obj.uid}`);
        set(refrence, obj).then(() => {
          setEmail("");
          setPassword("");
          setName("");
          alert("user created Successfully");
        });
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
        <h1>Sign Up</h1>
        <form onSubmit={(e) => signUp(e)}>
          <div>
            <Input
              value={name}
              placeholder="Enter User Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <Button value="Sign Up" />
          </div>
        </form>
        <div>
          <Link to="/login">Login</Link>
        </div>
        </Box>
      </div>
    </>
  );
}
export default SignUp;