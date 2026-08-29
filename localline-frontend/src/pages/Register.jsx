import "../../style4.css";
import { Link } from "react-router";
import { useState } from "react";

function Registration() {

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


   
    const handleRegister = async () => {

        
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        
        if (password !== confirmPassword) {
            alert("Password does not match");
            return;
        }

        try {

         
            const response = await fetch("http://localhost:4000/auth/register", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });


            const data = await response.json();


            
            if (response.ok) {
                alert("Registration successful");

               
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } 
            else {
                alert(data.error);
            }

        } catch (error) {
            alert("Server error");
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


                <div className="inputbox">
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>


                <div className="inputbox">
                    <input
                        className="input-field"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>


                <div className="inputbox">
                    <input
                        className="input-field"
                        type="password"
                      placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>


                <div className="inputbox">
                    <input
             className="input-field"
               type="password"
                placeholder="confirm password"
                        value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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