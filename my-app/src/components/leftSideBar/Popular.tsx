import React, { useContext } from 'react';
import '../../App.scss';
import MusicCard from '../MusicCard';
import { MyContext } from '../../App';
import { musicCards } from '../../App';
import Cupid from '../../musics/FIFTY FIFTY – Cupid.mp3';
import Asake from '../../musics/Asake-2-30-New-Song-(TrendyBeatz.com).mp3';
import UnX100 from '../../musics/Grupo-Frontera-un-x100to-Ft-Bad-Bunny-(HiphopMood.com).mp3';
import KILLBill from '../../musics/F4ST – Kill Bill - I Might Kill My Ex (Sped Up).mp3';
import Vampiros from '../../musics/Rosalia feat. Rauw Alejandro - Vampiros.mp3';
import PrivateLanging from '../../musics/Don_Toliver_-_Private_Landing_feat_.mp3';

const popularArray = [
  {
    id: 7,
    soundFile: Cupid,
    title: 'Cupid',
    author: 'Fifty Fifty',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Fifty_Fifty_-_The_Beginning_Cupid.png/220px-Fifty_Fifty_-_The_Beginning_Cupid.png',
  },
  {
    id: 8,
    soundFile: Asake,
    title: '2:30',
    author: 'Asake',
    image: 'https://m.media-amazon.com/images/I/41l1IB9z+zL._UXNaN_FMjpg_QL85_.jpg',
  },
  {
    id: 9,
    soundFile: UnX100,
    title: 'Un x100 to',
    author: 'Frontera & Bunny',
    image: 'https://tooxclusive.com/wp-content/uploads/2023/04/xploo.jpeg',
  },
  {
    id: 10,
    soundFile: KILLBill,
    title: 'Kill Bill',
    author: 'Doja Cat',
    image: 'https://images.genius.com/f07e1904cfc469eef9e4567acc4dff2a.440x440x1.jpg',
  },
  {
    id: 11,
    soundFile: Vampiros,
    title: 'VAMPIROS',
    author: 'Rauw Alejandro',
    image: 'https://i.ytimg.com/vi/nzxQA7r0Cps/maxresdefault.jpg',
  },
  {
    id: 12,
    soundFile: PrivateLanging,
    title: 'Private Landing',
    author: 'Don Toliver',
    image: 'https://images.genius.com/4420e25608877cc3368f04592720352d.999x999x1.png',
  },
];

interface PopularProps {
  addToPlayList: (obj: musicCards) => void;
  onDeletePlayList: (id: number) => void;
}

const Popular: React.FC<PopularProps> = ({ addToPlayList, onDeletePlayList }) => {
  const context = useContext(MyContext);
  const valueGet = context?.data.value || '';
  const filteredMusicCards: musicCards[] = context?.data.filteredMusicCards || [];
  const setFilteredMusicCards: React.Dispatch<React.SetStateAction<musicCards[]>> =
    context?.data.setFilteredMusicCards || (() => {});

  React.useEffect(() => {
    setFilteredMusicCards(
      popularArray.filter((obj) => obj.title.toLowerCase().includes(valueGet.toLowerCase())),
    );
  }, [valueGet, popularArray]);

  return (
    <div className="Popular-Main">
      <div className="wrapper-for-all">
        <h2>Популярные песни 2023 🔥🔥🔥</h2>
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
            popularArray
              .filter((obj) => {
                return obj.title.toLowerCase().includes(valueGet.toLowerCase());
              })
              .map((obj) => (
                <MusicCard
                  onPlus={() => addToPlayList(obj)}
                  soundFile={obj.soundFile}
                  key={obj.id}
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

export default Popular;
