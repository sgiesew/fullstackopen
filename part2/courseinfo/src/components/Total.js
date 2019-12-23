import React from 'react'

const Total = ({ course }) => {
    const total = course.parts.reduce( (a, i) => a + i.exercises, 0 )
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
  }

export default Total