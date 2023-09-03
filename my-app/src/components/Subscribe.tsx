import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SnackBar from './bars/SnackBar';

export default function PricingCards() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
        gap: 2,
        justifyContent: 'center',
      }}>
      <Card size="lg" variant="outlined">
        <Chip size="sm" variant="outlined" color="neutral">
          Простое
        </Chip>
        <Typography level="h2">Профессиональная</Typography>
        <Divider inset="none" />
        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Бесплатное скачивание 40 песен
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            40 музык в плейлисте 10 плейлистов
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Быстрое скачивание
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Новые музыки
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            15₾{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
              / мес
            </Typography>
          </Typography>
          <SnackBar />
        </CardActions>
      </Card>
      <Card
        className="subscribe-last-card"
        size="lg"
        variant="solid"
        invertedColors
        sx={{ background: 'linear-gradient(90deg, #8D00A2 0%, #DE009D 38%, #5400B3 100%);' }}>
        <Chip size="sm" variant="outlined">
          Популярное
        </Chip>
        <Typography level="h2">Неограниченный</Typography>
        <Divider inset="none" />
        <List
          size="sm"
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            mx: 'calc(-1 * var(--ListItem-paddingX))',
          }}>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Безлимитное скачивание
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Безлимитный плейлист
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Супер быстрое скачивание
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Быстрое работа сайта
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Все категории
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: 'auto' }}>
            150₾{' '}
            <Typography fontSize="sm" textColor="text.tertiary">
              / мес
            </Typography>
          </Typography>
          <SnackBar />
        </CardActions>
      </Card>
    </Box>
  );
}
