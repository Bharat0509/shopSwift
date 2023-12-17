import React from 'react'
import './Input.css'
import { FiSearch } from "react-icons/fi";
const Input = ({ setKeyword, onSubmit, value }) => {

    const handleSearchChange = (e) => {
        setKeyword(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("Enter were pressed");
            onSubmit(e)
        }
    }
    return (
        <div className='search-input'>
            <FiSearch />
            <input type="text" placeholder='Search a product' onChange={handleSearchChange} onKeyDown={handleKeyDown} />
        </div>
    )
}

export default Input