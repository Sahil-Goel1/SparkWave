import React, { useState } from 'react';
import './Sign_in.css';
import { useNavigate ,Link} from 'react-router-dom';

function Sign_in() {
    let history = useNavigate();
    const navigateToMain = () => {
        history('/main_page',{ state: { email: email } });
      };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [submit_page,setsubmit_page]=useState(true);
    const [otp_page,setotp_page]=useState(false);
    const [email_page,setemail_page]=useState(false);
    const [password_page,setpassword_page]=useState(false);
    const [new_password,setnew_password]=useState("");
    const [upper_new_password,setupper_new_password]=useState("");
    const [loading,setloading]=useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        setMessage("");

        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.status === 200) {
                setMessage('Login successful!');
                navigateToMain();
            } else {
                setloading(false);
                setMessage('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setloading(false);
            setMessage('An error occurred. Please try again later.');
        }
    };

    const handleSubmit2= async (e) =>{
        e.preventDefault();
        setMessage("");
        setloading(true);
        try {
            const response = await fetch('http://localhost:5000/otp_to_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const result = await response.json();

            if (response.status === 200) {
                setMessage('OTP Sent Successfully');
                setloading(false);
                setemail_page(false);
                setotp_page(true);
            } else {
                setloading(false);
                setMessage('Email not registered');
            }
        } catch (error) {
            console.error('Error:', error);
            setloading(false);
            setMessage('An error occurred. Please try again later.');
        }

    }

    const handleSubmit3= async (e) =>{
        e.preventDefault();
        setMessage('');
        setloading(true);
        const otp = [
            document.getElementById("otp1").value,
            document.getElementById("otp2").value,
            document.getElementById("otp3").value,
            document.getElementById("otp4").value,
            document.getElementById("otp5").value,
            document.getElementById("otp6").value,
          ].join("");

        try {
            const response = await fetch('http://localhost:5000/otp_checker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ otp })
            });

            const result = await response.json();

            if (response.status === 200) {
                setMessage('');
                setloading(false);
                setotp_page(false);
                setpassword_page(true);
            } else {
                setloading(false);
                setMessage('OTP does not match');
            }
        } catch (error) {
            console.error('Error:', error);
            setloading(false);
            setMessage('An error occurred. Please try again later.');
        }

    }

    const handleSubmit4= async (e) =>{
        e.preventDefault();
        setMessage("");
        setloading(true);
        if(upper_new_password!=new_password)
        {   setloading(false);
            setMessage("Passwords in lower and upper blocks does not match")
        }
        else{

          try {
            const response = await fetch('http://localhost:5000/set_new_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email,new_password })
            });

            const result = await response.json();

            if (response.status === 200) {
                setloading(false);
                setTimeout(() => {
                    setMessage("")
                }, 2000);
                setMessage('New Password has been set up.');
                setpassword_page(false);
                setsubmit_page(true);
            } else {
                setloading(false);
                setMessage('New password has not been set up');
            }
        } catch (error) {
            console.error('Error:', error);
            setloading(false);
            setMessage('An error occurred. Please try again later.');
        }
        }
    }
    
    function setvariables(){
        setsubmit_page(false);
        setMessage("")
        setemail_page(true);
    }

    function moveToNext(current, nextId) {
        if (current.value.length >= current.maxLength) {
            if (nextId) {
                document.getElementById(nextId).focus();
            }
        }
    }

    return (
        <div className="Sign_In_Box">
            {submit_page && (
            <form id="form1" onSubmit={handleSubmit}>
                {loading &&(
                <div className="spinner-border text-primary" style={{position:'relative',marginLeft:'130px'}}role="status">
                 <span className="visually-hidden">Loading...</span>
                   </div>)}
                <p style ={{color:'red'}} >{message}</p>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" id="mail">Email address</label>
                    <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp" required
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" id="pass">Password</label>
                    <input type="password" className="form-control" id="Password1" required
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" id="submission">Submit</button>
                <Link className="pass_forget" onClick={()=>{setvariables()}}>Forget Password</Link>
            </form>
            )}

            {email_page &&(
                <div>
                <form id="form1" onSubmit={handleSubmit2}>
                {loading &&(
                <div className="spinner-border text-primary" style={{position:'relative',marginLeft:'130px'}}role="status">
                 <span className="visually-hidden">Loading...</span>
                   </div>)}
                <p style ={{color:'red'}} >{message}</p>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" id="mail">Enter your registered Email address</label>
                    <input type="email" className="form-control" id="Email1" aria-describedby="emailHelp" required
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" id="submission">Submit</button>
            </form>
                </div>
            )}

            {otp_page &&(
                <div>
                    <form  onSubmit={handleSubmit3}>
                    {loading &&(
                   <div className="spinner-border text-primary" style={{position:'relative',marginLeft:'430px'}}role="status">
                      <span className="visually-hidden">Loading...</span>
                       </div>)}   
                       <p style={{fontSize:'30px',color:'red',position:'relative',marginLeft:'250px'}}>{message}</p>
                    <h1>An OTP will sent to your registered mobile number</h1>
                    <div className="otp-container1">
                    <input type="number" className="otp-input1 form-control" maxLength="1" onInput={(e) => { moveToNext(e.target, 'otp2') }} id="otp1" />
                        <input type="number" className="otp-input1 form-control" maxLength="1" onInput={(e) => { moveToNext(e.target, 'otp3') }} id="otp2" />
                        <input type="number" className="otp-input1 form-control" maxLength="1" onInput={(e) => { moveToNext(e.target, 'otp4') }} id="otp3" />
                        <input type="number" className="otp-input1 form-control" maxLength="1" onInput={(e) => { moveToNext(e.target, 'otp5') }} id="otp4" />
                        <input type="number" className="otp-input1 form-control" maxLength="1" onInput={(e) => { moveToNext(e.target, 'otp6') }} id="otp5" />
                        <input type="number" className="otp-input1 form-control" maxLength="1" onInput={(e) => { moveToNext(e.target, '') }} id="otp6"/>
                    </div>
                    <button style={{position:'relative' , marginLeft:'320px'}} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            )}

       {password_page && (
            <form id="form1" onSubmit={handleSubmit4}>
                <p style ={{color:'red'}} >{message}</p>
                {loading &&(
                <div className="spinner-border text-primary" style={{position:'relative',marginLeft:'130px'}}role="status">
                 <span className="visually-hidden">Loading...</span>
                   </div>)}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" id="pass">New Password</label>
                    <input type="password" className="form-control" id="Password1" required
                        value={upper_new_password} onChange={(e) => setupper_new_password(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" id="pass">Confirm New Password</label>
                    <input type="password" className="form-control" id="Password1" required
                        value={new_password} onChange={(e) => setnew_password(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" id="submission">Submit</button>
            </form>
            )}

        </div>
    );
}

export default Sign_in;
