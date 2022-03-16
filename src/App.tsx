import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CardListContainer from './features/cardList/cardList.container';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<CardListContainer />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
