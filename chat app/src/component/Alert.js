import React from 'react'

export default function Alert(props) {
  return (
    <div>
        <div className={`alert alert-${props.alertmsg}`} role="alert">
            This is a primary alert—check it out!
        </div>
      
    </div>
  )
}
