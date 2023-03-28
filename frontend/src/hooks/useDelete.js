export default function useDelete() {
    function handleDelete(url, id, setData) {
        if (id.slice(0, 8) === 'frontend') {
            setData(prev => prev.filter(list => list._id !== id))
            if (url.slice(-5) === 'list/') {
                alert('List deleted')
            } else {
                alert('Card deleted')
            }
            return
        }
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            },
        })
        .then(res => {
            if (res.status === 200) {
                if (url.slice(-5) === 'list/') {
                    alert('List deleted')
                } else {
                    alert('Card deleted')
                }
                setData(prev => prev.filter(list => list._id !== id))
                return res.json()
            } else {
                throw new Error('Error deleting')
            }
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return { handleDelete }
}