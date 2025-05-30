import React, { useState, useEffect } from 'react';
import './Customer_info.css';
import { useNavigate, useLocation } from 'react-router-dom';

function Info() {

    let history = useNavigate();
    const location = useLocation();
    const userEmail = location.state?.email;
    const [userData, setUserData] = useState({
        email: '',
        phone: '',
        name: '',
        age: '',
        dob: '',
        state: '',
        district: '',
        password:" "
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [userimage,setuserimage]=useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user data first
                const response = await fetch(`https://sparkwave-backend.onrender.com/combined-data/${userEmail}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);

                    // Fetch the first image from the database
                    const imageResponse = await fetch(`https://sparkwave-backend.onrender.com/get-first-image/${userEmail}`);
                    if (imageResponse.ok) {
                        const blob = await imageResponse.blob();
                        const imageUrl = URL.createObjectURL(blob);
                        setuserimage(imageUrl);
                    } else {
                        console.error('Failed to fetch the image');
                    }
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('email', userEmail);

        try {
            const response = await fetch('https://sparkwave-backend.onrender.com/upload-image', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to upload the file');
        }
    };

    return (
        <div id ="info_page">
             <div className="image_storer">
             {userimage ? <img className="user_image" src={userimage} alt="User Profile" /> : <p>No image available</p>}
             </div>
            <br></br>
            <br></br>
            <h1>Name: {userData.name}</h1>
            <h1>Age: {userData.age}</h1>
            <h1>Date of Birth: {userData.dob}</h1>
            <h1>State: {userData.state}</h1>
            <h1>District: {userData.district}</h1>
            <h1>Email-ID: {userData.email}</h1>
            <h1>Mobile No.: {userData.phone}</h1>
            <h1>Password: {userData.password}</h1>
            <br></br>
            <h3>Set Profile Image</h3>
            <div >
            <input className="form-control" type="file" id="formFile" onChange={handleFileChange}/></div>
            <button type="button" className="image_upload btn btn-info" onClick={handleFileUpload}>Upload Image</button>
        </div>
    );
}

export default Info;