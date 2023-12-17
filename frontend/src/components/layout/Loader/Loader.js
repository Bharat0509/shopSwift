import React from 'react';
import './Loader.css';
const Loader = () => {
    return (
        <div className="loading">
            <div>
                <img src="./loader.gif" alt="Loading..." />
            </div>
            <h4>Loading...</h4>
            <h6>Please Wait</h6>
        </div>
    );
};

export default Loader;
