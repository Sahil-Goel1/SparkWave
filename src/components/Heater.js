import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import usha_2rod from "./images/usha_2rod.jpg";
import usha_3rod from "./images/usha_3rod.jpg";
import usha_blower from "./images/usha_blower.webp";
import usha_oil from "./images/usha_oil.png";
import rr_quartz from "./images/rr_quartz.jpg";
import rr_3rod from "./images/rr_3rod.jpg";
import rr_blower from "./images/rr_blower.png";
import rr_oil from "./images/rr_oil.jpg";
import './Heater.css';
import Navbar from './Navbar.js';

function Heater() {
    const location = useLocation();
    const userEmail = location.state?.email;
    const [products, setProducts] = useState([
        {id:1, name: 'Usha Quartz Room Heater', img: usha_2rod, price: 80, details: "2 years warranty,Toll free service,800 Watt,2 Quartz rod,Auto Accidental shutdown,AutoCut Thermostat", quantity: 1 },
        {id:2, name: 'Usha Signature Room Heater', img: usha_3rod, price: 150, details: "2 years warranty,Toll free service,1200 Watt,3 Quartz rod,Auto Accidental shutdown,AutoCut Thermostat", quantity: 1 },
        {id:3, name: 'Usha Hot Air Blower', img: usha_blower, price: 180, details: "2 years warranty,Toll free service,2000 Watt,2 Fan Blowers,Auto Accidental shutdown,AutoCut Thermostat", quantity: 1 },
        {id:4, name: 'Usha Oil Fin Room Heater', img: usha_oil, price: 220, details: "2 years warranty,Toll free service,2000 Watt,Oil Radiating Heater,Auto Accidental shutdown,AutoCut Thermostat", quantity: 1 },
        {id:5, name: 'RR Quartz Room Heater', img: rr_quartz, price: 240, details: "2 years warranty,Toll free service,800 Watt,2 Quartz rod,Auto Accidental shutdown,AutoCut Thermostat", quantity: 1 },
        {id:6, name: 'RR Signature Room Heater', img: rr_3rod, price: 260, details: "2 years warranty,Toll free service,1200 Watt,3 Quartz rod,Auto Accidental shutdown,AutoCut Thermostat", quantity: 1 },
        {id:7, name: 'RR Hot Air Blower', img: rr_blower, price: 300, details: "2 years warranty,Toll free service,2000 Watt,2 Fan Blowers,Auto Accidental shutdown,AutoCut Thermostat", quantity: 1 },
        {id:8, name: 'RR Oil Fin Room Heater', img: rr_oil, price: 400, details: "2 years warranty,Toll free service,2000 Watt,Oil Radiating Heater,Auto Accidental shutdown,AutoCut Thermostat", quantity: 1 },
    ]);
        const [searchTerm, setSearchTerm] = useState('');
        const [isCartBlinking, setIsCartBlinking] = useState(false);
        const [cartlist, setcartlist] = useState([]);
        const [name, setname] = useState('');
        const [quantity, setquantity] = useState(0);
        const [price, setprice] = useState('');
        const [details, setdetails] = useState("");
        const [alertVisible, setAlertVisible] = useState(false);
        const [alertType, setAlertType] = useState('');
        const [alertMessage, setAlertMessage] = useState('');

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.price.toString().includes(searchTerm.toLowerCase()) ||
        product.details.toString().includes(searchTerm.toLowerCase())
    );

    function Increment(index) {
        const updatedProducts = [...filteredProducts];
        updatedProducts[index].quantity++;
        setProducts(updatedProducts);
    }

    function Decrement(index) {
        const updatedProducts = [...filteredProducts];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity--;
            setProducts(updatedProducts);
        }
    }

    const handleAddToCart = async (index) => {
        setIsCartBlinking(true);
        setTimeout(() => {
          setIsCartBlinking(false);
        }, 250);
        const biglist = [...cartlist];
        biglist.push([...filteredProducts][index]);
        setcartlist(biglist);
        setname([...filteredProducts][index].name);
        setquantity([...filteredProducts][index].quantity);
        setprice([...filteredProducts][index].price);
        setdetails([...filteredProducts][index].details);

        try {
            const response = await fetch('http://localhost:5000/carthandler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userEmail,name, quantity, price, details })
            });

            if (response.status === 200) {
                setAlertType('success');
                setAlertMessage('Product added to cart successfully!');
            } else {
                setAlertType('warning');
                setAlertMessage('Product not added to cart!');
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertType('danger');
            setAlertMessage('An error occurred. Please try later.');
        } finally {
            setAlertVisible(true);
            setTimeout(() => setAlertVisible(false), 3000); // Hide alert after 3 seconds
        }
    };
    
    return (
        <div id="led_batten_main_page">
            <Navbar onChange={handleSearch} value={searchTerm} isCartBlinking={isCartBlinking} userEmail={userEmail}/>
            {alertVisible && (
                <div className={`message alert alert-${alertType}`} role="alert">
                    {alertMessage}
                </div>
            )}
                {filteredProducts.map((product, index) => (
                    <div key={product.id} className="heater_div2 d-flex position-relative">
                        <img src={product.img} className="heater_image flex-shrink-0 me-3" alt={product.name} />
                        <div className="heater_text_div">
                            <h2 className="mt-0">{product.name}</h2>
                            <h3>{product.details}</h3>
                            <h3>Rs. {product.price} only </h3>
                            <div className="button_container">
                            <h4>Quantity :</h4>
                                <button className="batten_minus_button" onClick={() => Decrement(index)}>-</button>
                                <h3>{product.quantity}</h3>
                                <button className="batten_plus_button" onClick={() => Increment(index)}>+</button>
                            </div>
                            <button className="heater_button"  onClick={() => handleAddToCart(index)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        
    );
}

export default Heater;
