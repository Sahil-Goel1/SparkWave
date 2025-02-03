import React from 'react'
import "./Welcome_Page.css"
import { useNavigate } from 'react-router-dom';

function Welcome_Page(){
    let history = useNavigate();
    const navigateToPage2 = () => {
        history('/Register_page');
      };
    return(
        <div className="box">
            <h1 className="big_heading">SparkWave</h1>
            <h2> Welcome To The Future Of Electricity</h2>
            <button type="button" className="btn btn-primary" onClick={navigateToPage2}>Let's Get Started  </button>
        </div>
    )
}

export default Welcome_Page;
