import { useState, useEffect } from 'react'
import Card from "./Card"
import './task.css'

export default function Task({ title='Add Title', cardsList, listId, setLists }) {
    const [cards, setCards] = useState(cardsList)
    const [refresh, setRefresh] = useState(false)
    const [listTitle, setListTitle] = useState(title)
    const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'orange']
    const backendUrl = 'http://localhost:3000';
    function handleAddCard() {
        setCards([...cards, { _id: `frontend${crypto.randomUUID()}`, text: `New task`, color: colors[Math.floor(Math.random() * 4)] }])
    }

    useEffect(() => {
        if (refresh === true) {
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
        }
    }, [refresh])

    
    function handleSaveTask(e, id) {
        if (e.key === 'Enter') {
            const idPrefix = id.slice(0, 8)
            if (idPrefix === 'frontend') {
                fetch(`${backendUrl}/api/v1/list/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    },
                    body: JSON.stringify({
                        title: listTitle,
                    })
                })
                .then(res => {
                    if (res.status === 200) {
                        setRefresh(true)
                        alert('Saved')
                        return res.json()
                    } else {
                        throw new Error('Error saving list')
                    }
                })
                .then(data => console.log(data))
                .catch(err => console.log(err))
            } else {
                fetch(`${backendUrl}/api/v1/list/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                    },
                    body: JSON.stringify({
                        title: listTitle,
                    })
                })
                .then(res => {
                    if (res.status === 200) {
                        alert('Title updated')
                        return res.json()
                    } else {
                        throw new Error('Error editing list')
                    }
                })
                .then(data => console.log(data))
                .catch(err => console.log(err))
            }
        }
    }
    
    function handleDelete(id) {
        if (id.slice(0, 8) === 'frontend') {
            setLists(prev => prev.filter(list => list._id !== id))
            return
        }
        fetch(`${backendUrl}/api/v1/list/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                alert('List deleted')
                setLists(prev => prev.filter(list => list._id !== id))
                return res.json()
            } else {
                throw new Error('Error deleting list')
            }
        })
        .then(data => console.log(data))
    }


  return (
    <div className="task-container">
        <div className='task-title'>
            <input
                className='task-title input'
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onKeyUp={(e) => handleSaveTask(e, listId)}
            />
            <i className='bx bxs-trash' onClick={() => handleDelete(listId)}></i>
        </div>
        <div className="add" onClick={handleAddCard}>
            <i className='bx bx-plus'></i>
        </div>
        <div className="task-content">
            {cards.map((card) => {
                return <Card
                        key={card._id}
                        content={card.text}
                        setCards={setCards}
                        cardId={card._id}
                        listId={listId}
                        color={card.color}
                        setLists={setLists}
                        />
            })}
        </div>
    </div>
  )
}
