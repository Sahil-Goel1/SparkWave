import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import anchor_exhaust from "./images/anchor-exhaust.jpg";
import anchor_venti from "./images/anchor_venti.jpg";
import crompton_exhaust from "./images/crompton_exhaust.png"
import crompton_venti from "./images/crompton_venti.webp"
import crompton_bearing from "./images/crompton_bearing.jpeg";
import anchor_wall from "./images/anchor_wall.jpg";
import crompton_wall from "./images/crompton_wall.webp";
import anchor_pedestal from "./images/anchor_pedestal.jpg";

import Navbar from './Navbar.js';
import './Led_batten.css'

function Vent_wall() {
    const location = useLocation();
    const userEmail = location.state?.email;
    const [products, setProducts] = useState([
        { name: 'Anchor Exhaust Fans ', img: anchor_exhaust, price: 2400, details: "2 years Warranty,Sweep 900 MM,1 star ratings,Powerful Copper motor, Aluminium Body", quantity: 1 },
        { name: 'Anchor Ventilation Fans', img: anchor_venti, price: 2100, details: "2 years Warranty,Sweep 900 MM,1 star ratings,Powerful Copper motor,High fibre plastic body", quantity: 1 },
        { name: 'Crompton Exhaust Fans', img: crompton_exhaust, price: 2700, details: "2 years Warranty,Sweep 900 MM,1 star ratings,Powerful Copper motor,Aluminium Body", quantity: 1 },
        { name: 'Crompton Ventilation Fans', img: crompton_venti, price: 2400, details: "2 years Warranty,Sweep 900 MM,1 star ratings,Powerful Copper motor,High fibre plastic body", quantity: 1 },
        { name: 'Crompton Exhaust Fans', img: crompton_bearing, price: 2300, details: "2 years Warranty,Sweep 900 MM,1 star ratings,Powerful Copper motor,Aluminium Body", quantity: 1 },
        { name: 'Anchor Wall Fans', img: anchor_wall, price: 750, details: "2 star ratings,1 star ratings Powerful Copper motor,Oscillate upto 120 degree", quantity: 1 },
        { name: 'Crompton Wall Fans', img: crompton_wall, price: 1200, details: "2 years Warranty,1 star ratings,Powerful Copper motor,Oscillate upto 120 degree", quantity: 1 },
        { name: 'Anchor Pedestal fans', img: anchor_pedestal, price: 1200, details: "2 years Warranty,1 star ratings,Powerful Copper motor,Oscillate upto 120 degree", quantity: 1 }
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
            const response = await fetch('https://sparkwave-backend.onrender.com/carthandler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userEmail, name, quantity, price, details })
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
                    <div key={product.id} className="sub_div2 d-flex position-relative">
                        <img src={product.img} className="led_batten_image flex-shrink-0 me-3" alt={product.name} />
                        <div className="led_batten_text_div">
                            <h2 className="mt-0">{product.name}</h2>
                            <h3>{product.details}</h3>
                            <h3>Rs. {product.price} only </h3>
                            <div className="button_container">
                            <h4>Quantity :</h4>
                                <button className="batten_minus_button" onClick={() => Decrement(index)}>-</button>
                                <h3>{product.quantity}</h3>
                                <button className="batten_plus_button" onClick={() => Increment(index)}>+</button>
                            </div>
                            <button className="led_batten_button"  onClick={() => handleAddToCart(index)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        
    );
}

export default Vent_wall;
