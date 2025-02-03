import Welcome_Page from './components/Welcome_Page.js'
import Register_page from './components/Register_page.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sign_in from './components/Sign_in.js'
import New_Id from './components/New_Id.js'
import Main_page from './components/Main_page.js'
import Profile_page from './components/Profile_page.js'
import Info from './components/Customer_info.js'
import Elect_page from './components/Electrician_support.js'
import Jmg from './components/Jmg.jsx'
import Ceiling_fans from './components/Ceiling_fans.js'
import Cooler from './components/Cooler.js'
import Extensions from './components/Extensions.js'
import Fan_box from './components/Fan_box.js'
import Geyser from './components/Geyser.js'
import Heater from './components/Heater.js'
import Kettle from './components/Kettle.js'
import Led_batten from './components/Led_batten.js'
import Led_bulbs from './components/Led_bulbs.js'
import Mcb_box from './components/Mcb_box.js'
import Mcb from './components/Mcb.js'
import Panels from './components/Panels.jsx'
import Steam_iron from './components/Steam_iron.js'
import Switches from './components/Switches.js'
import Trimmer from './components/Trimmer.js'
import Vent_wall from './components/Vent_wall.jsx'
import Wires from './components/Wires.js'
import Woman from './components/Woman.js'
import My_cart from './components/My_cart.js'
import New_electrician from './components/New_electrician.js'
import Offers from './components/Offer.js'
import Password from './components/Password.js'
import Customer_care from './components/Customer_care.js'
import Message from './components/Message.js'

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Welcome_Page/>} />
      <Route path="/Register_page" element={<Register_page/>} />
      <Route path="/Sign_in" element={<Sign_in/>} />
      <Route path="/New_Id" element={<New_Id/>} />
      <Route path="/main_page" element={<Main_page/>} />
      <Route path ="/profile_page" element ={<Profile_page/>} />
      <Route path ="/info" element ={<Info/>} />
      <Route path ="/elect" element ={<Elect_page/>} />
      <Route path ="/jmg" element ={<Jmg/>} />
      <Route path ="/Ceiling_fans" element ={<Ceiling_fans/>} />
      <Route path ="/Cooler" element ={<Cooler/>} />
      <Route path ="/Extensions" element ={<Extensions/>} />
      <Route path ="/Fan_box" element ={<Fan_box/>} />
      <Route path ="/Geyser" element ={<Geyser/>} />
      <Route path ="/Heater" element ={<Heater/>} />
      <Route path ="/Kettle" element ={<Kettle/>} />
      <Route path ="/Led_batten" element ={<Led_batten/>} />
      <Route path ="/Led_bulbs" element ={<Led_bulbs/>} />
      <Route path ="/Mcb_box" element ={<Mcb_box/>} />
      <Route path ="/Mcb" element ={<Mcb/>} />
      <Route path ="/Panels" element ={<Panels/>} />
      <Route path ="/Steam_iron" element ={<Steam_iron/>} />
      <Route path ="/Switches" element ={<Switches/>} />
      <Route path ="/Trimmer" element ={<Trimmer/>} />
      <Route path ="/Vent_wall" element ={<Vent_wall/>} />
      <Route path ="/Wires" element ={<Wires/>} />
      <Route path ="/Woman" element ={<Woman/>} />
      <Route path ="/My_cart" element ={<My_cart/>} />
      <Route path ="/My_cart" element ={<My_cart/>} />
      <Route path ="/new_electrician" element ={<New_electrician/>} />
      <Route path ="/offer" element ={<Offers/>} />
      <Route path ="/password" element ={<Password/>} />
      <Route path="/customer_care" element={<Customer_care/>} />
      <Route path="/message" element={<Message/>} />

    </Routes>
    </Router>
  );
}

export default App;
