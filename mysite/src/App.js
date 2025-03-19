import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [url, setUrl] = useState('');
  const [videoid, setVideoid] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoid = getYouTubeId(url);
    setVideoid(videoid);
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="app">
      <h1 className="title">YouTube Player</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            Play
          </button>
        </div>
      </form>
      {videoid && (
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoid}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default App;