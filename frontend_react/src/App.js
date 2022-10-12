import React from 'react';

import './App.scss';
import {About, Footer, Testimonials, Work, Skills, Header} from "./containers";
import {Navbar} from "./components"

const App = () => (
    <div className="app">
        <Navbar/>
        <Header/>
        <About/>
        <Work/>
        <Skills/>
        <Testimonials/>
        <Footer/>
    </div>
);

export default App;