import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import Cookies from "js-cookie";
import { setDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

// import { AuthContext } from "../Auth";
import "./index.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigate();

  const [loginDetails, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: false,
  });

  const register = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: loginDetails.firstName + " " + loginDetails.lastName,
        email: loginDetails.email,
      };

      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        loginDetails.password
      );
      setDoc(doc(db, "users", res.user.uid), {
        ...data,
        id: res.user.uid,
      });

      setDoc(doc(db, "userPosts", res.user.uid), { messages: [] });

      updateProfile(auth.currentUser, {
        displayName: data.name,
      });

      Cookies.set("user", auth.currentUser.uid, { expires: 1 });
      navigation("/");
    } catch (error) {
      console.log(error);
      setDetails((prev) => ({ ...prev, error: true }));
    }
  };

  const onChangeDetails = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="text-center text-lg-start bg-dark h">
      <div className="container py-4">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="card cascading-right">
              <div className="card-body p-5 shadow-5 text-center ">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form onSubmit={register}>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          name="firstName"
                          onChange={onChangeDetails}
                        />
                        <label className="form-label" htmlFor="form3Example1">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form3Example2"
                          className="form-control"
                          name="lastName"
                          onChange={onChangeDetails}
                        />
                        <label className="form-label" htmlFor="form3Example2">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      name="email"
                      className="form-control"
                      onChange={onChangeDetails}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                    {loginDetails.error && (
                      <p className="text-danger">Gmail already exits</p>
                    )}
                  </div>

                  {/* <!-- Password input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type={!showPassword ? "password" : "text"}
                      id="form3Example4"
                      className="form-control"
                      name="password"
                      onChange={onChangeDetails}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  {/* <!-- Show Password --> */}
                  <div className="form-check d-flex justify-content-center mb-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="form2Example33"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="form2Example33"
                    >
                      Show password
                    </label>
                  </div>

                  {/* <!-- Submit button --> */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign up
                  </button>

                  <p>
                    Already a user <Link to="/login">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 d-lg-block d-none">
            <img
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              className="w-75 rounded-4 shadow-4"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
    // <!-- Section: Design Block -->
  );
};

export default SignUp;
