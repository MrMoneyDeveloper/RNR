/*HeroSection.js*/
import React from 'react';
import '../wwwroot/css/HeroSection.css';

const HeroSection = () => {
    return (
        <div className="hero-container">
            <h1>Welcome to the Breakdown Management System</h1>
            <p>Efficiently manage and track vehicle breakdowns with ease.</p>
            <div className="hero-btns">
                <button className="btns" href="#breakdown-list" >View Breakdowns</button>
            </div>
        </div>
    );
}

export default HeroSection;

