import { Rating } from '@mui/material'
import React from 'react'


const ReviewCard = ({ review }) => {
  const profilePng = 'https://tse1.mm.bing.net/th?id=OIP.ruat7whad9-kcI8_1KH_tQHaGI&pid=Api&rs=1&c=1&qlt=95&w=124&h=102'

  const options = {
   
  
    value: Number(review?.rating),
    precision:0.5,
    readOnly:true

  }
  return (
    <div className='reviewCard'>
      <img src={profilePng} alt='User' />
      <p>
        {review.name ? review.name : '******'}
      </p>
      <Rating {...options} />
      <span className='reviewCardComment'>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
