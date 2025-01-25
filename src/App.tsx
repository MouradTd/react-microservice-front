import {Footer,Header} from '@/core';
import { Route } from './routes/routes';

const App: React.FC = () => {
    // return <Route />;
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Route />
            </main>
            <Footer />
        </div>
    );
};

export default App;
