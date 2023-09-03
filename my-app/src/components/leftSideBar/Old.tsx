import React, { useContext } from 'react';
import '../../App.scss';
import MusicCard from '../MusicCard';
import { MyContext } from '../../App';
import { musicCards } from '../../App';
import SmokeOnTheWater from '../../musics/Deep_Purple_-_Smoke_On_The_Water_(musmore.com).mp3';
import TakeItEasy from '../../musics/TakeItEasy.mp3';
import RockAndRoll from '../../musics/Michael Bolton – Old Time Rock & Roll.mp3';
import itsMyLife from '../../musics/Gabriel Marian – Its My Life.mp3';
import WhatIsLove from '../../musics/Haddaway – What Is Love.mp3';
import CocoJango from '../../musics/Mr_President_-_Coco_Jamboo_(musmore.com).mp3';

const OldArray = [
  {
    id: 19,
    title: 'Smoke On the Water',
    soundFile: SmokeOnTheWater,
    author: 'Deep Purple',
    image: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Smoke_on_the_Water_cover.jpg',
  },
  {
    id: 20,
    soundFile: TakeItEasy,
    title: 'Take it easy',
    author: 'Eagles',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Sfea7201.jpg',
  },
  {
    id: 21,
    soundFile: RockAndRoll,
    title: 'Old Time Rock',
    author: 'Rock',
    image: 'https://upload.wikimedia.org/wikipedia/en/8/89/Bob-seger_Old_Time_Rock_single.jpg',
  },
  {
    id: 22,
    soundFile: itsMyLife,
    title: 'Its my life',
    author: 'Bon Jovi',
    image: 'https://i1.sndcdn.com/artworks-dlzJFIrUNI60sREz-lA173A-t500x500.jpg',
  },
  {
    id: 23,
    soundFile: WhatIsLove,
    title: 'What is love',
    author: 'Haddway',
    image: 'https://upload.wikimedia.org/wikipedia/ru/3/3a/Haddaway_-_What_Is_Love.jpeg',
  },
  {
    id: 24,
    soundFile: CocoJango,
    title: 'Coco Jango',
    author: 'Mr. President',
    image: 'https://i.ytimg.com/vi/pcBSfTR9XLk/maxresdefault.jpg',
  },
];

interface PopularProps {
  addToPlayList: (obj: musicCards) => void;
  onDeletePlayList: (id: number) => void;
}

const Old: React.FC<PopularProps> = ({ addToPlayList, onDeletePlayList }) => {
  const context = useContext(MyContext);
  const getContextValue = context?.data.value || '';
  const filteredMusicCards: musicCards[] = context?.data.filteredMusicCards || [];
  const setFilteredMusicCards: React.Dispatch<React.SetStateAction<musicCards[]>> =
    context?.data.setFilteredMusicCards || (() => {});

  React.useEffect(() => {
    setFilteredMusicCards(
      OldArray.filter((obj) => obj.title.toLowerCase().includes(getContextValue.toLowerCase())),
    );
  }, [getContextValue, OldArray]);

  return (
    <div className="Old-Main">
      <div className="wrapper-for-all">
        <h2>Старые песни 💽💽💽</h2>
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
            OldArray.filter((obj) => {
              return obj.title.toLowerCase().includes(getContextValue.toLowerCase());
            }).map((obj) => (
              <MusicCard
                onPlus={() => addToPlayList(obj)}
                key={obj.id}
                soundFile={obj.soundFile}
                title={obj.title}
                author={obj.author}
                image={obj.image}
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

export default Old;
