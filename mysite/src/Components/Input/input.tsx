import React, { useState } from 'react';
import './input.css';

function Input() {
    const [url, setUrl] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // Implement the backend logic here
    }

    return (
        <div className = 'container'>
            <h2 className='heading'>Enter the Youtube URL Here</h2>
            <form className='form' 
                onSubmit={ handleSubmit } >
                <input 
                type='url'
                placeholder='Paste the URL here'
                value={ url }
                className='input-box'
                onChange={ (e) => { setUrl(e.target.value) } }
                />
                <button type='submit' 
                className='submit-button'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Input;