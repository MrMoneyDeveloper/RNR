import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './wwwroot/css/HeroSection.css';
import './wwwroot/css/CustomNavBar.css';
import './wwwroot/css/AnimatedBackground.css';
import './wwwroot/css/FeaturesSection.css';
import './wwwroot/css/Footer.css';
import './wwwroot/css/BreakdownForm.css'; // Import BreakdownForm.css
import './wwwroot/css/BreakdownList.css'; // Import BreakdownList.css

import CustomNavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AnimatedBackground from './components/AnimatedBackground';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import BreakdownList from './components/BreakdownList';

// Render the NavBar and other components in their respective div elements
ReactDOM.createRoot(document.getElementById('navbar')).render(<CustomNavBar />);
ReactDOM.createRoot(document.getElementById('hero-section')).render(<HeroSection />);
ReactDOM.createRoot(document.getElementById('animated-bg')).render(<AnimatedBackground />);
ReactDOM.createRoot(document.getElementById('features-section')).render(<FeaturesSection />);
ReactDOM.createRoot(document.getElementById('breakdown-list')).render(<BreakdownList />);
ReactDOM.createRoot(document.getElementById('footer')).render(<Footer />);
