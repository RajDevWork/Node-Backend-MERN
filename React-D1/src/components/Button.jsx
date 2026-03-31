import React from 'react'

const Button = ({isFollowing,handleFollow}) => {
  return (
    <button 
        className={`card-button ${isFollowing ? 'following' : ''}`}
        onClick={handleFollow}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
  )
}

export default Button