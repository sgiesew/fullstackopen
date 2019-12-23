import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const rows = (persons) =>
    persons.map(person => <Person
        key={person.name}
        name={person.name}
        number={person.number}
        removePerson={() => removePerson(person.id)}
        />)

  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  
  const addPerson = (event) => {
    event.preventDefault()
    if (!persons.find(n => n.name === newName)){
      const personObject = {
        name: newName,
        number: newNumber
      }
    
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = id => {
    const personToRemove = persons.find(n => n.id === id).name
    if (window.confirm(`Delete ${personToRemove}?`)){

      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== id))
          setNotificationMessage(
            `Deleted ${personToRemove}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
  
        })
        .catch(error => {
          alert(
            `the person #'${id}' could not be deleted from server`
          )
        })
      }

  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
       />
      <h3>Numbers</h3>
      <ul>
        {rows(persons)}
      </ul>
    </div>
  )
}

export default App