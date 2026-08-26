import "../../style4.css";


function Registration() {
    return (
<div className="registration-page-wrapper">
 <div className="Registrationbox">

<div className="Registrationheader">
    <h3>Registration</h3>
</div>
<div className="inputbox">
   <input  className="input-field" type="text" placeholder="Name"/>
</div>
<div className="inputbox">
   <input  className="input-field" type="text" placeholder="Email"/>
</div>
<div className="inputbox">
   <input className="input-field" type="password" placeholder="password"/>
</div>
<div className="inputbox">
   <input className="input-field" type="password" placeholder="confirm password"/>
</div>
 <div className="inputbox">
    <button className="submitbtn">Register</button>
</div>

   
     </div>
</div>
    );
}

export default Registration;
    
