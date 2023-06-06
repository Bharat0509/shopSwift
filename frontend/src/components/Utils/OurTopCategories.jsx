import React from 'react'
import './OurTopCategories.css'
import CategoryCard from './CategoryCard'

const Categories = [
    {
        title: "Furnitures",
        img: './Furniture.png'
    },
    {
        title: "Hand Bag",
        img: './HandBag.png'
    },
    {
        title: "Books",
        img: './Books.png'
    },
    {
        title: "Tech",
        img: './Tech.png'
    },
    {
        title: "Sneakers",
        img: './Snekers.png'
    },
    {
        title: "Travel",
        img: './Travel.png'
    }
]
const OurTopCategories = () => {
    return (
        <div className="container flex-c">
            <div className="heading">Shop Our Top Categories</div>
            <div className="items">
                {

                    Categories.map(cat => <CategoryCard {...cat} />)
                }
            </div>
        </div>
    )
}

export default OurTopCategories