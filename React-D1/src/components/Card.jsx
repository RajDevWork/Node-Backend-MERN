import React, { useState } from 'react'
import Button from './Button'

const Card = ({ image, title, description }) => {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <div className='card'>
      {/* Profile Image */}
      <div className='imageContainer'>
        <img 
          src={image} 
          alt={title}
          className='card-image'
        />
      </div>

      {/* Title */}
      <h1 className='card-title'>{title}</h1>

      {/* Description */}
      <p className='card-description'>{description}</p>

      {/* Follow Button */}
      <Button isFollowing={isFollowing} handleFollow={handleFollow}/>
      
    </div>
  )
}

export default Card