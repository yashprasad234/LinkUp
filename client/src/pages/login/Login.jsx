import "./login.css";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form className="loginForm" onSubmit={handleSubmit}>
              <input
                placeholder="Email"
                type="email"
                required
                ref={email}
                className="loginInput"
              />
              <input
                placeholder="Password"
                type={passwordHidden ? "password" : "text"}
                required
                ref={password}
                minLength={6}
                className="loginInput"
              />
              <span className="hiddenPasswordIconContainer">
                {passwordHidden ? (
                  <VisibilityOff
                    className="hiddenPasswordIcon"
                    style={{
                      display: passwordHidden ? "visible" : "hidden",
                    }}
                    onClick={() => setPasswordHidden(false)}
                  />
                ) : (
                  <Visibility
                    className="hiddenPasswordIcon"
                    style={{
                      display: passwordHidden ? "hidden" : "visible",
                      color: "black",
                    }}
                    onClick={() => setPasswordHidden(true)}
                  />
                )}
              </span>
              <button className="loginButton" disabled={isFetching}>
                {isFetching ? (
                  <CircularProgress size={"20px"} style={{ color: "white" }} />
                ) : (
                  "Log In"
                )}
              </button>
            </form>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/register")}
            >
              {isFetching ? (
                <CircularProgress size={"20px"} style={{ color: "white" }} />
              ) : (
                "Create a New Account"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
