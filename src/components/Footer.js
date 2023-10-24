import React from "react";
import logo from "../assets/images/logo2.png"
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div id="footer">
            <div id="footer-1">
                <Link to="/"><img src={logo} alt="footer logo"></img></Link>
                <p>As a top-tier asset management firm operating in the financial markets, 
                    Breakeven is committed to delivering exceptional returns for its investors 
                    through the strict adherence to state-of-the-art technology-driven 
                    mathematical and statistical methods.</p>
                <a href="https://www.facebook.com/profile.php?id=100078914531045" target="_blank" rel="noreferrer" title="https://www.facebook.com/profile.php?id=100078914531045"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://www.instagram.com/breakevencapital/" target="_blank" rel="noreferrer" title="https://www.instagram.com/breakevencapital/"><i className="fa-brands fa-instagram"></i></a>
                <p style={{fontSize: "0.8rem"}}>© 2023 Breakeven Capital LLC. All rights reserved.  </p>
            </div>
            <div id="footer-2">
                <div id="footer-2-1">
                    <div>
                        <h4>About Us</h4>
                        <hr/>
                        <h5>OUR COMPANY</h5>
                        <Link to="/about">About Breakeven</Link>
                        <Link to="/team">Our team</Link>
                        <h5>CONNECT WITH US</h5>
                        <Link to="/contact">Customer Service</Link>
                    </div>
                    <div>
                        <h4>Solutions</h4>
                        <hr/>
                        <h5>FUNDS</h5>
                        <Link to="/funds/eventdriven">Event Driven</Link>
                        <Link to="/funds/macro">Macro</Link>
                        <Link to="/funds/quantitative">Quantitative</Link>
                        <Link to="/funds/bestvalue">Best Value</Link>
                        <h5>PRODUCTS</h5>
                        <Link to="/products/equityzero">Equity Zero</Link>
                    </div>   
                    <div>
                        <h4>Resources</h4>
                        <hr/>
                        <Link to="/documents">Documents</Link>
                        <Link to="/blog">Blog</Link>
                        <Link to="/faqs">FAQs</Link>
                    </div>    
                    <div>
                        <h4>Legal</h4>
                        <hr/>
                        <a href="https://firebasestorage.googleapis.com/v0/b/breakeven-new.appspot.com/o/Privacy%20Breakeven%20Captal%20LLC.pdf?alt=media&token=54613ef3-f3b3-439c-ba8b-1a48e98c7cda" rel="noreferrer" target="_blank">Privacy policy</a>
                        <a href="https://firebasestorage.googleapis.com/v0/b/breakeven-new.appspot.com/o/Risk%20Disclosure%20Statement.pdf?alt=media&token=c0301f4e-3d2e-40b6-b2ca-ca77d639827b" rel="noreferrer" target="_blank">Risk disclosure</a>
                        <a href="https://firebasestorage.googleapis.com/v0/b/breakeven-new.appspot.com/o/AML%20Breakeven%20Captal%20LLC.pdf?alt=media&token=c62f4167-9ca5-4799-a14a-82707415eb20" rel="noreferrer" target="_blank">Anti-money laundering</a>
                    </div>
                </div>
            </div>
           
        </div>
    )
}