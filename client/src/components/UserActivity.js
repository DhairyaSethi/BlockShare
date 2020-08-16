import React from 'react'

export default function UserActivity (props) {
  

  const { userActivity } = props;

  return (
    <div>
      {userActivity.forEach(item => (
        <div>
          {item}
        </div>
      ))}
    </div>
  )
}