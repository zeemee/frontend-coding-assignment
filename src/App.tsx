import {useState} from 'react';
import {useRoute} from './hooks/useRoute';
import Header from './components/Header';
import SearchView from './components/SearchView';
import DetailView from './components/DetailView';
import bgImage from './assets/bg.jpg';



function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const {path, navigate} = useRoute();

    const drinkId = path.startsWith('/drink/')
        ? Number(path.split('/')[2])
        : null;

    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
            style={{backgroundImage: `url(${bgImage})`}}
        >
            <div className="min-h-screen flex flex-col bg-black/70">
                <div className="max-w-1/2 mx-auto">
                    <Header onSearch={setSearchQuery} navigate={navigate}/>
                    {drinkId === null ? (
                        <SearchView query={searchQuery} navigate={navigate}/>
                    ) : (
                        <DetailView key={drinkId} drinkId={drinkId} navigate={navigate}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
