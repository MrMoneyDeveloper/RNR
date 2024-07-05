import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../wwwroot/css/BreakdownForm.css';
import { validateFormData } from '../components/validation'; // Adjust the path as needed

const BreakdownForm = ({ breakdown, setBreakdown }) => {
    const [formData, setFormData] = useState({
        id: null,
        breakdownReference: '',
        companyName: '',
        driverName: '',
        registrationNumber: '',
        breakdownDate: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (breakdown) {
            setFormData({
                id: breakdown.id,
                breakdownReference: breakdown.breakdownReference,
                companyName: breakdown.companyName,
                driverName: breakdown.driverName,
                registrationNumber: breakdown.registrationNumber,
                breakdownDate: breakdown.breakdownDate
            });
        } else {
            setFormData({
                id: null,
                breakdownReference: '',
                companyName: '',
                driverName: '',
                registrationNumber: '',
                breakdownDate: ''
            });
        }
    }, [breakdown]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = await validateFormData(formData, breakdown);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                if (breakdown && breakdown.id) {
                    await axios.put(`/api/breakdowns/${breakdown.id}`, formData);
                } else {
                    const { id, ...createData } = formData;
                    await axios.post('/api/breakdowns', createData);
                }
                setFormData({
                    id: null,
                    breakdownReference: '',
                    companyName: '',
                    driverName: '',
                    registrationNumber: '',
                    breakdownDate: ''
                });
                setBreakdown(null);
                window.location.reload(); // Reload the page upon successful submission
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setErrors({ ...errors, server: error.response.data.message });
                } else {
                    console.error('Error submitting form:', error);
                }
            }
        }
    };

    return (
        <div className="breakdown-form-container">
            <h1>{breakdown && breakdown.id ? 'Update Breakdown' : 'Create Breakdown'}</h1>
            <form className="breakdown-form" onSubmit={handleSubmit}>
                <input
                    name="breakdownReference"
                    value={formData.breakdownReference}
                    onChange={handleChange}
                    placeholder="Breakdown Reference"
                    required
                />
                {errors.breakdownReference && <span className="error">{errors.breakdownReference}</span>}
                {errors.server && <span className="error">{errors.server}</span>}

                <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                />
                {errors.companyName && <span className="error">{errors.companyName}</span>}

                <input
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    placeholder="Driver Name"
                    required
                />
                {errors.driverName && <span className="error">{errors.driverName}</span>}

                <input
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Registration Number"
                    required
                />
                {errors.registrationNumber && <span className="error">{errors.registrationNumber}</span>}

                <input
                    name="breakdownDate"
                    value={formData.breakdownDate}
                    onChange={handleChange}
                    placeholder="Breakdown Date"
                    type="datetime-local"
                    required
                />
                {errors.breakdownDate && <span className="error">{errors.breakdownDate}</span>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BreakdownForm;
