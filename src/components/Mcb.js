import React, { useState } from 'react';
import indoasian_mcb from "./images/indoasian_sp.webp";
import havells_sp from "./images/havells_sp.webp";
import indoasian_dp from "./images/indoasian_dp.webp";
import havells_dp from "./images/havells_dp.jpg";
import indoasian_tp from "./images/indoasian_tp.jpg";
import havells_tp from "./images/havells_tp.webp";
import indoasian_fp from "./images/indoasian_fp.jpeg";
import havells_fp from"./images/havells_fp.webp";

import Navbar from './Navbar.js';
import './Led_batten.css';

function Led_batten() {
    const [products, setProducts] = useState([
        { id: 1, name: "IndoAsian Single Pole MCB's", img: indoasian_mcb, price: 170, details: "Fireproof,Effortless Tripping,6kA load,Single Pole", quantity: 1 },
        { id: 2, name: "Havells Single Pole MCB's", img: havells_sp, price: 250, details: "Fireproof,Effortless Tripping,6kA load,Single Pole", quantity: 1 },
        { id: 3, name: "IndoAsian Double Pole MCB's", img: indoasian_dp, price: 450, details: "Fireproof,Effortless Tripping,6kA load,Double Pole", quantity: 1 },
        { id: 4, name: "Havells Double Pole MCB's", img: havells_dp, price: 160, details: "Fireproof,Effortless Tripping,6kA load,Double Pole", quantity: 1 },
        { id: 5, name: "IndoAsian Triple Pole MCB's", img: indoasian_tp, price: 240, details: "Fireproof,Effortless Tripping,6kA load,Triple Pole", quantity: 1 },
        { id: 6, name: "Havells Triple Pole MCB's", img: havells_tp, price: 350, details: "Fireproof,Effortless Tripping,6kA load,Triple Pole", quantity: 1 },
        { id: 7, name: "IndoAsian Four Pole MCB's", img: indoasian_fp, price: 420, details: "Fireproof,Effortless Tripping,6kA load,Four Pole", quantity: 1 },
        { id: 8, name: "Havells Triple Pole MCB's", img: havells_fp, price: 650, details: "Fireproof,Effortless Tripping,6kA load,Four Pole", quantity: 1 },
       
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
            const response = await fetch('http://localhost:5000/carthandler', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, quantity, price, details })
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
            <Navbar onChange={handleSearch} value={searchTerm} isCartBlinking={isCartBlinking} />
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
