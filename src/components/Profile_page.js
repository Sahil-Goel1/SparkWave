import React,{useState} from 'react'
import "./Profile_page.css"
import { useNavigate,useLocation } from 'react-router-dom';

function Profile_page(){
    let history = useNavigate();
    const location = useLocation();
    const userEmail = location.state?.email;  // Get email from navigation state
    const navigateToMain = (Email) => {
        history('/main_page',{ state: { email: Email } });
      };

    const [Name,setName]=useState("");
    const [Age,setAge]=useState("");
    const [State,setState]=useState("");
    const [District,setDistrict]=useState("");
    const [DOB,setDOB]=useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('https://sparkwave-backend.onrender.com/profile', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userEmail, Name, Age,State,District,DOB })
        });
        navigateToMain(userEmail);
    }
    return(
        <div id="profile_screen">
            <form id="profile_form" onSubmit={handleSubmit}>
            <h1 id="profile-line">Enter your Details</h1>
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Name</label>
            <textarea className="form-control" id="profile_name" rows="1" value={Name} onChange={(e) => setName(e.target.value)} required></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Age</label>
            <textarea className="form-control" id="profile_age" rows="1" value={Age} onChange={(e) => setAge(e.target.value)} required></textarea>
            </div>
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" value={DOB} onChange={(e) => setDOB(e.target.value)} required/>
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">State</label>
            <textarea className="form-control" id="profile_state" rows="1" value={State} onChange={(e) => setState(e.target.value)}  required></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">District</label>
            <textarea className="form-control" id="profile_district" rows="1" value={District} onChange={(e) => setDistrict(e.target.value)} required></textarea>
            </div>
            <button className="btn btn-primary" type="submit" id="profile_button" >Submit</button>
            </form>
        </div>
    )
}

export default Profile_page ;