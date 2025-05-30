import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import batten_20w from "./images/philips_led_batten_20w.jpg";
import batten_25w from "./images/philips_led_batten_25w.jpg";
import batten_36w from "./images/philips_led_batten_36w.jpg";
import cromp_batten_20w from "./images/crompton_led_batten_20w.jpg";
import cromp_batten_28w from "./images/crompton_led_batten_28w.jpg";
import cromp_batten_36w from "./images/crompton_led_batten_36w.jpg";
import cromp_batten_50w from "./images/crompton_led_batten_50w.jpg";
import surya_tube_36w from "./images/surya_36w_tube.jpg";
import surya_tube_40w from "./images/surya_40w_tube.jpg";

import Navbar from './Navbar.js';
import './Led_batten.css';

function Led_batten() {
    const location = useLocation();
    const userEmail = location.state?.email;
    const [products, setProducts] = useState([
        { id: 1, name: 'Philips 20W LED Batten', img: batten_20w, price: 170, details: "1 year Warranty, Eye Comfort,2 star ratings,2000 lumens,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 2, name: 'Philips 25W LED Batten', img: batten_25w, price: 250, details: "1 year Warranty, Eye Comfort,2 star ratings,2500 lumens,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 3, name: 'Philips 36W LED Batten', img: batten_36w, price: 450, details: "1 year Warranty, Eye Comfort,2 star ratings,3600 lumens,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 4, name: 'Crompton 20W LED Batten', img: cromp_batten_20w, price: 160, details: "1 year Warranty, Eye Comfort,2 star ratings,2000 lumens,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 5, name: 'Crompton 24W LED Batten', img: cromp_batten_20w, price: 240, details: "1 year Warranty, Eye Comfort,2 star ratings,2400 lumens,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 6, name: 'Crompton 28W LED Batten', img: cromp_batten_28w, price: 350, details: "1 year Warranty, Eye Comfort,2 star ratings,2800 lumens,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 7, name: 'Crompton 36W LED Batten', img: cromp_batten_36w, price: 420, details: "1 year Warranty, Eye Comfort,2 star ratings,3600 lumens,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 8, name: 'Crompton 50W LED Batten', img: cromp_batten_50w, price: 650, details: "1 year Warranty, Eye Comfort,2 star ratings,5000 lumens,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 9, name: 'Surya 36W Tube Light', img: surya_tube_36w, price: 50, details: "1 year Warranty, Eye Comfort,2 star ratings,4 feet length,Easy to Fit,Light Weight", quantity: 1 },
        { id: 10, name: 'Surya 40W Tube Light', img: surya_tube_40w, price: 50, details: "1 year Warranty, Eye Comfort,2 star ratings,4 feet length,Easy to Fit,Light Weight", quantity: 1 }
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
            const response = await fetch('https://sparkwave-backend.onrender.com/carthandler', {
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
                <div key={product.id} className="sub_div2 d-flex position-relative">
                    <img src={product.img} className="led_batten_image flex-shrink-0 " alt={product.name} />
                    <div className="led_batten_text_div">
                        <h2 className="mt-0">{product.name}</h2>
                        <h3>{product.details}</h3>
                        <h3>Rs. {product.price} only </h3>
                        <div className="button_container">
                            <h4>Quantity :</h4>
                            <button className="batten_minus_button" onClick={() => Decrement(index)}>-</button>
                            <input
                                 value={product.quantity}
                                 onChange={(e) => handleQuantityChange(e, index)}
                                 className="quantity_textarea1"
                                 rows="1"
                                 type="number"
                                ></input>
                            <button className="batten_plus_button" onClick={() => Increment(index)}>+</button>
                        </div>
                        <button className="led_batten_button" onClick={() => handleAddToCart(index)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Led_batten;
