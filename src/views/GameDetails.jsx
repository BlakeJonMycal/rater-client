import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);

    const getGameDetailsFromAPI = async () => {
        const response = await fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
            }
        });
        const parsedJSONString = await response.json();
        setGame(parsedJSONString);
    }

    useEffect(() => {
        getGameDetailsFromAPI();
    }, [gameId]);

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl">{game.title}</h1>
            <p><strong>Description:</strong> {game.description}</p>
            <p><strong>Designer:</strong> {game.designer}</p>
            <p><strong>Year Released:</strong> {game.year_released}</p>
            <p><strong>Number of Players:</strong> {game.number_of_players}</p>
            <p><strong>Estimated Play Time:</strong> {game.estimated_play_time}</p>
            <p><strong>Age Recommendation:</strong> {game.age_recommendation}</p>
            <p><strong>Categories</strong></p>
            <ul>
                {game.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default GameDetails;
