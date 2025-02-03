import React,{useState} from 'react'
import './Customer_care.css'



function Customer_care(){
    const [not_deliver,setnot_deliver]=useState(false);
    const [notdeliver_result,setnotdeliver_result]=useState(false);
    const [item_notwork,setitem_notwork]=useState(false);
    const [company_fault,setcompany_fault]=useState(false);
    const [dilasa,setdilasa]=useState(false);
    const [company_benefit,setcompany_benefit]=useState(false);
    const [helpline_no,sethelpline_no]=useState(false);

    const handleRadioChange = (event) => {
        setnot_deliver(event.target.checked);
        setitem_notwork(false);
        setdilasa(false);
        setcompany_fault(false);
        setcompany_benefit(false);
        sethelpline_no(false);
      };

    const handleRadioChange2 = (event) =>{
        setitem_notwork(event.target.checked);
        setnot_deliver(false);
        setnotdeliver_result(false);
        sethelpline_no(false);
    }

    const handleRadioChange3 = (event) =>{
        sethelpline_no(event.target.checked);
        setnot_deliver(false);
        setnotdeliver_result(false);
        setdilasa(false);
        setcompany_benefit(false);
        setcompany_fault(false);
        setitem_notwork(false);
    }

    const HandleSubmit = (event) =>{
        event.preventDefault();
        setnotdeliver_result(true);
        sethelpline_no(false);
    }

    const HandleSubmit2 = (event) =>{
        event.preventDefault();
        setdilasa(true);
        sethelpline_no(false);
    }

    const setvariables1 =() =>{
        setcompany_benefit(true);
        setcompany_fault(false);
        setdilasa(false);
        sethelpline_no(false);
    }

    const setvariables2 =()=>{
        setcompany_fault(true);
        setcompany_benefit(false);
        sethelpline_no(false);
    }
    return(
        <div style={{background: 'linear-gradient(135deg, #04bdc1, #059dc5, #08558c)', minHeight: '100vh'}}>
            <div style={{paddingLeft:'400px', backgroundColor: "rgb(15, 118, 192)"}}><h1 style={{fontSize:"50px",color:'white'}}>Welcome to Customer Support</h1></div>
            <div className="first_div">Hi, Myself Sahil,From Goel Electricals!</div>
            <br></br>
            <div className='second_div'><h3>What Can I help You with?</h3>
             <div class="form-check">
             <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleRadioChange2} />
             <label class="form-check-label" for="flexRadioDefault1">
              Item Not Working Properly
               </label>
               </div>
               <div class="form-check">
               <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleRadioChange}/>
              <label class="form-check-label" for="flexRadioDefault1">
               Item Not Yet Delivered
              </label>
                 </div>
                 <div class="form-check">
                 <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleRadioChange3} />
                 <label class="form-check-label" for="flexRadioDefault1">
                  Payment Related Issue
                  </label>
                </div>   
        </div>
          <br></br>
        {not_deliver && (
            <div className="third_div">
                  <h3>Tell Me Your Order ID.</h3>
                  <form className="mb-3" onSubmit={HandleSubmit}>
                  <input type="number" id="exampleFormControlTextarea1" rows="3" required style={{borderRadius:'10px',width:'300px'}}></input>
                  <button type="submit" class="btn btn-primary" style={{marginLeft:'40px'}} >Submit</button>
                  </form>

            </div>
        )}

        {notdeliver_result && (
            <div className='fourth_div'>
                <h4>Sorry For the inconvenience.We will try to get it delivered soon.</h4>
            </div>
        )}

        {item_notwork &&(
            <div className="fifth_div">
                <h4>Firstly ensure that you have registered your complaint on company's toll free complaint number.</h4>
                <h4>After registeration,it wil take 1-2 days to resolve the complaint.</h4>
                <h5>Is issue still persists?</h5><button type="button" class="btn btn-danger"style={{width:'70px',position:'relative',marginTop:'-5px'}} onClick={()=>{setvariables2()}}>Yes</button><button type="button" class="btn btn-success" style={{width:'70px',position:'relative',marginTop:'-5px'}} onClick={()=>{setvariables1()}}>No</button>
            </div>
        )}

        {company_fault && (
            <div className="third_div">
                <h3>Tell Me Your Order ID.</h3>
                  <form className="mb-3" onSubmit={HandleSubmit2}>
                  <input type="number" id="exampleFormControlTextarea1" rows="3" required style={{borderRadius:'10px',width:'300px'}}></input>
                  <button type="submit" class="btn btn-primary" style={{marginLeft:'40px'}} >Submit</button>
                  </form>
            </div>
        )}

        {dilasa && (
            <div style={{color:'white',backgroundColor:'purple',width:'750px',borderRadius:'10px'}}>
                <h3>Ok,our officials are trying to resolve it as early as possible.</h3>
                <h3>If company is found guilty,we will keep the products <br></br>of the company at the bottom of our website.</h3>
            </div>
        )}
        <br></br>
        {company_benefit && (
            <div style={{color:'white',backgroundColor:'purple',width:'750px',borderRadius:'10px'}}>
            <h3>Ok,it provides a positive feedback for the company.</h3>
        </div>
        )}

        {helpline_no && (
            <div style={{color:'white',backgroundColor:'purple',width:'550px',borderRadius:'10px',position:'relative',marginLeft:'950px',paddingLeft:'20px'}}>
                <h3>Contact us on helpline no. 94XXXXXXXX</h3>
            </div>
        )}

        </div>
        
    )
}

export default Customer_care;