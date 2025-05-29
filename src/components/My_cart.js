import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import './My_cart.css'
import funny_monkey from "./images/funny_monkey.jpg";
import greentick from "./images/Green-Tick.png";
import qr from "./images/qr.jpg";

function MyCart() {

    const location = useLocation();
    const userEmail = location.state?.email;
    const [cartlist, setCartlist] = useState([]);
    const [p_page,setp_page]=useState(false);
    const [p_page2,setp_page2]=useState(false);
    const [payment_page,setpayment_page]=useState(false);
    const [pod_page,setpod_page]=useState(false);
    const [new_address,setnew_address]=useState(false);
    const [qr_page,setqr_page]=useState(false);
    
    useEffect(() => {
        fetch(`http://localhost:5000/cartobjects/${userEmail}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Debug print to check fetched data
                if (Array.isArray(data)) {
                    setCartlist(data);
                } else {
                    console.error('Error fetching cart data:', data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const deleteFromCart = async (index) => {
        const name = cartlist[index].name;

        try {
            const response = await fetch(`http://localhost:5000/deletefromCart/${userEmail}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            if (response.status === 200) {
                // Remove the item from the state
                setCartlist(cartlist.filter((_, i) => i !== index));
                
            } else {
                alert('Failed to remove item from cart.Try again');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try later.');
        }
    };

    const deleteAllCart = async() =>{
        try {
            const response = await fetch(`http://localhost:5000/deleteallCart/${userEmail}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
    
            });

            if (response.status === 200) {
                // Remove the item from the state
                setCartlist([]);
                
            } else {
                alert('Failed to remove item from cart.Try again');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try later.');
        }
    };

    const setvariables=() =>{
           setp_page(false);
           setp_page2(true);
    };

    const setvariables2=() =>{
        setp_page2(false);
        setpayment_page(true);
 };
     
    const setvariables3=()=>{
        setpayment_page(false);
        setpod_page(true);
    }

    const setvariables4=()=>{
        setp_page2(false);
        setnew_address(true);
    }

    const setvariables5=()=>{
        setpod_page(true);
        deleteAllCart();
    }

    const setvariables6 =()=>{
        setqr_page(true);
        setpayment_page(false);
    }

    const calculateTotalAmount = () => {
        return cartlist.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
    };

    const totalAmount = calculateTotalAmount();


    if (!cartlist || cartlist.length === 0) {
        return <div className="empty_cart">
            <img className="monkey_image" src={funny_monkey}></img>
            <h1 className="monkey_text">Your cart is empty.</h1>
            </div>;
    }

    return (
        <div className="my_cart_main_div">
            {cartlist.map((product, index) => (
                <div key={index} className="mycart_sub_div d-flex position-relative">
                <div className="my_cart_text_div">
                    <h2 className="cart_product_heading mt-0">{product.name}</h2>
                    <h3>{product.details}</h3>
                    <h3>Rs. {product.price} only </h3>
                    <div className="button_container">
                        <h3>Quantity : {product.quantity}</h3>
                    </div>
                    <button type="button" className="purchase_button btn btn-success">Purchase</button><button type="button" className="remove_button btn btn-danger"
                    onClick={()=>{deleteFromCart(index)}}>Remove from Cart</button>
                   
                </div>
            </div>
            ))}
            <br></br>
            <br></br>
            <div><button type="button" className="placeall_button fixed-bottom btn btn-primary" onClick={() => setp_page(true)}>Purchase All</button>
            <div className="amount_span">Total Amount: Rs. {totalAmount}</div>
            <button type="button" className="removeall_button fixed-bottom btn btn-danger" onClick={()=>{deleteAllCart()}}>Remove All</button></div>
            
            {p_page && (
    <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Purchase Confirmation</h5>
                    <button type="button" className="btn-close" onClick={() => setp_page(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to purchase all items in your cart?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setp_page(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => {setvariables()}}>Confirm Purchase</button>
                </div>
            </div>
        </div>
    </div>
)}

{p_page2 && (
                <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Information Required</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setp_page2(false)} 
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <p>Do you want to use the existing information or provide new information?</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setvariables2()}
                                >
                                    Use Existing Address
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={() => setvariables4()}
                                >
                                    Provide New Address
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        {payment_page &&(
            <div className="modal show" id="paymentModal" tabIndex="-1" style={{ display: 'block' }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="paymentModalLabel">Payment Type</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setpayment_page(false)} ></button>
                    </div>
                    <div className="modal-body">
                        <p>Please select a payment method:</p>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={()=>setvariables3()}>Pay On Delivery</button>
                        <button type="button" className="btn btn-primary" onClick={()=>setvariables6()}>Using UPI</button>
                    </div>
                </div>
            </div>
        </div>
        )}
        
        {new_address && (
             <div className="modal show" id="paymentModal" tabIndex="-1" style={{ display: 'block' }} >
             <div className="modal-dialog">
                 <div className="modal-content">
                     <div className="modal-header">
                     <div class="mb-3">
                     <label for="exampleFormControlTextarea1" class="form-label">Provide New Address</label>
                     <textarea style={{width:'450px'}}class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                     </div>                         
                     <button type="button" style={{position:'relative',marginTop:'-150px'}} className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setnew_address(false)}} ></button>
                     <button type="button" style={{position:'relative',marginTop:'150px',marginLeft:'-200px'}} className="btn btn-primary">Submit</button>
                     </div>
                 </div>
             </div>
         </div>
        )}
        {qr_page && (
            <div className="modal show" id="paymentModal" tabIndex="-1" style={{ display: 'block' }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <img src={qr} style={{height:'200px',width:'200px',position:'relative',marginLeft:'130px'}}/>
                        <button type="button" style={{position:'relative',marginTop:'-190px'}} className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setqr_page(false)}} ></button>
                    </div>
                    <div className="modal-footer">
                        <pre><h4>Your Total Amount:              {totalAmount}</h4></pre>
                    </div>
                </div>
            </div>
        </div>
        )}

        {pod_page && (
            <div className="modal show" id="paymentModal" tabIndex="-1" style={{ display: 'block' }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <img src={greentick} style={{height:'100px',width:'100px',position:'relative',marginLeft:'180px'}}/>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setvariables5()} ></button>
                    </div>
                    <div className="modal-body">
                        <p>Your order confirmed.Thanks for purchasing with Goel Electricals.
                            <br></br>
                            Order will reach your destination by half to one hour.<h4>Open the 
                            parcel in front of delivery agent and look it carefully and if product delivered is right and in proper condition,then only
                            tell the OTP to the delivery agent.</h4> After that,no complaint will be entertained.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <pre><h4>Your Total Amount:            {totalAmount}</h4></pre>
                    </div>
                </div>
            </div>
        </div>
        )}
        </div>

       
    );
}

export default MyCart;
