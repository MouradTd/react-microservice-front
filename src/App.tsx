import React from 'react';
import { Footer, Header, Sidebar } from '@/core';
import { Route } from './routes/routes';

const App: React.FC = () => {
    // return <Route />;
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow ml-64 p-4">
                    <Route />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default App;
