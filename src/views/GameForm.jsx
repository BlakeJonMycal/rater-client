import React, { useState, useEffect } from 'react';

function GameForm() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        designer: '',
        year_released: '',
        number_of_players: '',
        estimated_play_time: '',
        age_recommendation: '',
        category: ''
    });

    useEffect(() => {
        // Fetch categories for the form
        const getCategoriesFromAPI = async () => {
            const response = await fetch('http://localhost:8000/categories', {
                headers: {
                    "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`
                }
            });
            const data = await response.json();
            setCategories(data);
        }

        getCategoriesFromAPI();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/games', {
            method: 'POST',
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rater_token")).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Game created successfully!');
            window.location.href = '/games'
        } else {
            alert('Failed to create game.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Designer</label>
                <input type="text" name="designer" value={formData.designer} onChange={handleChange} required />
            </div>
            <div>
                <label>Year Released</label>
                <input type="number" name="year_released" value={formData.year_released} onChange={handleChange} required />
            </div>
            <div>
                <label>Number of Players</label>
                <input type="number" name="number_of_players" value={formData.number_of_players} onChange={handleChange} required />
            </div>
            <div>
                <label>Estimated Play Time</label>
                <input type="text" name="estimated_play_time" value={formData.estimated_play_time} onChange={handleChange} required />
            </div>
            <div>
                <label>Age Recommendation</label>
                <input type="text" name="age_recommendation" value={formData.age_recommendation} onChange={handleChange} required />
            </div>
            <div>
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Create Game</button>
        </form>
    );
}

export default GameForm;

