import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./index.css";

const Login = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setDetails] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      );

      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeDetails = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={login}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  name="email"
                  onChange={onChangeDetails}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type={!showPassword ? "password" : "text"}
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  name="password"
                  onChange={onChangeDetails}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="form2Example3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    Show Password
                  </label>
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-4 ">
                  Don't have an account?
                  <Link to="/sign-up" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
