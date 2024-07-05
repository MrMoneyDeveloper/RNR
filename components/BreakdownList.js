import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BreakdownForm from './BreakdownForm';
import '../wwwroot/css/BreakdownList.css';

const BreakdownList = () => {
    const [breakdowns, setBreakdowns] = useState([]);
    const [selectedBreakdown, setSelectedBreakdown] = useState(null);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchBreakdowns = async () => {
            try {
                const response = await axios.get('/api/breakdowns');
                if (response.data && response.data.$values && response.data.$values.length === 0) {
                    setBreakdowns([]);
                } else if (response.data && response.data.$values) {
                    setBreakdowns(response.data.$values);
                } else {
                    setBreakdowns([]);
                }
            } catch (error) {
                setError('Error fetching breakdowns');
            }
        };
        fetchBreakdowns();
    }, []);

    const handleEdit = (breakdown) => {
        setSelectedBreakdown(breakdown);
        setIsFormVisible(true);
    };

    const handleCreate = () => {
        setSelectedBreakdown(null);
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    return (
        <div className="breakdown-list-container">
            <button onClick={handleCreate}>Create New Breakdown</button>
            {isFormVisible && (
                <div className="breakdown-form-wrapper">
                    <button onClick={handleCloseForm} className="close-form-button">Close</button>
                    <BreakdownForm breakdown={selectedBreakdown} setBreakdown={setSelectedBreakdown} />
                </div>
            )}
            {error && <p className="no-data-message" style={{ color: 'red' }}>{error}</p>}
            <table className="breakdown-table">
                <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Company Name</th>
                        <th>Driver Name</th>
                        <th>Registration Number</th>
                        <th>Breakdown Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {breakdowns.length > 0 ? (
                        breakdowns.map(breakdown => (
                            <tr key={breakdown.id}>
                                <td>{breakdown.breakdownReference}</td>
                                <td>{breakdown.companyName}</td>
                                <td>{breakdown.driverName}</td>
                                <td>{breakdown.registrationNumber}</td>
                                <td>{new Date(breakdown.breakdownDate).toLocaleString()}</td>
                                <td className="breakdown-actions">
                                    <button onClick={() => handleEdit(breakdown)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-data-message">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BreakdownList;
