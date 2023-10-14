import * as React from 'react';
import Buttons from '@mui/material/Button';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

export default function BasicModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Buttons onClick={() => setOpen(true)} variant="text">
        <span
          style={{
            whiteSpace: 'nowrap',
            fontSize: '12px',
            zIndex: '1000',
            color: 'rgb(92,39,112)',
          }}>
          Аккаунт
        </span>
      </Buttons>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          data-resizable
          sx={{
            textAlign: 'center',
            alignItems: 'center',
            width: 343,
            overflow: 'auto',
            resize: 'horizontal',
            '--icon-size': '100px',
          }}>
          <CardOverflow
            sx={{ background: 'linear-gradient(90deg, #8d00a2 0%, #6200ce 100%)' }}
            variant="solid"
            color="warning">
            <AspectRatio
              variant="outlined"
              color="warning"
              ratio="1"
              sx={{
                m: 'auto',
                transform: 'translateY(50%)',
                borderRadius: '50%',
                width: 'var(--icon-size)',
                boxShadow: 'sm',
                bgcolor: 'background.surface',
                position: 'relative',
              }}>
              <div>
                {/* <BakeryDiningIcon color="warning" sx={{ fontSize: '4rem' }} /> */}
                <img
                  className="logo-avatar"
                  src="https://w7.pngwing.com/pngs/409/690/png-transparent-headphones-circle-font-headphones-purple-electronics-violet.png"
                  alt=""
                />
              </div>
            </AspectRatio>
          </CardOverflow>
          <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
            🎶 🎧 Listen It 🎧🎶
          </Typography>
          <CardContent sx={{ maxWidth: '40ch' }}>
            Топовые музыки всех времён только у нас Listen It заходите к нам мы вам поможем найти то
            что вам нужно
          </CardContent>
          <CardActions
            orientation="vertical"
            buttonFlex={1}
            sx={{
              '--Button-radius': '40px',
              width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
            }}>
            <a
              href="https://www.instagram.com/listen_it_best_musics/"
              target="_blank"
              rel="noopener noreferrer">
              <Button
                className="cross-button"
                variant="solid"
                sx={{
                  backgroundColor: 'purple',
                  '&:hover': {
                    backgroundColor: 'rgb(192, 1, 192);',
                  },
                }}>
                Перейти
              </Button>
            </a>
            <Button onClick={() => setOpen(false)} variant="plain" color="neutral">
              Пропустить
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </React.Fragment>
  );
}
