import React, { useEffect } from 'react';
import './Navbar.css';
import profileimage from './images/shop_name.jpg';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ value, onChange, isCartBlinking ,userEmail}) {
    let history = useNavigate();
    const navigateToMycart = () => {
        history('/My_cart');
    };

    const navigateToInfo = () => {
        history('/info', { state: { email: userEmail } });
    };

    useEffect(() => {
        const placeholderTexts = [
            "Search",
            "Search for 'bulbs'",
            "Search for 'wires'",
            "Search for 'fans'",
            "Search for 'switches'",
            "Search for 'pipes'"
        ];

        let currentIndex = 0;
        let charIndex = 0;
        let currentText = '';
        const searchBar = document.getElementById('search_bar');

        const typePlaceholder = () => {
            currentText = placeholderTexts[currentIndex];
            searchBar.placeholder = currentText.slice(0, charIndex);

            if (charIndex < currentText.length) {
                charIndex++;
            } else {
                charIndex = 0;
                currentIndex = (currentIndex + 1) % placeholderTexts.length;
                clearInterval(typingInterval);
                setTimeout(() => {
                    typingInterval = setInterval(typePlaceholder, 150);
                }, 2000); // Pause for 2 seconds before starting to type the next text
            }
        };

        let typingInterval = setInterval(typePlaceholder, 150);

        return () => clearInterval(typingInterval); // Clean up on component unmount
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        console.log("Search Value:", value); 
    };

    return (
        <div className="sticky-top">
            <nav className="navbar navbar-expand-lg bg-purple navbar-light">
                <div className="container-fluid">
                    <a onClick={navigateToInfo} className="navbar-brand" id="profile"><img src={profileimage} alt="profile"></img></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/offer" className="nav-link"  style={{ color: 'white' }}>Offers</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}>
                                    Support
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/customer_care" className="dropdown-item" >Customer Care</Link></li>
                                    {/* <hr />
                                    <li><Link to="/elect" className="dropdown-item">Electrician Services</Link></li> */}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="/message" className="nav-link" href="#" style={{ color: 'white' }}>Messages</Link>
                            </li>
                         </ul>
                        <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                            <input className="form-control me-2" id="search_bar" type="search" placeholder="Search" aria-label="Search" value={value} onChange={onChange}></input>
                            <button className="btn btn-outline-success"  id="main_search" style={{ color: 'white',borderColor:'white' }}>Search</button>
                        </form>
                        <button className={`btn btn-outline-success ${isCartBlinking ? 'blinking' : ''}`} id="cart_button" onClick={navigateToMycart} style={{ color: 'white' ,borderColor:'white' }}>My Cart</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
