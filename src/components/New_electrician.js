import React from 'react'
import './New_electrician.css'

function New_electrician(){
    return(
        <div>
            <div id="upper_div">
                <h1 className="new_elec_heading">New Technicians Registration</h1>
                <hr></hr>
            </div>
            <div className="new_elec_compliment">
                <h5>This is the right place for technicians who are perfect in their work.</h5>
                <h5>Just do the work at your desired time. Do register yourself and let's get started.</h5>
                <hr></hr>
            </div>
            <form>
            <div className="new_elec_other_body">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Name</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                </div>

                <label htmlFor="state_select" className="form-label">State</label>
                <select className="form-select" id="state_select" aria-label="Default select example" defaultValue="">
                    <option value="" disabled>Select your state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                </select>
                <br />

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">District</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                </div>

                <label htmlFor="pin_code_ask" className="form-label">Pin Code</label>
                <input type="number" className="form-control" id="pin_code_ask" rows="1"></input>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter your local area address</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="eg. prabhu nagar,near Vishal cinema etc."></textarea>
                    <h6>This will be helpful for you to get nearest customers.</h6>
                </div>

                <label htmlFor="phone_no_ask" className="form-label">Phone No.</label>
                <input type="number" className="form-control" id="phone_no_ask" rows="1"></input>

                <label htmlFor="whatsapp_no_ask" className="form-label">WhatsApp No.</label>
                <input type="number" className="form-control" id="whatsapp_no_ask" rows="1"></input>

                <label htmlFor="upi_phone_no_ask" className="form-label">UPI Phone No.</label>
                <input type="number" className="form-control" id="upi_phone_no_ask" rows="1" placeholder="Phone no. from which UPI is started. You will receive money in this UPI no."></input>

                <label htmlFor="startingtimeInput"><h6>Enter Your Working Hours</h6></label>
                <input type="text" className="form-control" id="startingtimeInput" name="timeInput" placeholder="eg. 9:45am-9:45pm (type like this)"></input>
                <p>You will receive customers only in this time period. Fill it accordingly.</p>

                <h5>Select your working days</h5>      
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault1">Monday</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault2">Tuesday</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault3"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault3">Wednesday</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault4"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault4">Thursday</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault5"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault5">Friday</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault6"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault6">Saturday</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault7"></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault7">Sunday</label>
                </div>

                <button type="submit" className="new_elec_submit_button btn btn-success">Submit</button>
                </div>
            </form>
            </div>
        
    )
}

export default New_electrician;
