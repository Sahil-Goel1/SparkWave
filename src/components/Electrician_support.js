import React, { useState } from 'react';
import './Electrician_support.css';
import { useNavigate } from 'react-router-dom';

function ElectPage() {
  const [newHouse, setNewHouse] = useState(false);
  const [new_house_pop, setNewHousePop] = useState(false);
  const [regular_service_pop, setRegularServicePop] = useState(false);
  const [project_pop, setProjectPop] = useState(false);
  const [small_industries_pop, setSmallIndustriesPop] = useState(false);
  const [AskAdd, setAskAdd] = useState(false);
  const [new_house_elec, setnew_house_elec] = useState(false);
  const [loading,setloading] =useState(false);
 
  let history = useNavigate();
    const navigateToNew_Elect = () => {
        history('/new_electrician');
      };

  function new_house_address_loading(event) {
    event.preventDefault(); // Prevent the form from submitting
    setAskAdd(true);
  }

  function new_house_elec_loading(event) {
    event.preventDefault(); // Prevent the form from submitting
    setloading(true);
    setTimeout(() => setloading(false), 2000); 
    setTimeout(() => setnew_house_elec(true), 2000); 
  }

  return (
    <div className="Elect_main_div bg-purple">
      <div className="elec_head_container">
        <div className="elec_pic"></div>
        <h1 id="elec_heading"><span>Welcome to the Electrician Support</span></h1>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="tcbutton">
          Terms and Conditions
        </button>
        <button type="button" class="new_elec_reg btn btn-primary" onClick={navigateToNew_Elect}>New Electrician Registration</button>
      </div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Terms and Conditions</h1>
            </div>
            <div className="modal-body">
              <h5>We at Goel Electricals, charge only for our products. We don't 
              have any kind of interference between you and the electrician.
              Any kind of misbehaviour with our electrician will lead to 
              remove your account from the site. If electrician misbehaves,
              then contact us on helpline numbers. Labour rate will change
              depending on the type of work.</h5>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">I Agree</button>
            </div>
          </div> 
        </div>
      </div>

      <div className="elec_page_body">
        <h2>For What Purpose do you want an Electrician?</h2>
        <div className="button_div">
          <button className="reg btn btn-secondary"
           onMouseOver={() => setRegularServicePop(true)}
           onMouseOut={() => setRegularServicePop(false)}>Regular services</button>

          <button 
            className="reg btn btn-secondary" 
            onClick={() => setNewHouse(true)} 
            onMouseOver={() => setNewHousePop(true)}
            onMouseOut={() => setNewHousePop(false)}
          >
            New House Fittings
          </button>

          <button className="reg btn btn-secondary"
          onMouseOver={() => setProjectPop(true)}
          onMouseOut={() => setProjectPop(false)}>
            Large Project fittings</button>

          
            
        </div>
        <hr></hr>
       
      
        {newHouse && (
          <div>
            <h2>Tell me your house area in square feet :</h2>
            <form className="mb-3" onSubmit={new_house_address_loading}>
              <input type="number" className="house_area_input form-control" id="exampleFormControlTextarea1" rows="3" required></input>
              <button type="submit" className="submit_button btn btn-primary">
                Submit
              </button>
              <hr></hr>            
              </form>
          </div>
        )}

        {AskAdd &&(
          <div>
           <h2> <span>Please provide your site location :</span></h2>
            <button className="usemyloc" onClick={new_house_elec_loading}>Use my location</button><button className="anotherloc">Use another location</button>
            <hr></hr>
          </div>
        )}

        {loading &&(
          <div>
            <h2>Fetching the nearest electrician details...</h2>
            <hr></hr>
          </div>
        )}

        {new_house_elec && (
          <div><h2> Mr. Vinod Kumar  
            <br></br>Phone No. 9483243232</h2>
            <button type="button" class="change_elec btn btn-danger">Change Electrician</button>
          <hr></hr></div>
        )}

        {new_house_pop && (
          <div className="alert alert-primary" role="alert">
            <h5>Press this button if you want electrician for new house fittings.</h5>
          </div>
        )}

        {regular_service_pop && (
          <div className="alert alert-primary" role="alert">
            <h5> Press this button if you want electrician for simple regular repairs/complaints.</h5>
          </div>
        )}

        {project_pop && (
          <div className="alert alert-primary" role="alert">
            <h5>Press this button if you want electrician for large projects like multi-storey buildings, factories that spread 
            <br></br>
            over more than one acre of land, senior secondary schools, colleges and similar large projects.</h5>
          </div>
        )}

        {small_industries_pop && (
          <div className="alert alert-primary" role="alert">
            <h5>Press this button if you want electrician for industries that spread over less than one acre of land 
            <br></br>
            and sites that requires similar complex fittings.</h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default ElectPage;
