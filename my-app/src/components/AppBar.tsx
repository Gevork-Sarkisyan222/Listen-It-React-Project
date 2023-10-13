import React, { useEffect } from 'react';
import Input from './Input';
import Button from '@mui/material/Button';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import DiscFullIcon from '@mui/icons-material/DiscFull';
import Badge from '@mui/joy/Badge';
import { MyContext } from '../App';
import Modal from '.././components/modal/Modal';
import AccauntModal from '.././components/modal/AccauntModal';
import MenuIcon from '@mui/icons-material/Menu';
import ChooseButton from './page/ChooseButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface ValueProps {
  value: string;
  setValue: (newValue: string) => void;
}

const AppBar: React.FC<ValueProps> = ({ value, setValue }) => {
  const [notVisibleBack, setNotVisibleBack] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const location = useLocation();

  const handleVisible: () => void = () => {
    setNotVisibleBack(true);
  };

  const context = React.useContext(MyContext);
  const count = context?.data.count;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (open) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWentToWelcome = () => {
    navigate('/Listen-It-React-Project');
  };

  return (
    <>
      <div className="App-Bar">
        <div className="app-bar-wrapper">
          <img
            onClick={handleWentToWelcome}
            className="headphones-logo"
            //   src="https://cdn-icons-png.flaticon.com/512/3355/3355318.png"
            src="https://cdn-icons-png.flaticon.com/512/3003/3003089.png"
            alt="log-headphones-svg"
          />

          <h2>Listen It</h2>
          <h4>Лучший сайт музыки</h4>

          <Input value={value} setValue={setValue} />

          <Badge sx={{ position: 'absolute', left: '50px' }} badgeContent={count}></Badge>
          <Tooltip
            className="tooltip-title"
            title={
              <div>
                <Typography color="inherit">Плейлист</Typography>
                <em>{'Вы'}</em> <b>{'можете'}</b> <u>{'использовать только 1 плейлист'}</u>.{' '}
              </div>
            }
            placement="bottom-end">
            <Link to="/PlayList">
              <DiscFullIcon
                onClick={handleVisible}
                className="move-DiscFullIcon"
                sx={{
                  fontSize: '60px',
                  marginLeft: '974px',
                  color: 'yellow',
                  backgroundColor: 'black',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Tooltip>

          <div className="media-app-bar-icon" onClick={handleClick}>
            <MenuIcon sx={{ height: '40px', width: '60px' }} />

            <section className="media-menu-text">
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}>
                <div onClick={(e) => e.stopPropagation()}>
                  <Modal />
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <AccauntModal />
                </div>
              </Menu>
            </section>
          </div>
        </div>
        <div className="underline-app-bar"></div>
      </div>

      <div className="popup-category">
        <ChooseButton />
      </div>

      {location.pathname !== '/Listen-It-React-Project' && (
        <div className="Left-App-Side-Bar">
          <div className="side-bar-wrapper">
            {notVisibleBack && (
              <Link to="/">
                <Button onClick={() => setNotVisibleBack(false)} variant="text">
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                      fontSize: '12px',
                      zIndex: '1000',
                      color: 'rgb(209, 0, 181)',
                    }}>
                    Назад
                  </span>
                </Button>
              </Link>
            )}

            <Link to="/Popular-Category">
              <Button onClick={handleVisible} variant="text">
                <span style={{ whiteSpace: 'nowrap', fontSize: '12px', color: 'rgb(92,39,112)' }}>
                  Популярные песни
                </span>
              </Button>
            </Link>

            <Link to="/Legendary-Category">
              <Button onClick={handleVisible} variant="text">
                <span style={{ whiteSpace: 'nowrap', fontSize: '12px', color: 'rgb(92,39,112)' }}>
                  Легендарные песни
                </span>
              </Button>
            </Link>

            <Link to="/Old-Category">
              <Button onClick={handleVisible} variant="text">
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: '12px',
                    zIndex: '1000',
                    color: 'rgb(92,39,112)',
                  }}>
                  Старые песни
                </span>
              </Button>
            </Link>
            <Modal />

            <AccauntModal />

            <a
              href="https://www.shazam.com/ru/charts/top-200/world"
              target="_blank"
              rel="noopener noreferrer">
              <Button variant="text">
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: '12px',
                    zIndex: '1000',
                    color: 'rgb(92,39,112)',
                  }}>
                  Топ песни
                </span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default AppBar;
