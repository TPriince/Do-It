import { useEffect } from 'react';
import { useState } from 'react'
import './card.css'

export default function Card({ content, setCards, cardId, listId }) {
    const [text, setText] = useState(content);
    const [showTrash, setShowTrash] = useState(false);
    function handleShowTrash() {
        setShowTrash(!showTrash)
        console.log(cardId)
    }

    function handleContentChange(event) {
        setText(event.target.value);
        setCards((prev) => {
            return prev.map((item) => {
                if (item.id === cardId) {
                    console.log(item)
                    return { ...item, text: event.target.value }
                }
                console.log(item.id, cardId)

                return item
            })
        })
    }
    function handleDelete(id) {
        setCards((prev) =>{
            return prev.filter((item) => item.id !== id)})
    }

    function handleSave() {
        fetch(`http://localhost:3000/api/v1/card/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
            body: JSON.stringify({
                text,
                listId
            })
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
        })
        .catch(err => console.log(err))
    }
    
  return (
    <div className='card' onMouseEnter={handleShowTrash} onMouseLeave={handleShowTrash} >
        <i className={ showTrash ? 'bx bxs-trash show-trash' : 'bx bxs-trash' } onClick={() => handleDelete(id)}></i>
        <textarea className='box-textarea' value={text} onChange={handleContentChange} >
        </textarea>
        <button className='save-btn' onClick={handleSave}>Save</button>
    </div>
  )
}
