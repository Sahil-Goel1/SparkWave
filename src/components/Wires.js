import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import reo_wire from "./images/reo_wire.jpg";
import rr_200 from "./images/rr_200.webp";
import havells_200 from "./images/havells_200.webp";
import zetax_image from "./images/zetax_image.jpg";
import AI_wire_2_core from "./images/Al_wire_2_core.webp";
import AI_4_core from "./images/Al_4_core.webp";
import Cu_2_core from "./images/Cu_2_core.webp";
import Cu_3_core from "./images/Cu_3_core.webp";
import Cu_4_core from "./images/Cu_4_core.webp";

import Navbar from './Navbar.js';
import './Led_batten.css';

function Wires() {
    const location = useLocation();
    const userEmail = location.state?.email;
    const [products, setProducts] = useState([
        { id: 1, name: 'Havells Reo Copper Wire 0.75MM', img: reo_wire, price: 170, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 2, name: 'Havells Reo Copper Wire 1.0MM', img: reo_wire, price: 250, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 3, name: 'Havells Reo Copper Wire 1.5MM', img:reo_wire, price: 450, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 4, name: 'Havells Reo Copper Wire 2.5MM', img: reo_wire, price: 160, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 5, name: 'Havells Reo Copper Wire 4.0MM', img: reo_wire, price: 240, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 6, name: 'RR Copper Wire 0.75MM', img: rr_200, price: 350, details: "Length 200 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 7, name: 'RR Copper Wire 1.0MM', img: rr_200, price: 420, details: "Length 200 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 8, name: 'RR Copper Wire 1.5MM', img: rr_200, price: 650, details: "Length 200 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 9, name: 'RR Copper Wire 2.5MM', img: rr_200, price: 50, details: "Length 200 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 10, name: 'RR Copper Wire 4.0MM', img: rr_200, price: 50, details: "Length 200 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 11, name: 'Havells Copper Wire 0.75MM', img: havells_200, price: 170, details: "Length 180 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 12, name: 'Havells Copper Wire 1.0MM', img: havells_200, price: 250, details: "Length 180 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 13, name: 'Havells Copper Wire 1.5MM', img: havells_200, price: 450, details: "Length 180 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 14, name: 'Havells Copper Wire 2.5MM', img: havells_200, price: 160, details: "Length 180 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 15, name: 'Havells Copper Wire 4.0MM', img: havells_200, price: 240, details: "Length 180 metres ,Fireproof,ISI trademark,Pure copper,Industrial Favourite", quantity: 1 },
        { id: 16, name: 'Zetax Copper Wire 0.75MM ', img: zetax_image, price: 700, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 17, name: 'Zetax Copper Wire 1.0MM', img: zetax_image, price: 440, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 18, name: 'Zetax Copper Wire 1.5MM', img: zetax_image, price: 50, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 19, name: 'Zetax Copper Wire 2.5MM', img: zetax_image, price: 50, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 20, name: 'Zetax Copper Wire 4MM', img: zetax_image, price: 50, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 21, name: 'Zetax Copper Wire 6.0MM', img: zetax_image, price: 50, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 22, name: 'Zetax Copper Wire 10.0MM', img: zetax_image, price: 50, details: "Length 90 metres ,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 23, name: 'Zetax Copper Wire 2.5MM', img: Cu_2_core, price: 50, details: "Length 90 metres,2 core,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 24, name: 'Zetax Copper Wire 4.0MM', img: Cu_2_core, price: 50, details: "Length 90 metres,2 core,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 25, name: 'Zetax Copper Wire 2.5MM', img: Cu_3_core, price: 50, details: "Length 90 metres ,3 core,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 26, name: 'Zetax Copper Wire 4.0MM', img: Cu_3_core, price: 50, details: "Length 90 metres,3 core,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 27, name: 'Zetax Copper Wire 2.5MM', img: Cu_4_core, price: 50, details: "Length 90 metres ,4 core,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 28, name: 'Zetax Copper Wire 4.0MM', img: Cu_4_core, price: 50, details: "Length 90 metres ,4 core,Fireproof,ISI trademark,Pure copper", quantity: 1 },
        { id: 29, name: 'Zetax Aluminium Wire 6.0MM', img: AI_wire_2_core, price: 50, details: "Length 90 metres,2 core,Fireproof,ISI trademark,Pure Aluminium", quantity: 1 },
        { id: 30, name: 'Zetax Aluminium Wire 10.0MM', img: AI_wire_2_core, price: 50, details: "Length 90 metres ,2 core,Fireproof,ISI trademark,Pure Aluminium", quantity: 1 },
        { id: 31, name: 'Zetax Aluminium Wire 16.0MM', img: AI_wire_2_core, price: 50, details: "Length 90 metres ,2 core,Fireproof,ISI trademark,Pure Aluminium", quantity: 1 },
        { id: 32, name: 'Zetax Aluminium Wire 10.0MM', img: AI_4_core, price: 50, details: "Length 90 metres ,4 core,Fireproof,ISI trademark,Pure Aluminium", quantity: 1 },
        { id:33, name: 'Zetax Aluminium Wire 16.0MM', img: AI_4_core, price: 50, details: "Length 90 metres ,4 core,Fireproof,ISI trademark,Pure Aluminium", quantity: 1 },
        
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
            <Navbar onChange={handleSearch} value={searchTerm} isCartBlinking={isCartBlinking} userEmail={userEmail} />
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

export default Wires;
