import React, { useState } from 'react';
import altrix from "./images/altrix.webp";
import aura from "./images/aura.webp";
import briz_air from "./images/briz_air.webp";
import brizair_24 from "./images/brizair_24.webp";
import brizair_36 from "./images/brizair_36.webp";
import coolking from "./images/coolking.webp";
import ikano_ivory_2 from "./images/ikano_ivory_2.webp";
import inspirio from "./images/inspirio.jpg";
import super_briz_deco from "./images/super_briz_deco.webp";
import toro from "./images/toro.webp";

import Navbar from './Navbar.js';
import './Ceiling_fans.css';

function Led_batten() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Anchor Ceiling Fan (Altrix Star)', img: altrix, price: 170, details: "1200 MM ,2 years Warranty, 100% Copper Winding ,1 star ratings, Aluminium Blades , 420 RPM , 75 Watt,Toll Free Service", quantity: 1 },
        { id: 2, name: 'Crompton Ceiling Fan (Aura)', img: aura, price: 250, details: "1200 MM,2 years Warranty, 100% Copper Winding ,1 star ratings, Aluminium Blades , Toll Free Service , 75 Watt,380 RPM,Golden Ring with designer blades", quantity: 1 },
        { id: 3, name: 'Crompton Ceiling Fan (Briz Air)', img: briz_air, price: 450, details: "1200 MM,2 years Warranty, 100% Copper Winding ,1 star ratings, Aluminium Blades , Toll Free Service , 75 Watt,380 RPM", quantity: 1 },
        { id: 4, name: 'Crompton Ceiling Fan (Briz Air)', img: brizair_24, price: 160, details: "600 MM,2 years Warranty, 100% Copper Winding ,1 star ratings, Aluminium Blades , Toll Free Service , 75 Watt,1200 RPM", quantity: 1 },
        { id: 5, name: 'Crompton Ceiling Fan (Briz Air)', img: brizair_36, price: 240, details: "900 MM,2 years Warranty, 100% Copper Winding ,1 star ratings, Aluminium Blades , Toll Free Service , 75 Watt,900 RPM", quantity: 1 },
        { id: 6, name: 'Anchor Ceiling Fan (CoolKing)', img: coolking, price: 350, details: "1200 MM,2 years Warranty, 100% Copper Winding ,1 star ratings, Aluminium Blades , Toll Free Service , 75 Watt,380 RPM", quantity: 1 },
        { id: 7, name: 'Atomberg Ceiling Fan (Ikano)', img: ikano_ivory_2, price: 420, details: "1200 MM,2 years Warranty, BLDC Fan,1 star ratings, Aluminium Blades , Toll Free Service , 30 Watt,360 RPM,Extendable Warranty,With Remote", quantity: 1 },
        { id: 8, name: 'Anchor Ceiling Fan (Inspirio)', img: inspirio, price: 650, details: "1200 MM,2 years Warranty, BLDC Fan ,1 star ratings, Aluminium Blades , Toll Free Service , 30 Watt,360 RPM,With Remote", quantity: 1 },
        { id: 9, name: 'Crompton Ceiling Fan (Super Briz Deco)', img: super_briz_deco, price: 50, details: "2 years Warranty, 100% Copper Winding ,1 star ratings, Aluminium Blades , Toll Free Service , 75 Watt,400 RPM,Golden Ring with designer blades", quantity: 1 },
        { id: 10, name: 'Crompton Ceiling Fan (Toro)', img: toro, price: 50, details: "2 years Warranty, 100% Copper Winding ,1 star ratings, Aluminium Blades , Toll Free Service , 75 Watt,400 RPM ,Anti Rust", quantity: 1 }
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
                                style={{marginTop:"-10px",marginLeft:"20px"}}></input>
                            <button className="batten_plus_button" onClick={() => Increment(index)}>+</button>
                        </div>
                        <button className="ceiling_fan_button" onClick={() => handleAddToCart(index)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Led_batten;
