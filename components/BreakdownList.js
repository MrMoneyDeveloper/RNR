import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BreakdownForm from './BreakdownForm';
import ReactPaginate from 'react-paginate';
import '../wwwroot/css/BreakdownList.css';

const BreakdownList = () => {
    const [breakdowns, setBreakdowns] = useState([]);
    const [selectedBreakdown, setSelectedBreakdown] = useState(null);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        fetchBreakdowns(currentPage);
    }, [currentPage]);

    const fetchBreakdowns = async (page) => {
        try {
            const response = await axios.get(`/api/breakdowns?page=${page}&pageSize=${pageSize}`);
            setBreakdowns(response.data.$values || response.data);
            const totalCount = parseInt(response.headers['x-total-count'], 10);
            setPageCount(Math.ceil(totalCount / pageSize));
        } catch (error) {
            setError('Error fetching breakdowns');
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

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
            <button onClick={handleCreate} style={{ backgroundColor: '#d71516', color: '#ffffff' }}>Create New Breakdown</button>
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
                                    <button onClick={() => handleEdit(breakdown)} style={{ backgroundColor: '#d71516', color: '#ffffff' }}>Edit</button>
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
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default BreakdownList;
