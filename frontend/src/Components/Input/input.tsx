import React, { useState } from 'react';
import './input.css';

function Input() {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setVideoId('');
        try {
            const response = await fetch('http://localhost:5173/video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail);
            }
            const data = await response.json();
            if (!data || !data.video_id) {
                throw new Error('Invalid response from server');
            }
            setVideoId(data.video_id);
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
                    <h2 className='res-heading'>The video id is: {videoId}</h2>
                </div>
            )}
            {error && (
                <div className='error-container'>
                    <h2 className='error-heading'>Error: {error}</h2>
                </div>
            )}
        </div>
    );
}

export default Input;