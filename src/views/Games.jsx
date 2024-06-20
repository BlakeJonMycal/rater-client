import { useEffect, useState } from 'react'

function Games() {
    const [games, setGames] = useState([])


    const getGamesStateFromTheAPI = async () => {
        const response = await fetch("http://localhost:8000/games", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setGames(parsedJSONString)
    }

    useEffect(() => { getGamesStateFromTheAPI() }, [])
    
    const displayGames = () => {
        if (games && games.length) {
            return games.map(game => <div key={`key-${game.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
              <div>{game.title}</div>
            </div>)
            }
        } 
    

    return (
        <>
            <h1 className="text-3xl">Game List</h1>
            {displayGames()}
        </>
    )




} 
export default Games