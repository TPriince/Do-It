import useContainer from "../../hooks/useContainer"
import Task from "../task/Task"
import './container.css'

export default function Container() {
  const { lists, setLists, handleAddList, loading } = useContainer();

  if (loading) {
    return <div className="loading-container">
      <div className="custom-loader"></div>
    </div>
  }

  return (
    <main className="main-container">
        <div className="add-list" onClick={handleAddList}>
            Add List
        </div>
        <div className="main-content">
          {lists.map(list => {
            return <Task
                      key={list._id}
                      title={list.title}
                      cardsList={ list.cards.length > 0 ? list.cards : [{ _id: `frontend${crypto.randomUUID()}`, text: 'Add new task' }] }
                      listId={list._id}
                      setLists={setLists}
                    />
          })}
        </div>
    </main>
  )
}
