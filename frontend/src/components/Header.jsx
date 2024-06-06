import { NavLink } from "react-router-dom";
import { BsFacebook , BsInstagram , BsStarFill } from "react-icons/bs";

function Header(){
    return (
        <header>
            <nav className="navbar">
                <NavLink to="/" className="title"> <span><img src="/star.png" className="website-logo"/></span>Sweet Touch</NavLink>
                <ul>
                <li>
                        <NavLink to="/digitalmarketing">Digital Marketing</NavLink>
                    </li>
                        
                    <li>
                        <NavLink to="/photography">Product Photography</NavLink>
                    </li>    

                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>

                    <li>
                        <NavLink to="/about">About-us</NavLink>
                    </li>  

                    <li>
                        <NavLink to="/">FAQs</NavLink>
                    </li> 
                </ul>
                <div className="social-media-container">
                    <div className="social-media">
                        <NavLink><BsInstagram /></NavLink>
                        <NavLink><BsFacebook /></NavLink>
                    </div> 
                    <NavLink className="get-started-btn">Get Started</NavLink>
                </div>
            </nav>
        </header>
    )
}
export default Header;