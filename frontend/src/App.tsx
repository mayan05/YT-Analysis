import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/footer';
import Input from './Components/input';
import Output from './Components/output';

function App() {
    const [videoDetails, setVideoDetails] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="flex-grow">
                <Input />
                <Output videoDetails={videoDetails} />
            </main>
            <Footer />
        </div>
    );
}

export default App;