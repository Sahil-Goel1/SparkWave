import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import crompton_jmg from "./images/crompton.jpg";
import crompton_grinder from "./images/crompton_grinder.jpg";
import philips_jmg from "./images/philips_jmg.jpg"
import orient_jmg from "./images/oreint_jmg.jpg"
import philips_grinder from "./images/philips_grinder.webp";
import orpat_blender from "./images/orpat_blender.webp";
import crompton_blender from "./images/crompton_blender.webp";
import Navbar from './Navbar.js';
import './Led_batten.css'

function Jmg() {
    const location = useLocation();
    const userEmail = location.state?.email;
    const [products, setProducts] = useState([
        { id:1,name: 'Crompton Juicer Mixer Grinder(Fresh Mix)', img: crompton_jmg, price: 2400, details: "2 years Warranty,5 star ratings,Powerful motor,Stainless steel blades", quantity: 1 },
        { id:2,name: 'Crompton Mixer Grinder', img: crompton_grinder, price: 2100, details: "5 years Warranty,5 star ratings,Powerful motor,Stainless steel blades", quantity: 1 },
        { id:3,name: 'Philips Juicer Mixer Grinder', img: philips_jmg, price: 2700, details: "2 years Warranty,5 star ratings,Powerful motor,Stainless steel blades", quantity: 1 },
        { id:4,name: 'Orient Juicer Mixer Grinder', img: orient_jmg, price: 2400, details: "2 years Warranty,5 star ratings,Powerful motor,Stainless steel blades", quantity: 1 },
        { id:5,name: 'Philips Mixer Grinder', img: philips_grinder, price: 2300, details: "5 years Warranty,5 star ratings,Powerful motor,Stainless steel blades", quantity: 1 },
        { id:6,name: 'Orpat Hand Blender', img: orpat_blender, price: 750, details: "5 star ratings,Powerful motor,Stainless steel blades", quantity: 1 },
        { id:7,name: 'Crompton Hand Blender', img: crompton_blender, price: 1200, details: "2 years Warranty,5 star ratings,Powerful motor,Stainless steel blades", quantity: 1 }
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

export default Jmg;
