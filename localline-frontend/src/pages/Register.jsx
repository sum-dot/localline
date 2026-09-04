
import "../../style4.css";
import { Link } from "react-router";
import { useState } from "react";

import eyeOpen from "../assets/eyeopen.png";
import eyeClose from "../assets/eyeclose.png";

function Registration() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const [message, setMessage] = useState("");

    const handleRegister = async () => {

        setNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setMessage("");

        let hasError = false;

        if (!name) {
            setNameError("Please enter your name");
            hasError = true;
        }

      if (!email) {
    setEmailError("Please enter your email");
    hasError = true;
}
else if (
    !email.includes("@") ||
    !email.includes(".") ||
    !email.includes("com")
) {
    setEmailError("Please enter a valid email");
    hasError = true;
}

if (!password) {
    setPasswordError("Please enter your password");
    hasError = true;
}
else if (password.length < 6) {
    setPasswordError("Password must be at least 6 characters");
    hasError = true;
}

        if (!confirmPassword) {
            setConfirmPasswordError(
                "Please confirm your password"
            );
            hasError = true;
        }
        else if (password !== confirmPassword) {
            setConfirmPasswordError(
                "Password does not match"
            );
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:4000/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert(data.message);

                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");

            }
            else {

                setEmailError(data.error);

            }

        }
        catch (error) {
            

            setEmailError("Server error");

            console.log(error);
        }
    };

    return (
        <div className="registration-page-wrapper">

            <Link to="/" className="backbtn">
                ←
            </Link>

            <div className="Registrationbox">

                <div className="Registrationheader">
                    <h3>Registration</h3>
                </div>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                <div className="inputbox">

                    <input
                        className="input-field"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {nameError && (
                        <p className="field-error">
                            {nameError}
                        </p>
                    )}

                </div>

                <div className="inputbox">

                    <input
                        className="input-field"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {emailError && (
                        <p className="field-error">
                            {emailError}
                        </p>
                    )}

                </div>

                <div className="inputbox">

                    <div className="password-box">

                        <input
                            className="input-field"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <img
                            src={showPassword ? eyeOpen : eyeClose}
                            className="eye-button"
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                        />

                    </div>

                    {passwordError && (
                        <p className="field-error">
                            {passwordError}
                        </p>
                    )}

                </div>

                <div className="inputbox">

                    <div className="password-box">

                        <input
                            className="input-field"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />

                        <img
                            src={
                                showConfirmPassword
                                    ? eyeOpen
                                    : eyeClose
                            }
                            className="eye-button"
                            onClick={() => {
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                );
                            }}
                        />

                    </div>

                    {confirmPasswordError && (
                        <p className="field-error">
                            {confirmPasswordError}
                        </p>
                    )}

                </div>

                <div className="inputbox">

                    <button
                        className="submitbtn"
                        onClick={handleRegister}
                    >
                        Register
                    </button>

                </div>

            </div>
        </div>
    );
}

export default Registration;

