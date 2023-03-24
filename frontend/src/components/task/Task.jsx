import { useState, useEffect } from 'react'
import Card from "./Card"
import './task.css'

export default function Task({ title='Add Title', cardsList, listId }) {
    const [cards, setCards] = useState(cardsList)
    const [listTitle, setListTitle] = useState(title)
    const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'pink', 'orange']
    const backendUrl = 'http://localhost:3000';
    function handleAddCard() {
        setCards([...cards, { id: crypto.randomUUID(), text: `New task`, color: colors[Math.floor(Math.random() * 4)] }])
    }

    useEffect(() => {
        console.log(cards)
    }, [])

    function handleDelete(id) {}

    function handleSaveTask() {
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
                return res.json()
            } else {
                throw new Error('Error saving list')
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

  return (
    <div className="task-container">
        <div className='task-title'>
            <input className='task-title input' value={listTitle} onChange={(e) => setListTitle(e.target.value)}/>
            <i className='bx bxs-trash' onClick={() => handleDelete(id)}></i>
        </div>
        <button className='save-task__btn' onClick={handleSaveTask}>Save Task</button>
        <div className="add" onClick={handleAddCard}>
            <i className='bx bx-plus'></i>
        </div>
        <div className="task-content">
            {cards.map((card) => {
                const id = crypto.randomUUID();
                
                return <Card
                        key={card.id || id}
                        content={card.text}
                        setCards={setCards}
                        cardId={card.id || id}
                        listId={listId}
                        color={card.color}
                        />
            })}
        </div>
    </div>
  )
}
