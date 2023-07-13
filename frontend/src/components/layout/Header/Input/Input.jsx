import React from 'react'
import './Input.css'
import { BiSearch } from 'react-icons/bi'
const Input = ({ setKeyword, setCategory, onSubmit, value }) => {
    const categories = ['All category', 'Mobile', 'Laptop', 'Clothes', 'Accessories']

    return (
        <div className='search-input'>
            <input type="text" id='keyword' placeholder='Search...' onChange={(e) => setKeyword(e.target.value)} value={value} />
            <div>
                <select name="category" id="category" onChange={e => setCategory(e.target.value === 'All category' ? "" : e.target.value)}>
                    {
                        categories.map(cat => (
                            <option key={cat} value={cat} >
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