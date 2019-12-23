import React from 'react'
import Person from './Person'

const rows = (persons) =>
    persons.map(person => <Person
        key={person.name}
        name={person.name}
        number={person.number}
     />)

const Persons = ({persons}) => (
    <ul>
        {rows(persons)}
    </ul>
)

export default Persons