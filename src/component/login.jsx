import React, { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth, db, storage } from "../firebase-config";
import {
  collection,
  onSnapshot,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userRef = collection(db, "Users");
        const getUser = async () => {
          const q = query(userRef, where("userID", "==", user.uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
          });
        };
        getUser().then(() => {
          navigate(`/map/${user.uid}`);
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" onClick={signIn}>
        Login
      </button>
    </div>
  );
};
