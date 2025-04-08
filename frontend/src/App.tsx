import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/footer';
import Input from './Components/Input/input';
import Output from './Components/Output/output';

function App() {
    const [videoDetails, setVideoDetails] = useState(null);

    return (
        <div className='app'>
            <Header />
            <Input onVideoFetch={setVideoDetails} />
            <Output videoDetails={videoDetails} />
            <Footer />
        </div>
    );
}

export default App; 