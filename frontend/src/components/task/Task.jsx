import { useState } from 'react'
import Card from "./Card"
import useDelete from '../../hooks/useDelete'
import './task.css'

export default function Task({ title='', cardsList, listId, setLists }) {
    const [cards, setCards] = useState(cardsList);
    const [ listTitle, setListTitle ] = useState(title);
    const { handleDelete } = useDelete();
    const backendUrl = 'http://localhost:3000';
    const listEndPoint = `${backendUrl}/api/v1/list/`;
    
    function handleAddCard() {
        setCards([...cards, { _id: `frontend${crypto.randomUUID()}`, text: `New task`, }])
    }
    
    function handleUpdateTitle(e, id) {
        if (e.key === 'Enter') {
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

  return (
    <div className="task-container">
        <div className='task-title'>
            <input
                className='task-title input'
                type="text"
                placeholder='Add Title'
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onKeyUp={(e) => handleUpdateTitle(e, listId)}
            />
            <i className='bx bxs-trash' onClick={() => handleDelete(listEndPoint, listId, setLists)}></i>
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
                        setLists={setLists}
                        title={listTitle}
                        />
            })}
        </div>
    </div>
  )
}
