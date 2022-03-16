import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CardListContainer from './features/cardList/containers/CardListContainer';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<CardListContainer />} />
            <Route path='/grid' element={<p>grid</p>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
