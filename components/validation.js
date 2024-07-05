import axios from 'axios';

export const validateFormData = async (formData, breakdown) => {
    const errors = {};

    // Check if all fields are filled out
    if (!formData.breakdownReference) errors.breakdownReference = 'Breakdown reference is required';
    if (!formData.companyName) errors.companyName = 'Company name is required';
    if (!formData.driverName) errors.driverName = 'Driver name is required';
    if (!formData.registrationNumber) errors.registrationNumber = 'Registration number is required';
    if (!formData.breakdownDate) errors.breakdownDate = 'Breakdown date is required';

    // Check if breakdown reference already exists (only for create operation)
    if (!breakdown && formData.breakdownReference) {
        try {
            const response = await axios.get(`/api/breakdowns/checkReference/${formData.breakdownReference}`);
            if (response.data) errors.breakdownReference = 'Breakdown reference already exists';
        } catch (error) {
            console.error('Error checking breakdown reference:', error);
            errors.breakdownReference = 'Error checking breakdown reference';
        }
    }

    return errors;
};
