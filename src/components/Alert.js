import React from 'react'
import '../App.css';
function Alert(props) {

  return (
    <div className="alert-container">
      {
        props.alert &&
        <div className={`alert  alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <span>{props.alert.msg}</span>
        </div>
      }
    </div>

  )
}

export default Alert
