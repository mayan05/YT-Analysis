import React from 'react';
import './App.css';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import Input from './Components/Input/input';

function App() {
    return (
        <div className = 'app'>
            <Header />
            <Input />
            <Footer />
        </div>
    );
}

export default App;