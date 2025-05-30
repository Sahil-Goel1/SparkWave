import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import crompton_jmg from "./images/arno_neo.webp";
import crompton_grinder from "./images/rapid_jet.webp";
import philips_jmg from "./images/rr_ardent.png"
import orient_jmg from "./images/rr_calid.png"
import philips_grinder from "./images/rr_gas.png";
import orpat_blender from "./images/trisa.webp";
import crompton_blender from "./images/crompton_rod.jpg";
import windair from "./images/windair.jpg";
import carryon from "./images/carryon.jpg";

import Navbar from './Navbar.js';
import './Led_batten.css'

function Geyser() {
    const location = useLocation();
    const userEmail = location.state?.email;
    const [products, setProducts] = useState([
        { id:1,name: 'Crompton Water Heater(Arno Neo)', img: crompton_jmg, price: 2400, details: "5 years Warranty,5 star ratings,Copper tank Rods,Glassline body,25 litre capacity", quantity: 1 },
        { id:2,name: 'Crompton Kitchen Water Heater(Rapid Jet)', img: crompton_grinder, price: 2100, details: "5 years Warranty,5 star ratings,Copper tank Rods,3 litre capacity,Instant Hot water", quantity: 1 },
        { id:3,name: 'RR Water Heater(Ardent)', img: philips_jmg, price: 2700, details: "5 years Warranty,5 star ratings,Copper tank Rods,Glassline body,25 litre capacity", quantity: 1 },
        { id:4,name: 'RR Kitchen Water Heater(Calid)', img: orient_jmg, price: 2400, details: "5 years Warranty,5 star ratings,Copper tank Rods,3 litre capacity,Instant Hot water", quantity: 1 },
        { id:5,name: 'RR Gas Water Heater', img: philips_grinder, price: 2300, details: "2 years Warranty,Copper pipes,Powerful motor,Instant hot water", quantity: 1 },
        { id:6,name: 'Anchor Water Heater(Trisa)', img: orpat_blender, price: 750, details: "5 years Warranty,5 star ratings,Copper tank Rods,Glassline body,25 litre capacity", quantity: 1 },
        { id:7,name: 'Crompton Water Heating Rod', img: crompton_blender, price: 1200, details: "1 year Warranty,5 star ratings,Copper pipes,Waterproof,Shockproof", quantity: 1 },
        { id:8,name: 'Windair Water Heating Rod', img: windair, price: 1200, details: "1 year Warranty,5 star ratings,Copper pipes,Waterproof,Shockproof", quantity: 1 },
        { id:9,name: 'Carryon Water Heating Rod', img: carryon, price: 1200, details: "1 year Warranty,5 star ratings,Copper pipes,Waterproof,Shockproof", quantity: 1 }
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

export default Geyser;
