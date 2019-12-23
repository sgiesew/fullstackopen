import React from 'react'
import Part from './Part'


const rows = (course) =>
    course.parts.map(part => <div key={part.id}><Part part={part} /></div>)

const Content = ({ course }) => {
    return (
        <div>
            {rows(course)}
        </div>
    )
  }

export default Content