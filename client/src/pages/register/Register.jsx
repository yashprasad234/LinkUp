import axios from "axios";
import "./register.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
  const navigate = useNavigate();

  const REQUEST_URL = "http://localhost:3000/api/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(`${REQUEST_URL}auth/register`, user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Lamasocial</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <form className="registerForm" onSubmit={handleSubmit}>
              <input
                placeholder="Username"
                required
                ref={username}
                type="text"
                className="registerInput"
              />
              <input
                placeholder="Email"
                required
                ref={email}
                type="email"
                className="registerInput"
              />
              <input
                placeholder="Password"
                required
                ref={password}
                type={passwordHidden ? "password" : "text"}
                className="registerInput"
                minLength={6}
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
              <input
                placeholder="Confirm Password"
                required
                ref={confirmPassword}
                type={confirmPasswordHidden ? "password" : "text"}
                className="registerInput"
              />
              <span className="hiddenConfirmPasswordIconContainer">
                {confirmPasswordHidden ? (
                  <VisibilityOff
                    className="hiddenPasswordIcon"
                    style={{
                      display: confirmPasswordHidden ? "visible" : "hidden",
                    }}
                    onClick={() => setConfirmPasswordHidden(false)}
                  />
                ) : (
                  <Visibility
                    className="hiddenPasswordIcon"
                    style={{
                      display: confirmPasswordHidden ? "hidden" : "visible",
                      color: "black",
                    }}
                    onClick={() => setConfirmPasswordHidden(true)}
                  />
                )}
              </span>
              <button className="registerButton" type="submit">
                Sign Up
              </button>
            </form>
            <button
              className="registerLoginButton"
              onClick={() => navigate("/login")}
            >
              Log Into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
