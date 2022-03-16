import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CardGridContainer from './features/cardGrid/cardGrid.container';
import CardListContainer from './features/cardList/cardList.container';
import CardsProvider from './features/cards/cards.provider';

function App() {
  return (
    <div className='App'>
      <CardsProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path='/react-drag' element={<CardListContainer />} />
              <Route path='/react-drag/grid' element={<CardGridContainer />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CardsProvider>
    </div>
  );
}

export default App;
