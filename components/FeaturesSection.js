import React from 'react';
import '../wwwroot/css/FeaturesSection.css'; // This should be the correct path

const FeaturesSection = () => {
    return (
        <div className="features-section">
            <h2 className="features-title">Features</h2>
            <ul className="features-list">
                <li className="feature-item">Feature 1: List Breakdowns - View a comprehensive list of all breakdowns with details such as reference number, company name, driver name, registration number, and breakdown date.</li>
                <li className="feature-item">Feature 2: Create Breakdown - Easily add a new breakdown to the system by providing necessary information including reference number, company name, driver name, registration number, and breakdown date.</li>
                <li className="feature-item">Feature 3: Update Breakdown - Select a breakdown from the list and update its details to keep the information accurate and up-to-date.</li>
            </ul>
        </div>
    );
}

export default FeaturesSection;
