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
// import mySoundFile from '../musics/Despacito.mp3';

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
  const [isAddIconVisible, setAddIconVisible] = React.useState(true);
  const [isCheckIconVisible, setCheckIconVisible] = React.useState(false);

  const context = React.useContext(MyContext);
  const count = context?.data.count;
  const setCount = context?.data.setCount as React.Dispatch<React.SetStateAction<number>>;

  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleAddIconClick: () => void = () => {
    onPlus();
    setAddIconVisible(false);
    setCheckIconVisible(true);
  };

  const handleCheckIconClick: () => void = () => {
    onDeletePlayList();
    setAddIconVisible(true);
    setCheckIconVisible(false);
  };

  const handleDownloadClick = () => {
    // Создаем временную ссылку на скачивание файла
    const link = document.createElement('a');
    link.href = soundFile;
    link.download = `${title}-${author}.mp3`; // Установите имя файла для скачивания
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
