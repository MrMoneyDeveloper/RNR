/*HeroSection.js*/
import React from 'react';
import '../wwwroot/css/HeroSection.css';

const HeroSection = () => {
    return (
        <div className="hero-container">
            <h1>Welcome to the Breakdown Management System</h1>
            <p>Efficiently manage and track vehicle breakdowns with ease.</p>
            <div className="hero-btns">
                <a className="btns" href="https://localhost:7124/swagger/index.html">View Breakdowns</a>
            </div>
        </div>
    );
}

export default HeroSection;

