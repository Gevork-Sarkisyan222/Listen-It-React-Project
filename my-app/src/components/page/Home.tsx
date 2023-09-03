import React, { useState, useEffect, useContext } from 'react';
import MusicCard from '../MusicCard';
import Skeletons from '../Skeletons';
import { MyContext } from '../../App';
import Faded from '../../musics/Faded.mp3';
import Despacito from '../../musics/Despacito.mp3';
import Pchelavod from '../../musics/Pchelavod.mp3';
import Makeba from '../../musics/Makeba.mp3';
import Shape from '../../musics/Shape-of-you.mp3';
import Gangster from '../../musics/Gangster-Paradise.mp3';

interface HomeTypes {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  addToPlayList: (obj: musicCards) => void;
  onDeletePlayList: (id: number) => void;
}

type musicCards = {
  id: number;
  title: string;
  author: string;
  image: string;
  soundFile: string;
};

const Home: React.FC<HomeTypes> = ({ value, setValue, addToPlayList, onDeletePlayList }) => {
  const [musicCardIsLoding, setMusicCardIsLoding] = useState(true);
  // const [filteredMusicCards, setFilteredMusicCards] = useState<musicCards[]>([]);
  const context = React.useContext(MyContext);
  const filteredMusicCards: musicCards[] = (context?.data.filteredMusicCards as musicCards[]) || [];
  const setFilteredMusicCardsFunc: React.Dispatch<React.SetStateAction<musicCards[]>> =
    (context?.data.setFilteredMusicCards as React.Dispatch<React.SetStateAction<musicCards[]>>) ||
    (() => {});

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMusicCardIsLoding(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [value]);

  const musicCardsArray: musicCards[] = [
    {
      id: 1,
      soundFile: Faded,
      title: 'Faded',
      author: 'Alan Walker',
      image:
        'https://i0.wp.com/jesusful.com/wp-content/uploads/2022/07/Alan-Walker-Faded-Mp3-Download-Lyrics.jpg?fit=500%2C500&ssl=1',
    },
    {
      id: 2,
      soundFile: Despacito,
      title: 'Despasito',
      author: 'Luis Fonsi',
      image:
        'https://upload.wikimedia.org/wikipedia/en/c/c8/Luis_Fonsi_Feat._Daddy_Yankee_-_Despacito_%28Official_Single_Cover%29.png',
    },
    {
      id: 3,
      soundFile: Pchelavod,
      title: 'Пчеловод',
      author: 'Rasa',
      image: 'https://i1.sndcdn.com/artworks-KKpQqjbW3RjWczCK-zvgTsA-t500x500.jpg',
    },
    {
      id: 4,
      soundFile: Makeba,
      title: 'Makeba',
      author: 'Jain',
      image: 'https://i.scdn.co/image/ab67616d0000b2739d3ad3a9fa90bf0dee0ae5be',
    },
    {
      id: 5,
      soundFile: Shape,
      title: 'Shape of you',
      author: 'Ed Sheeran',
      image:
        'https://thisismehul.files.wordpress.com/2017/01/ed-sheeran-shape-of-you-video-1485704997.jpg?w=640',
    },
    {
      id: 6,
      soundFile: Gangster,
      title: 'Gangster Paradise',
      author: 'Coolio',
      image: 'https://i.ytimg.com/vi/fPO76Jlnz6c/maxresdefault.jpg',
    },
  ];

  useEffect(() => {
    setFilteredMusicCardsFunc(
      musicCardsArray.filter((obj) => obj.title.toLowerCase().includes(value.toLowerCase())),
    );
  }, [value, musicCardsArray]);

  return (
    <div className="Main-Wrapper">
      <div className="wrapper">
        {/* <h1 className="title-music">Hello World</h1> */}
        <div className="card-main-place">
          {musicCardIsLoding ? (
            Array.from({ length: 6 }).map((_, index) => <Skeletons key={index} />)
          ) : filteredMusicCards.length === 0 ? (
            <div className="not-found-input">
              <h2>По вашему запросу нечего не найдено</h2>
              <img
                className="not-found-image"
                src="https://i.ytimg.com/vi/HrVnTm-U-PI/maxresdefault.jpg"
                alt="not-found"
              />
            </div>
          ) : (
            filteredMusicCards.map((obj) => (
              <MusicCard
                key={obj.id}
                soundFile={obj.soundFile}
                title={obj.title}
                author={obj.author}
                image={obj.image}
                onPlus={() => addToPlayList(obj)}
                onPlusPopular={() => addToPlayList(obj)}
                onPlusLegendary={() => addToPlayList(obj)}
                onDeletePlayList={() => onDeletePlayList(obj.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
