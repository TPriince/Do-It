import { useState, useEffect } from "react"
import Task from "../task/Task"
import './container.css'

export default function Container() {
  const [lists, setLists] = useState([])
  const backendUrl = 'http://localhost:3000';
  function handleAddList() {
    setLists([...lists, { _id: crypto.randomUUID(), cards: [{ id: crypto.randomUUID(), text: 'Add new task' }] }])
  }

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/list/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error('Error getting lists')
        }
      })
      .then(data => {
        console.log(data)
        setLists(data.list)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="main-container">
        <div className="add-list" onClick={handleAddList}>
            New Section
        </div>
        <div className="main-content">
          {lists.map(list => {
            return <Task
                      key={list._id}
                      title={list.title}
                      cardsList={list.cards}
                    />
          })}
        </div>
    </main>
  )
}
