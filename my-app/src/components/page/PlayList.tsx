import React, { useState, useRef } from 'react';
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
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CheckMark from '@mui/icons-material/LibraryAddCheck';
import TextField from '@mui/material/TextField';
import DownloadIcon from '@mui/icons-material/Download';
import { MyContext } from '../../App';

type MusicItemsArrayProps = {
  musicItems: musicCards[];
  onDeletePlayList: (id: number) => void;
};

type musicCards = {
  id: number;
  title: string;
  author: string;
  image: string;
  soundFile: string;
};

const PlayList: React.FC<MusicItemsArrayProps> = ({ musicItems = [], onDeletePlayList }) => {
  const theme = useTheme();
  const [currentMusicUrl, setCurrentMusicUrl] = React.useState<string | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [playlistTitle, setPlaylistTitle] = useState<string>('');

  const handlePlayPauseClick = (musicUrl: string) => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentMusicUrl(musicUrl);
      setIsPlaying(true);
    }
  };

  const handleDelete = (id: number) => {
    onDeletePlayList(id);
  };

  const context = React.useContext(MyContext);
  const setCount = context?.data.setCount as React.Dispatch<React.SetStateAction<number>>;
  const count = context?.data.count;
  const value = context?.data.value || '';

  const [audioCurrentTime, setAudioCurrentTime] = React.useState<number>(0);

  const audioPlayerRef = useRef<ReactAudioPlayer | HTMLAudioElement | null>(null);

  const handleSkipPrevious = () => {
    if (
      currentMusicUrl &&
      audioPlayerRef.current &&
      audioPlayerRef.current instanceof HTMLAudioElement
    ) {
      const newTime = audioCurrentTime - 5;
      audioPlayerRef.current.currentTime = Math.max(newTime, 0);
      setAudioCurrentTime(Math.max(newTime, 0));
    }
  };

  const handleSkipNext = () => {
    if (
      currentMusicUrl &&
      audioPlayerRef.current &&
      audioPlayerRef.current instanceof HTMLAudioElement
    ) {
      const newTime = audioCurrentTime + 5;
      audioPlayerRef.current.currentTime = newTime;
      setAudioCurrentTime(newTime);
    }
  };

  const handleDownloadClick = (soundFile: string) => {
    // Создаем временную ссылку на скачивание файла
    const link = document.createElement('a');
    link.href = soundFile;
    link.download = `${playlistTitle || 'Плейлист-Альбом'}.mp3`; // Устанавливаем имя файла для скачивания
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="PlayList-Main">
      <div className="play-list-wrapper">
        {musicItems.length > 0 ? (
          <div>
            <h1>Плейлист</h1>
            <TextField
              sx={{ position: 'absolute', left: '360px', top: '17px', width: '300px' }}
              id="filled-basic"
              label="Назови свой плейлист-альбом"
              variant="filled"
              value={playlistTitle}
              onChange={(e) => setPlaylistTitle(e.target.value)}
            />
            {playlistTitle.length > 0 ? <h2>{playlistTitle}</h2> : <h2>Плейлист-Альбом #1</h2>}
            <div className="line-for-album-name"></div>

            <div className="border-for-array">
              <div className="playlist-items">
                {musicItems
                  .filter((obj) => {
                    return obj.title.toLowerCase().includes(value.toLowerCase());
                  })
                  .map((obj) => (
                    <Card key={obj.id} sx={{ display: 'flex' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component="div" variant="h5">
                            {obj.title}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" component="div">
                            {obj.author}
                          </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                          <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                          </IconButton>
                          <IconButton
                            aria-label="play/pause"
                            onClick={() => handlePlayPauseClick(obj.soundFile)}>
                            {isPlaying && currentMusicUrl === obj.soundFile ? (
                              <PauseIcon sx={{ height: 38, width: 80 }} />
                            ) : (
                              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                            )}
                          </IconButton>
                          <IconButton aria-label="next" onClick={handleSkipNext}>
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                          </IconButton>
                          <CheckMark
                            onClickCapture={() => setCount && setCount(count ? count - 1 : 1)}
                            onClick={() => obj.id !== undefined && handleDelete(obj.id)}
                            sx={{
                              width: '41px',
                              height: '46px',
                              color: 'rgb(122, 12, 247)',
                              cursor: 'pointer',
                              marginTop: '3px',
                            }}
                          />
                        </Box>
                        <DownloadIcon
                          sx={{
                            color: 'grey',
                            '&:hover': {
                              color: 'purple',
                            },
                            fontSize: '30px',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleDownloadClick(obj.soundFile)}
                        />
                      </Box>
                      <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={obj.image}
                        alt="music cards"
                      />
                    </Card>
                  ))}
                <div className="audio-playlist">
                  {isPlaying && currentMusicUrl && (
                    <ReactAudioPlayer
                      src={currentMusicUrl}
                      autoPlay
                      controls
                      ref={(element) => {
                        audioPlayerRef.current = element;
                      }}
                      onListen={(e: any) => {
                        setAudioCurrentTime(e.target.currentTime);
                      }}
                      onEnded={() => {
                        console.log('Track ended. Play the next one.');
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="Empty-PLayList-Wrapper">
            <h1>Ваш плейлист пустой</h1>
            <p>Добавьте хотя бы пару песен</p>

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZtMgvD-sZGwRE9Myjvc5H4Gqtw2wRb3cf9W6brIto6rke0DFM4p1NVavJcfFq4drfCO8&usqp=CAU"
              alt="empty-play-list-image"
            />

            <div className="🤚">
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="👉"></div>
              <div className="🌴"></div>
              <div className="👍"></div>
            </div>
          </div>
        )}
        {musicItems.filter((obj) => {
          return obj.title.toLowerCase().includes(value.toLowerCase());
        }).length === 0 &&
          value !== '' && (
            <div className="not-found-playlist">
              <h1>По вашему запросу песен не найдено</h1>

              <h1 className="error-text">404</h1>

              <div className="box-of-star1">
                <div className="star star-position1"></div>
                <div className="star star-position2"></div>
                <div className="star star-position3"></div>
                <div className="star star-position4"></div>
                <div className="star star-position5"></div>
                <div className="star star-position6"></div>
                <div className="star star-position7"></div>
              </div>
              <div className="box-of-star2">
                <div className="star star-position1"></div>
                <div className="star star-position2"></div>
                <div className="star star-position3"></div>
                <div className="star star-position4"></div>
                <div className="star star-position5"></div>
                <div className="star star-position6"></div>
                <div className="star star-position7"></div>
              </div>
              <div className="box-of-star3">
                <div className="star star-position1"></div>
                <div className="star star-position2"></div>
                <div className="star star-position3"></div>
                <div className="star star-position4"></div>
                <div className="star star-position5"></div>
                <div className="star star-position6"></div>
                <div className="star star-position7"></div>
              </div>
              <div className="box-of-star4">
                <div className="star star-position1"></div>
                <div className="star star-position2"></div>
                <div className="star star-position3"></div>
                <div className="star star-position4"></div>
                <div className="star star-position5"></div>
                <div className="star star-position6"></div>
                <div className="star star-position7"></div>
              </div>
              <div data-js="astro" className="astronaut">
                <div className="head"></div>
                <div className="arm arm-left"></div>
                <div className="arm arm-right"></div>
                <div className="body">
                  <div className="panel"></div>
                </div>
                <div className="leg leg-left"></div>
                <div className="leg leg-right"></div>
                <div className="schoolbag"></div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default PlayList;
