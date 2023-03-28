import { useState, useEffect } from 'react'
import useDelete from '../../hooks/useDelete';
import './card.css'

export default function Card({ content, setCards, cardId, listId, title }) {
    const [text, setText] = useState(content);
    const [refresh, setRefresh] = useState(false);
    const [showTrash, setShowTrash] = useState(false);
    const { handleDelete } = useDelete();
    const backendUrl = 'http://localhost:3000';
    const cardEndPoint = `${backendUrl}/api/v1/card/`
    function handleShowTrash() {
        setShowTrash(!showTrash)
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
                    setRefresh(false)
                    return res.json()
                  } else {
                    throw new Error('Error getting lists')
                  }
                })
                .then(data => {
                  console.log(data)
                  setCards(data.list.filter((item) => item._id === listId)[0].cards)
                })
                .catch(err => console.log(err))
        }
    }, [refresh])

    function handleContentChange(event) {
        setText(event.target.value);
        setCards((prev) => {
            return prev.map((item) => {
                if (item.id === cardId) {
                    console.log(item)
                    return { ...item, text: event.target.value }
                }
                return item
            })
        })
    }

    function handleSaveCard(cardId, listId) {
        if (title === '' || title === undefined) {
            alert('Please enter a title for the list');
            return
        }
        if (cardId.slice(0, 8) === 'frontend') {
            fetch(`${backendUrl}/api/v1/card/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    listId,
                    text,
                })
            })
            .then(res => {
                if (res.status === 200) {
                    setRefresh(true)
                    alert('Card saved');
                    return res.json()
                } else {
                    alert('Check if you have entered a title for the list')
                    throw new Error('Error saving card')
                }
            })
            .then(data => {
             console.log(data)
            })
            .catch(err => console.log(err))
        } else {
            fetch(`${backendUrl}/api/v1/card/${cardId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    text
                })
            })
            .then(res => {
                if (res.status === 200) {
                    alert('Card updated');
                    return res.json()
                } else {
                    throw new Error('Error updating card')
                }
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
    }
    
  return (
    <div className='card' onMouseEnter={handleShowTrash} onMouseLeave={handleShowTrash} >
        <i className={ showTrash ? 'bx bxs-trash show-trash' : 'bx bxs-trash' } onClick={() => handleDelete(cardEndPoint, cardId, setCards)}></i>
        <textarea className='box-textarea' value={text} onChange={handleContentChange} >
        </textarea>
        <button className='save-btn' onClick={() => handleSaveCard(cardId, listId)}>Save</button>
    </div>
  )
}
