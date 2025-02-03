import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Register_page.css"

function Register_page(){
    let history = useNavigate();

    const navigateToLogin = () => {
        history('/Sign_in');
      };

    const navigateTonew=()=>{
        history("/New_Id")
    }
    return(
        <div id="main-box" >
            <div className="reg_sub_div">
            <h1 className="main_heading">SparkWave</h1>
            <h2 className="small_heading"><pre>One Stop Solution For All
                                           Your Electrical Needs.<br></br>
                                           Our Aim Is To Provide
                                           Best To Our Customers.</pre></h2>
           
            <button type="button" className="btn btn-primary" id="btn1" onClick={navigateToLogin} >SIGN IN  </button>
            <br></br>
            <button type="button" className="btn btn-primary" id="btn2" onClick={navigateTonew}>NEW CUSTOMER </button>
            </div>
        </div>
    )

}

export default Register_page;