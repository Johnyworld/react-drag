import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
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
              <Route path='/' element={<CardListContainer />} />
              {routes.map(data => (
                <Route key={data.id} path={data.path} element={<data.component />} />
              ))}
            </Routes>
          </main>
        </HashRouter>
      </CardsProvider>
    </div>
  );
}

export default App;
