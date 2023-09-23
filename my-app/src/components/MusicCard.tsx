import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import AddPlayListIcon from '@mui/icons-material/Queue';
import CheckMark from '@mui/icons-material/LibraryAddCheck';
import { MyContext } from '../App';
import DownloadIcon from '@mui/icons-material/Download';
import {
  saveIsAddIconVisibleToLocalStorage,
  saveIsCheckIconVisibleToLocalStorage,
} from '.././utils/checkUtils';

interface MusicCardProps {
  title: string;
  author: string;
  image: string;
  soundFile: string;
  onPlus: () => void;
  onPlusPopular: () => void;
  onPlusLegendary: () => void;
  onDeletePlayList: () => void;
}

const MediaControlCard: React.FC<MusicCardProps> = ({
  title,
  author,
  image,
  soundFile,
  onPlus,
  onDeletePlayList,
  // onPlusPopular,
  // onPlusLegendary,
}) => {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(true);
  const [isAddIconVisible, setAddIconVisible] = React.useState(() => {
    const storedValue = localStorage.getItem(`isAddIconVisible-${title}-${author}`);
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const [isCheckIconVisible, setCheckIconVisible] = React.useState(() => {
    const storedValue = localStorage.getItem(`isCheckIconVisible-${title}-${author}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [isBlack, setIsBlack] = useState(
    localStorage.getItem(`isBlack-${title}-${author}`) === 'true',
  );

  const context = React.useContext(MyContext);
  const count = context?.data.count;
  const setCount = context?.data.setCount as React.Dispatch<React.SetStateAction<number>>;

  const [isPlaying, setIsPlaying] = React.useState(false);

  // const saveIsAddIconVisibleToLocalStorage = (value: boolean) => {
  //   localStorage.setItem(`isAddIconVisible-${title}-${author}`, JSON.stringify(value));
  // };

  // const saveIsCheckIconVisibleToLocalStorage = (value: boolean) => {
  //   localStorage.setItem(`isCheckIconVisible-${title}-${author}`, JSON.stringify(value));
  // };

  const handleAddIconClick: () => void = () => {
    onPlus();
    setAddIconVisible(false);
    setCheckIconVisible(true);
    saveIsAddIconVisibleToLocalStorage(title, author, false);
    saveIsCheckIconVisibleToLocalStorage(title, author, true);
  };

  const handleCheckIconClick: () => void = () => {
    onDeletePlayList();
    setAddIconVisible(true);
    setCheckIconVisible(false);
    saveIsAddIconVisibleToLocalStorage(title, author, true);
    saveIsCheckIconVisibleToLocalStorage(title, author, false);
  };

  const handleDownloadClick = () => {
    const link = document.createElement('a');
    link.href = soundFile;
    link.download = `${title}-${author}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClick = () => {
    setIsBlack(!isBlack);
  };

  React.useEffect(() => {
    localStorage.setItem(`isBlack-${title}-${author}`, String(isBlack));
  }, [isBlack]);

  return (
    <Card sx={{ display: 'flex', width: '260px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          sx={{ width: 260, height: '230px' }}
          image={image}
          alt="Live from space album cover"
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {author}
          </Typography>
          <button
            onClick={handleClick}
            style={{
              color: isBlack ? 'white' : 'white',
              // backgroundColor: isBlack ? 'black' : 'white',
              background: isBlack
                ? 'linear-gradient(0deg, #0016bd 0%, #d600e6 100%)'
                : 'linear-gradient(0deg, #808080 0%, #b8b8b8 100%)',
              border: 'none',
              borderRadius: '10px',
              width: '99px',
              height: '28px',
              cursor: 'pointer',
            }}>
            {isBlack ? 'отмечено' : 'отметить'}
          </button>
          <div className="play-list-icon">
            {isAddIconVisible && (
              <AddPlayListIcon
                sx={{
                  width: '41px',
                  height: '46px',
                  color: 'rgb(122, 12, 247)',
                  cursor: 'pointer',
                }}
                onClick={handleAddIconClick}
                onClickCapture={() => setCount && setCount(count ? count + 1 : 1)}
              />
            )}
            {isCheckIconVisible && (
              <CheckMark
                sx={{
                  width: '41px',
                  height: '46px',
                  color: 'rgb(122, 12, 247)',
                  cursor: 'pointer',
                }}
                onClick={handleCheckIconClick}
                onClickCapture={() => setCount && setCount(count ? count - 1 : 1)}
              />
            )}
          </div>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {/* {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />} */}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 80 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 80 }} />
            )}
          </IconButton>
        </Box>
        {isPlaying && <ReactAudioPlayer src={soundFile} autoPlay controls />}
        <DownloadIcon
          sx={{
            color: 'grey',
            fontSize: '30px',
            marginTop: '-14px',
            zIndex: '1000',
            '&:hover': {
              color: 'purple',
              cursor: 'pointer', // Добавляем указатель при наведении
            },
          }}
          onClick={handleDownloadClick} // Обработчик для скачивания
        />
      </Box>
    </Card>
  );
};

export default MediaControlCard;
