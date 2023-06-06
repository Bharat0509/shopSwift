import React from 'react';
import './Loader.css';
const Loader = () => {
    return (
        <div className="loading">
            <div>
                <img src="./loader.gif" alt="Loading..." />
            </div>
            <h4>Loading...Please Wait</h4>
        </div>
    );
};

export default Loader;
