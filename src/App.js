import Login from "./Pages/Login/Login";
import "./style.scss"
import Signup from "./Pages/Sign in/Signup"
import { BrowserRouter, Routes, Route, Navigate, useNavigate, redirect } from "react-router-dom";
import Home from "./components/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {user, setUser} = useContext(AuthContext)

  

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }else{
      return children
    }

  };

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
