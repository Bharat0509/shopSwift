import React from 'react'
import './Input.css'
import { BiSearch } from 'react-icons/bi'
const Input = ({ setKeyword, onSubmit, value }) => {
    const categories = ['All category', 'Mobile', 'Laptop', 'Clothes', 'Accessories']

    return (
        <div className='search-input'>
            <input type="text" placeholder='Search...' onChange={(e) => setKeyword(e.target.value)} value={value} />
            <div>
                <select name="category" id="category">
                    {
                        categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className='search-btn' onClick={onSubmit}><BiSearch /></div>
        </div>
    )
}

export default Input