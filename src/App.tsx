import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CardGridContainer from './features/cardGrid/cardGrid.container';
import CardListContainer from './features/cardList/cardList.container';
import CardsProvider from './features/cards/cards.provider';
import routes from './routes';

function App() {
  return (
    <div className='App'>
      <CardsProvider>
        <HashRouter>
          <Header />
          <main>
            <Routes>
              <Route path={routes.root} element={<CardListContainer />} />
              <Route path={routes.grid} element={<CardGridContainer />} />
            </Routes>
          </main>
        </HashRouter>
      </CardsProvider>
    </div>
  );
}

export default App;
