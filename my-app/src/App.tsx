import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import './Media1920.scss';
import './MediaPhone.scss';
import AppBar from './components/AppBar';
import MusicCard from './components/MusicCard';
import Skeletons from './components/Skeletons';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/page/Home';
import NotFound from './components/page/NotFound';
import Popular from './components/leftSideBar/Popular';
import Legendary from './components/leftSideBar/Legendary';
import Old from './components/leftSideBar/Old';
import { createContext } from 'react';
import PlayList from './components/page/PlayList';
import Welcome from './Welcome';

type MyContextValue = {
  data: {
    value: string;
    filteredMusicCards: musicCards[];
    setFilteredMusicCards: React.Dispatch<React.SetStateAction<musicCards[]>>;
    musicCards: musicCards[];
    count?: number;
    setCount?: React.Dispatch<React.SetStateAction<number>>;
  };
};

export const MyContext = createContext<MyContextValue | undefined>(undefined);

export type musicCards = {
  id: number;
  title: string;
  author: string;
  image: string;
  soundFile: string;
};

const App: React.FC = () => {
  const [value, setValue] = useState(() => {
    const findLS = localStorage.getItem('find');
    const initialValue = findLS ? JSON.parse(findLS) : '';
    return initialValue;
  });

  const [filteredMusicCards, setFilteredMusicCards] = useState<musicCards[]>([]);
  const musicCardsArray: musicCards[] = [];
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem('count');
    return storedCount ? parseInt(storedCount, 10) : 0;
  });
  const [musicItems, setMusicItems] = useState<musicCards[]>(
    JSON.parse(localStorage.getItem('playlist') || '[]'),
  );
  const isMounted = useRef(false);

  useEffect(() => {
    const findJson = JSON.stringify(value);
    localStorage.setItem('find', findJson);
  }, [value]);

  useEffect(() => {
    const jsonCount = JSON.stringify(count);
    localStorage.setItem('count', jsonCount);
  }, [count]);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(musicItems);
      localStorage.setItem('playlist', json);
    }

    isMounted.current = true;
  }, [musicItems]);

  const addToPlayList = (obj: musicCards) => {
    setMusicItems((prev) => [...prev, obj]);
  };

  const onDeletePlayList = (id: number) => {
    setMusicItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MyContext.Provider
      value={{
        data: {
          value,
          filteredMusicCards,
          setFilteredMusicCards,
          musicCards: musicCardsArray,
          count,
          setCount,
        },
      }}>
      <div className="App">
        <AppBar value={value} setValue={setValue} />

        <Routes>
          <Route path="/Listen-It-React-Project" element={<Welcome />} />
          <Route
            path="/"
            element={
              <Home
                onDeletePlayList={onDeletePlayList}
                addToPlayList={addToPlayList}
                value={value}
                setValue={setValue}
              />
            }
          />
          <Route
            path="/Popular-Category"
            element={<Popular onDeletePlayList={onDeletePlayList} addToPlayList={addToPlayList} />}
          />
          <Route
            path="/Legendary-Category"
            element={
              <Legendary onDeletePlayList={onDeletePlayList} addToPlayList={addToPlayList} />
            }
          />
          <Route
            path="/Old-Category"
            element={<Old onDeletePlayList={onDeletePlayList} addToPlayList={addToPlayList} />}
          />
          <Route
            path="/PlayList"
            element={<PlayList onDeletePlayList={onDeletePlayList} musicItems={musicItems} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </MyContext.Provider>
  );
};

export default App;
