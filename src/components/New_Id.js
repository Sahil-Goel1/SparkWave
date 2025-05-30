import React, { useState } from 'react';
import "./New_Id.css";
import { useNavigate } from 'react-router-dom';

function New_Id() {
    let history = useNavigate();
    const navigateToProfile = (userEmail) => {
        history('/Profile_page',{ state: { email: userEmail } });
      };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [loading,setloading]=useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setloading(true);
        
        const response = await fetch('https://sparkwave-backend.onrender.com/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password, phone })
        });
        
        try{
        const result = await response.json();
        if(response.status===200)
        { setloading(false);
          setMessage("Login Successful");
          navigateToProfile(email);
        }
        else{
            setloading(false);
            setMessage("Username or Password Already exists")
        }
    }
    catch(error){
        console.error("Error",error);
        setloading(false);
        setMessage("An error occured,Please try again")
    }

       
    };

    return (
        <div id="id-main-box">
            <form id="form-1" onSubmit={handleSubmit} >
                <h1 id="big-line">NEW CUSTOMER LOGIN</h1>
                <p>{message}</p>
                {loading &&(
                <div className="spinner-border text-danger" role="status">
                 <span className="visually-hidden">Loading...</span>
                   </div>)}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" id="id1">Email address</label>
                    <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp" required
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" id="id2">Create Password</label>
                    <input type="password" className="form-control" id="Password1" required
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label" id="id3">PHONE NO.</label>
                    <textarea className="form-control" id="Textarea1" rows="1" required
                        value={phone} onChange={(e) => setPhone(e.target.value)}></textarea>
                </div>
                <p id="secret">We never share your information with anyone else</p>
                <button type="submit" className="btn btn-primary" id="small" >Next</button>
            </form>
        </div>
    );
}

export default New_Id;
