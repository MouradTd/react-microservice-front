import {Footer,Header, Sidebar} from '@/core';
import { Route } from './routes/routes';

const App: React.FC = () => {
    // return <Route />;
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-grow ml-64 p-4">
                <Header />
                <main>
                    <Route />
                </main>
                <div className=''>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;
