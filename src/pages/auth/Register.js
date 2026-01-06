import React, { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user with email and password
      const result = await auth.createUserWithEmailAndPassword(email, password);

      // Send email verification
      await result.user.sendEmailVerification();

      // Notify user
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );

      // Save user email in local storage
      window.localStorage.setItem("emailForRegistration", email);

      // clear state
      setEmail("");
      setPassword("");

      // Sign out the user until they verify
      await auth.signOut();

    } catch (error) {
      console.log("ERROR IN REGISTRATION", error);

      if (error.code === 'auth/email-already-in-use') {
        toast.error("This email is already registered. Please login instead.");
      } else if (error.code === 'auth/weak-password') {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoFocus
      />

      <br />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        minLength="6"
      />

      <br />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );






  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;