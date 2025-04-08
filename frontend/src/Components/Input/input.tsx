import React, { useState } from 'react';
import './input.css';

interface InputProps {
    onVideoFetch: (videoDetails: any) => void;
}

function Input({ onVideoFetch }: InputProps) {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

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
            onVideoFetch(data);
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
            {error && (
                <div className='error-container'>
                    <h3 className='error-heading'>Error: {error}</h3>
                </div>
            )}
        </div>
    );
}

export default Input;