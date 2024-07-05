import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../wwwroot/css/HeroSection.css';
import '../wwwroot/css/CustomNavBar.css';
import '../wwwroot/css/AnimatedBackground.css';
import '../wwwroot/css/FeaturesSection.css';
import '../wwwroot/css/Footer.css';
import '../wwwroot/css/BreakdownForm.css'; // Import BreakdownForm.css
import '../wwwroot/css/BreakdownList.css'; // Import BreakdownList.css

import CustomNavBar from './CustomNavBar';
import HeroSection from './HeroSection';
import AnimatedBackground from './AnimatedBackground';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import BreakdownList from './BreakdownList';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <CustomNavBar />
            <HeroSection />
            <AnimatedBackground />
            <FeaturesSection />
            <BreakdownList />
            <Footer />
        </React.StrictMode>
    );
} else {
    ReactDOM.createRoot(document.getElementById('navbar')).render(<CustomNavBar />);
    ReactDOM.createRoot(document.getElementById('hero-section')).render(<HeroSection />);
    ReactDOM.createRoot(document.getElementById('animated-bg')).render(<AnimatedBackground />);
    ReactDOM.createRoot(document.getElementById('features-section')).render(<FeaturesSection />);
    ReactDOM.createRoot(document.getElementById('breakdown-list')).render(<BreakdownList />);
    ReactDOM.createRoot(document.getElementById('footer')).render(<Footer />);
}
