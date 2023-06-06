import axios from 'axios'
import React, { useEffect } from 'react'

const Test = () => {
    const testUrl = async () => {
        return await axios.get('/api/v1/getCookie', { withCredentials: true })
    }
    useEffect(() => {
        testUrl();
    }, [])
    return (
        <div>Test</div>
    )
}

export default Test