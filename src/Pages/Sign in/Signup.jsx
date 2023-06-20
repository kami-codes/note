import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import spinner from "../../assets/loading.gif";

const Signup = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  const handleSigninClick = async () => {
    setLoading(true);
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "userInformation", data.user.uid), {
        name: name,
        email: email,
        uid: data.user.uid,
      });
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
    navigate("/");
  };

  const handleGoogleClick = async () => {
    setLoading(true);
    try {
      const data = await signInWithPopup(auth, googleProvider);
      setLoading(false);
      if (user) {
        await setDoc(doc(db, "userInformation", data.user.uid), {
          name: name,
          email: email,
          uid: data.user.uid,
        });
        navigate("/");
      }
    } catch (error) {
      setErr(true);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
      setErr(false);
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="signup">
      <div className="signupContainer">
        <span>Note-app Signup</span>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleSigninClick}>
          {loading ? <img src={spinner} /> : "Signup"}
        </button>
        <hr />
        <div onClick={handleGoogleClick} className="google">
          <img
            src="https://img.freepik.com/free-icon/search_318-265146.jpg"
            alt=""
          />
          <p>Sign in with Google</p>
        </div>
        <Link to="/login">
          <p>Already have an account? Login</p>
        </Link>
        {err && <p style={{ color: "red" }}>Something went wrong try again</p>}
      </div>
    </div>
  );
};

export default Signup;
