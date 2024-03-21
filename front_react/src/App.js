import React from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <Calendar />
            </main>
        </div>
    );
}

export default App;