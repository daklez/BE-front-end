import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <section id="jumbotron">
                <h1>BREAK EVEN CAPITAL LLC</h1>
                <div id="be-decoration"></div>
                <h2>Our team and technology propel us to greater heights</h2>
                <h3>¡Where individual ambitions serves the common good!</h3>
            </section>
            <section id="home-about">
                <article id="home-about-1">
                    <h2>Our utmost priority lies in the best interests of 
                    <span> our investors</span>
                    </h2>
                    <p>We continuously invest in talent, technology, and research 
                        with the aim of delivering the best results and concrete 
                        solutions for our investors.</p>
                    <Link to="/about">Learn more about us</Link>  
                </article>
                <figure id="home-about-2">
                    <img src="https://images.pexels.com/photos/1770808/pexels-photo-1770808.jpeg?auto=compress&cs=tinysrgb&w=600" alt="people walking"></img>
                </figure>     
            </section>
            <section id="home-we-invest">
                <h2>We Invest</h2>
                <article className="home-we-invest-card">
                    <div>
                        <h3>Fundamental Investments</h3>
                        <p>We rely on a robust economic theory and analysis to 
                        assist us in delivering repeatable long-term results; 
                        we are meticulous in every detail of the investment 
                        process.</p>
                    </div>
                    <figure>
                        <img src="https://images.pexels.com/photos/259006/pexels-photo-259006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="person holding document papers"></img>
                    </figure>
                </article>
                <article className="home-we-invest-card">
                    <figure>
                        <img src="https://images.pexels.com/photos/5668837/pexels-photo-5668837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="businessman reading documents in the office"></img>
                    </figure>
                    <div>
                        <h3>Systematic Application</h3>
                        <p>A disciplined methodology underlies everything we do. 
                            Our models are based on a continuous process of design, 
                            refinement, testing, and repetition.</p>
                    </div>
                </article>
                <article className="home-we-invest-card">
                    <div>
                        <h3>Coherent Analysis</h3>
                        <p>In portfolio construction, risk management, and trading, 
                            we seek additional value for our investments using both 
                            qualitative and quantitative tools.</p>
                    </div>
                    <figure>
                        <img src="https://images.pexels.com/photos/6772077/pexels-photo-6772077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="a person holding a smartphone and laptop"></img>
                    </figure>
                </article>
            </section>
            <section id="home-how-we-invest">
                <article>
                    <h2>A smart combination of experience and automated tools.</h2>
                    <p>We integrate systematic risk management tools and human oversight 
                        (including a dedicated team) into the investment process. 
                        We believe that utilizing data and a technological platform, 
                        along with striving to gather as much information as possible 
                        for making the best predictions and effectively managing risk, 
                        is the right path to follow.</p>
                    <Link to="/team">Learn more about our team</Link>
                </article>
            </section>
            <section id="home-solutions">
                <article>
                    <h2>Solutions that match up with investing goals and preferences</h2>
                    <p>At Breakeven, we believe our investors deserve an expert partner 
                        they can trust to achieve their financial goals. 
                        We're helping more investors build solid financial futures 
                        by preserving and managing their wealth.</p>
                </article>
                <article>
                    <h3>FUNDS</h3>
                    <p>Each investor has a different story, and we listen to every one of them. 
                        Our full range of funds is specially designed to deliver strong outcomes.</p>
                    <Link to="/funds">See funds</Link>
                    <h3>PRODUCTS</h3>
                    <p> Enjoy optimal returns through a unique combination of fixed and 
                        variable income in the stock market.</p>
                    <Link to="/products/equityzero">See products</Link>
                </article>
            </section>
            <section id="home-statistics">
                <article>
                    <i className="fa-regular fa-face-laugh-beam"></i>
                    <h3>+60</h3>
                    <h2>Investors</h2>
                </article>
                <article>
                    <i className="fa-solid fa-money-bill-transfer"></i>
                    <h3>+150</h3>
                    <h2>Withdrawals</h2>
                </article>
                <article>
                    <i className="fa-regular fa-thumbs-up"></i>
                    <h3>+100</h3>
                    <h2>Positive Opinons</h2>
                </article>
                <article>
                    <i className="fa-regular fa-handshake"></i>
                    <h3>+10</h3>
                    <h2>Annual Meetings</h2>
                </article>
            </section>
            <section id="home-contact">
                <h2>Have some questions?</h2>
                <p>Check our <Link to="/faqs">FAQs</Link> section or contact our costumer service team. We will be pleased to listen to you and resolve your queries</p>
                <Link to="/contact">Contact Us</Link>
            </section>
        </>
    )
}