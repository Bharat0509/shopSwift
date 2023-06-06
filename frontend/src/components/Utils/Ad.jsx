import React from 'react'
import './Ad.css'
const Ad = () => {
    return (
        <div className='ad-container'>
            <div className="left">
                <h1>Get 5% Cash Back *</h1>
                <h3>On BetterMart.com</h3>
                <p>* T&C applied</p>
                <button>Learn More</button>

            </div>
            <div className="right">
                <img src="./debit1.png" alt="" />
                <img className='d1' src="./debit2.png" alt="" />
                <img className='d2' src="./debit3.svg" alt="" />

            </div>
        </div>
    )
}

export default Ad