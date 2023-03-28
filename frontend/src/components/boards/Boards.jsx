import { useState } from 'react'
import { Link } from 'react-router-dom'
import './boards.css'

export default function Boards() {
  const [boards, setBoards] = useState([{_id: crypto.randomUUID(), favorite: false, title: 'Board 1'}])
  const [favoriteBoards, setFavoriteBoards] = useState([])
  const [allBoards, setAllBoards] = useState(boards)

  function handleAddBoard() {
    let title = prompt('Add board title')
    if (!title) {
      title = 'No Title'
    }
    setBoards([...boards, {_id: crypto.randomUUID(), favorite: false, title}])
  }

  function handleFavorite(id) {
    setBoards(boards.map(board => {
      if (board._id === id) {
        board.favorite = !board.favorite
        if (board.favorite) {
          setFavoriteBoards([...favoriteBoards, board])
        } else {
          setFavoriteBoards(favoriteBoards.filter(board => board.title !== board.title))
        }
      }
      return board
    }))
  }

  function handleAllBoards() {
    setBoards(allBoards)
  }

  function handleFavoriteBoards() {
    setAllBoards(boards)
    setBoards(favoriteBoards)
  }


  return (
    <section className='boards'>
        <h1 className='section-title'>Boards</h1>
        <div className="add-board" onClick={handleAddBoard}>
            Add Board
        </div>
        <div className='view-boards'>
          <p className='all__boards' onClick={handleAllBoards}>All boards</p>
          <p className='favorite-boards' onClick={handleFavoriteBoards}>Favorite boards</p>
        </div>
        <div className='all-boards'>
          {boards.map((board) => {
            return (
              <div className='task-board' key={board._id}>
                <Link to='/dashboard/tasks'>
                  <p className='board-title'>{board.title}</p>
                </Link>
                <i className={ board.favorite ? 'bx bx-star favorite' : 'bx bx-star' } onClick={() => handleFavorite(board._id)}></i>
              </div>
            )
          })}
        </div>
    </section>
  )
}
