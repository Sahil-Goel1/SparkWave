import {React,useState} from 'react';
import { useNavigate } from 'react-router-dom';


function Password(){

    let history = useNavigate();
        const navigateToMain = () => {
            history('/main_page');
          };
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [message, setMessage] = useState('');
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await fetch('https://sparkwave-backend.onrender.com/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
    
                const result = await response.json();
    
                if (response.status === 200) {
                    setMessage('Password Changed successfully!');
                    navigateToMain();
                } else {
                    setMessage('Password does not match');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again later.');
            }
        };
    return (
            <div className="Sign_In_Box">
                <form id="form1" onSubmit={handleSubmit}>
                    <p style ={{color:'red'}} >{message}</p>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" id="mail">Email address</label>
                        <input type="password" className="form-control" id="Email1" aria-describedby="emailHelp" required
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" id="pass">Password</label>
                        <input type="password" className="form-control" id="Password1" required
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" id="submission">Change Password</button>
                </form>
            </div>
        );
}

export default Password;