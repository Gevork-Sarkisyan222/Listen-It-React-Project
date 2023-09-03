import React, { useContext } from 'react';
import '../../App.scss';
import MusicCard from '../MusicCard';
import { MyContext } from '../../App';
import { musicCards } from '../../App';
import CherryLady from '../../musics/modern-talking_-_cheri-cheri-lady.mp3';
import Gangster from '../../musics/Gangster-Paradise.mp3';
import Beliver from '../../musics/Believer---Imagine-Dragons-(PagalWorld).mp3';
import SuperMan from '../../musics/Eminem_-_Superman.mp3';
import HotelCalfiornia from '../../musics/Eagles-Hotel-California.mp3';
import DolinaMrCredo from '../../musics/Mr Credo – Чудная долина.mp3';

const LegendaryArray = [
  {
    id: 13,
    soundFile: CherryLady,
    title: 'Chery Chery Lady',
    author: 'Moder Talking',
    image: 'https://i1.sndcdn.com/artworks-B8a7tWibnDDynqzD-zEIKFA-t500x500.jpg',
  },
  {
    id: 14,
    soundFile: Gangster,
    title: 'Gangster Paradise',
    author: 'Coolio',
    image: 'https://i.scdn.co/image/ab67616d0000b27308d52d994fc390ce25508542',
  },
  {
    id: 15,
    soundFile: Beliver,
    title: 'Beliver',
    author: 'Imagine Dragons',
    image: 'https://i1.sndcdn.com/artworks-s3zOCWcV8XQVtQcv-0emq8A-t500x500.jpg',
  },
  {
    id: 16,
    soundFile: SuperMan,
    title: 'Superman',
    author: 'Eminem',
    image: 'https://i1.sndcdn.com/artworks-G3dDQehIeSNjR0xV-KvV7Vw-t500x500.jpg',
  },
  {
    id: 17,
    soundFile: HotelCalfiornia,
    title: 'Hotel California',
    author: 'Eagles',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg',
  },
  {
    id: 18,
    soundFile: DolinaMrCredo,
    title: 'Чудная Долина',
    author: 'Mr. Credo',
    image: 'https://img.mezzoforte.ru/images/albums/main/280ac445586f79d64d9e2a46daeee59a.jpg',
  },
];

interface LegendaryProps {
  addToPlayList: (obj: musicCards) => void;
  onDeletePlayList: (id: number) => void;
}

const Legendary: React.FC<LegendaryProps> = ({ addToPlayList, onDeletePlayList }) => {
  const context = useContext(MyContext);
  // const musicCards = context?.data.musicCards || [];
  const getContextValue = context?.data.value || '';
  const filteredMusicCards: musicCards[] = context?.data.filteredMusicCards || [];
  const setFilteredMusicCards: React.Dispatch<React.SetStateAction<musicCards[]>> =
    context?.data.setFilteredMusicCards || (() => {});

  React.useEffect(() => {
    setFilteredMusicCards(
      LegendaryArray.filter((obj) =>
        obj.title.toLowerCase().includes(getContextValue.toLowerCase()),
      ),
    );
  }, [getContextValue, LegendaryArray]);

  return (
    <div className="Legendary-Main">
      <div className="wrapper-for-all">
        <h2>Легендарные песни всех времён 💎💎💎</h2>
        <div className="card-render">
          {filteredMusicCards.length === 0 ? (
            <div className="not-found-input">
              <h2 className="text-not-found-all">По вашему запросу нечего не найдено</h2>
              <img
                className="image-not-fond-all"
                src="https://i.ytimg.com/vi/HrVnTm-U-PI/maxresdefault.jpg"
                alt="not-found"
              />
            </div>
          ) : (
            LegendaryArray.filter((obj) => {
              return obj.title.toLowerCase().includes(getContextValue.toLowerCase());
            }).map((obj) => (
              <MusicCard
                onPlus={() => addToPlayList(obj)}
                soundFile={obj.soundFile}
                key={obj.id}
                title={obj.title}
                author={obj.author}
                image={obj.image}
                onPlusLegendary={() => addToPlayList(obj)}
                onPlusPopular={() => addToPlayList(obj)}
                onDeletePlayList={() => onDeletePlayList(obj.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Legendary;
