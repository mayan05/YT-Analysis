import React, { useState } from 'react';
import './input.css';

function Input() {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [error, setError] = useState('');

    const [title, setTitle] = useState('');
    const [upload, setUpload] = useState('');
    const [views, setViews] = useState(0);
    const [likes, setLikes] = useState(0);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:8000/video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to fetch video details');
            }
            const data = await response.json();
            setVideoId(data.video_id);
            setTitle(data.title);
            setUpload(data.published_at);
            setViews(data.views);
            setLikes(data.likes);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    }

    return (
        <div className='container'>
            <h2 className='heading'>Enter the Youtube URL Here</h2>
            <form className='form' onSubmit={handleSubmit}>
                <input
                    type='url'
                    placeholder='Paste the URL here'
                    value={url}
                    className='input-box'
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button type='submit' className='submit-button'>
                    Submit
                </button>
            </form>
            {videoId && (
                <div className='res-container'>
                    <div className='output-box'>
                        <p className='output-text'>Title: {title}</p>
                        <p className='output-text'>Upload Date: {upload}</p>
                        <p className='output-text'>Views: {views}</p>
                        <p className='output-text'>Likes: {likes}</p>
                    </div>
                </div>
            )}
            {error && (
                <div className='error-container'>
                    <h3 className='error-heading'>Error: {error}</h3>
                </div>
            )}
        </div>
    );
}

export default Input;