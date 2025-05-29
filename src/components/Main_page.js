import React,{useState } from 'react'
import './Main_page.css'
import {Link} from 'react-router-dom'
import fan_image from "./images/usha.jpg"
import wall_exhaust from "./images/wall_exhaust.jpg"
import led_image from "./images/led_12w_philips.jpg"
import rr_image from "./images/RR_front.jpg"
import gajraj from "./images/gajraj.jpg"
import anchor from "./images/anchor-modular-switches.jpg"
import jmg from "./images/crompton.jpg"
import wire from './images/reo_wire.jpg'
import all_fans from './images/all-types-of-fan.jpg'
import led_batten_main from './images/led_batten.jpg'
import geyser from './images/geyser.jpg'
import Navbar from './Navbar.js'
import mcb_box from './images/mcb_box.jpg'
import mcb from './images/mcb.jpg'
import heater from './images/heater.jpg'
import steam_iron from './images/steam_iron.jpg'
import cooler from './images/coolers.jpg'
import { useNavigate, useLocation } from 'react-router-dom';

function Main_page(){

  let history = useNavigate();
    const location = useLocation();
    const userEmail = location.state?.email;

  const [products, setProducts] = useState([
    { id: 1, name: 'Juicers,Mixers & Blenders', img: jmg, link: '/jmg' },
    { id: 2, name: 'Wires & Cables', img: wire, link: '/Wires' },
    { id: 3, name: 'Ventilation,Wall & Pedestal Fan', img: wall_exhaust, link: '/Vent_wall' },
    { id: 4, name: 'LED Bulbs', img: led_image, link: '/Led_bulbs' },
    { id: 5, name: 'Ceiling Fans', img: fan_image, link: '/Ceiling_fans' },
    { id: 6, name: 'LED Battens', img: led_batten_main, link: '/Led_batten' },
    { id: 7, name: 'Geysers & Rods', img: geyser, link: '/Geyser' },
    { id: 8, name: 'MCB Box', img: mcb_box, link: '/Mcb_box' },
    { id: 9, name: 'MCB,RCCB & MCCB', img: mcb, link: '/Mcb' },
    { id: 10, name: 'Electric Room Heaters', img: heater, link: '/Heater' },
    { id: 11, name: 'Irons', img: steam_iron, link: '/Steam_iron' },
    { id: 12, name: 'Air Coolers', img: cooler, link: '/Cooler' }
]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartBlinking, setIsCartBlinking] = useState(false);
  
  function handleSearch(event) {
  setSearchTerm(event.target.value);
  }

  const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

    return(
      <div id="main_page_big_box">
        <Navbar onChange={handleSearch} value={searchTerm} isCartBlinking={isCartBlinking} userEmail={userEmail} />
   <div id="carouselExampleAutoPlaying" className="carousel slide" data-bs-ride="carousel" >
    <div className="carousel-inner">
    <div className="carousel-item active" id="image_1">
      <Link to="/Ceiling_fans">
      <img src={fan_image} className="d-block w-100" alt="fans"/></Link>
    </div>
    <div className="carousel-item" id="image_2">
    <Link to="/Ceiling_fans">
      <img src={all_fans} className="d-block w-100" alt="fans"/></Link>
    </div>
    <div className="carousel-item" id="image_3">
    <Link to="/Led_bulbs">
      <img src={led_image} className="d-block w-100" alt="leds"/></Link>
    </div>
    <div className="carousel-item" id="image_3">
    <Link to="/Wires">
      <img src={rr_image} className="d-block w-100" alt="wires"/></Link>
    </div>
    <div className="carousel-item" id="image_3">
    <Link to="/Pipes">
      <img src={gajraj} className="d-block w-100" alt="pipes"/></Link>
    </div>
    <div className="carousel-item" id="image_3">
    <Link to="/Extensions">
      <img src={anchor} className="d-block w-100" alt="entensions"/></Link>
    </div>
    <div className="carousel-item" id="image_3">
    <Link to="/jmg">
      <img src={jmg} className="d-block w-100" alt="jmg"/></Link>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
     </button>
     </div>

     <div className="product_box">
      {filteredProducts.map((product)=>(
        <figure  key={product.id} className="figure">
        <Link to={product.link} state={{ email: userEmail }}>
       <img src={product.img} className="figure-img img-fluid rounded" alt={product.name}/></Link>
       <figcaption className="figure-caption text-center">{product.name}</figcaption>
       </figure>

      ))}

     </div>
     </div>
    )
}

export default Main_page;
