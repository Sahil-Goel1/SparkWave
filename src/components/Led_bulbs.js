import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import bulb_9w from "./images/led_9w_philips.jpg";
import bulb_12w from "./images/led_12w_philips.jpg";
import bulb_14w from "./images/led_14w_philips.jpg";
import bulb_18w from "./images/led_18w_philips.jpg";
import bulb_20w from "./images/led_20w_philips.jpg";
import bulb_22w from "./images/led_22w_philips.jpg";
import bulb_26w from "./images/led_26w_philips.jpg";
import bulb_30w from "./images/led_30w_philips.jpg";
import bulb_50w from "./images/led_50w_philips.jpg";
import crompton_bulb_9w from "./images/led_9w.jpg";
import crompton_bulb_12w from "./images/led_12w.jpg";
import crompton_bulb_14w from "./images/led_14w.jpg";
import crompton_bulb_18w from "./images/led_18w.jpg";
import crompton_bulb_20w from "./images/led_20w.jpg";
import crompton_bulb_23w from "./images/led_23w.jpg";
import crompton_bulb_30w from "./images/led_30w.jpg";
import crompton_bulb_50w from "./images/led_50w.jpg";

import './Led_bulbs.css';
import Navbar from './Navbar.js';

function Led_bulbs() {

    const location = useLocation();
    const userEmail = location.state?.email;
    const [products, setProducts] = useState([
        {id:1, name: 'Philips 9W LED Bulb', img: bulb_9w, price: 80, details: "1 year Warranty, Eye Comfort,2 stars rating and 900 lumens", quantity: 1 },
        {id:2, name: 'Philips 12W LED Bulb', img: bulb_12w, price: 150, details: "1 year Warranty, Eye Comfort,2 stars rating and 1200 lumnes", quantity: 1 },
        {id:3, name: 'Philips 14W LED Bulb', img: bulb_14w, price: 180, details: "1 year Warranty, Eye Comfort,2 stars rating and 1400 lumnes", quantity: 1 },
        {id:4, name: 'Philips 18W LED Bulb', img: bulb_18w, price: 220, details: "1 year Warranty, Eye Comfort,2 stars rating and 1800 lumens", quantity: 1 },
        {id:5, name: 'Philips 20W LED Bulb', img: bulb_20w, price: 240, details: "1 year Warranty, Eye Comfort,2 stars rating and 2000 lumens", quantity: 1 },
        {id:5, name: 'Philips 22W LED Bulb', img: bulb_22w, price: 260, details: "1 year Warranty, Eye Comfort,2 stars rating and 2200 lumens", quantity: 1 },
        {id:6, name: 'Philips 26W LED Bulb', img: bulb_26w, price: 300, details: "1 year Warranty, Eye Comfort,2 stars rating and 2600 lumens", quantity: 1 },
        {id:7, name: 'Philips 30W LED Bulb', img: bulb_30w, price: 400, details: "1 year Warranty, Eye Comfort,2 stars rating and 3000 lumens", quantity: 1 },
        {id:8, name: 'Philips 50W LED Bulb', img: bulb_50w, price: 600, details: "1 year Warranty, Eye Comfort,2 stars rating and 5000 lumens", quantity: 1 },
        {id:9, name: 'Crompton 9W LED Bulb', img: crompton_bulb_9w, price: 70, details: "1 year Warranty, Eye Comfort,2 stars rating and 945 lumens", quantity: 1 },
        {id:10, name: 'Crompton 12W LED Bulb', img: crompton_bulb_12w, price: 120, details: "1 year Warranty, Eye Comfort,2 stars rating and 1260 lumens", quantity: 1 },
        {id:11, name: 'Crompton 14W LED Bulb', img: crompton_bulb_14w, price: 180, details: "1 year Warranty, Eye Comfort,2 stars rating and 1470 lumens", quantity: 1 },
        {id:12, name: 'Crompton 18W LED Bulb', img: crompton_bulb_18w, price: 220, details: "1 year Warranty, Eye Comfort,2 stars rating and 1890 lumens", quantity: 1 },
        {id:13, name: 'Crompton 20W LED Bulb', img: crompton_bulb_20w, price: 240, details: "1 year Warranty, Eye Comfort,2 stars rating and 2100 lumens", quantity: 1 },
        {id:14, name: 'Crompton 23W LED Bulb', img: crompton_bulb_23w, price: 300, details: "1 year Warranty, Eye Comfort,2 stars rating and 2415 lumens", quantity: 1 },
        {id:15, name: 'Crompton 30W LED Bulb', img: crompton_bulb_30w, price: 400, details: "1 year Warranty, Eye Comfort,2 stars rating and 3150 lumens", quantity: 1 },
        {id:16, name: 'Crompton 50W LED Bulb', img: crompton_bulb_50w, price: 600, details: "1 year Warranty, Eye Comfort,2 stars rating and 5250 lumens", quantity: 1 }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isCartBlinking, setIsCartBlinking] = useState(false);
    const [cartlist, setcartlist] = useState([]);
    const [name, setname] = useState('');
    const [quantity, setquantity] = useState(0);
    const [price, setprice] = useState('');
    const [details, setdetails] = useState('');
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

    function handleQuantityChange(event, index) {
        const updatedProducts = [...filteredProducts];
        updatedProducts[index].quantity = event.target.value; // This will replace the existing value
        setProducts(updatedProducts);
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
                body: JSON.stringify({ userEmail,name, quantity, price, details})
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
        <div id="led_bulb_main_page">
            <Navbar onChange={handleSearch} value={searchTerm} isCartBlinking={isCartBlinking} userEmail={userEmail}/>
            {alertVisible && (
                <div className={`sticky-top alert alert-${alertType}`} role="alert">
                    {alertMessage}
                </div>
            )}
            <div className="grid-container">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="sub_div1 d-flex position-relative">
                        <img src={product.img} className="led_bulb_image flex-shrink-0 me-3" alt="bulb_9w_philips" />
                        <div className="led_text_div">
                            <h5 className="mt-0">{product.name}</h5>
                            <h6>{product.details}</h6>
                            <h5>Rs. {product.price} only </h5>
                            <h5>Quantity</h5>
                            <div className="button_container">
                                <button className="minus_button" onClick={() => Decrement(index)}>-</button>
                                <input
                                 value={product.quantity}
                                 onChange={(e) => handleQuantityChange(e, index)}
                                 className="quantity_textarea"
                                 rows="1"
                                 type="number"
                                ></input>
                                <button className="plus_button" onClick={() => Increment(index)}>+</button>
                            </div>
                            <button className="led_button" onClick={()=>handleAddToCart(index)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Led_bulbs;
