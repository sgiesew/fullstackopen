import React from 'react'

const Person = (props) => {
  return (
    <li key='{props.key}'>
      {props.name} {props.number} <button onClick={props.removePerson}>delete</button>
    </li>
  )
}

export default Person