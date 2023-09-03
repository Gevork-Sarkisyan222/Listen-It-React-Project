import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

interface inputValueProps {
  value: string;
  setValue: (newValue: string) => void;
}

const CustomizedInputBase: React.FC<inputValueProps> = ({ value, setValue }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        marginTop: '-65px',
        marginLeft: '513px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        backgroundColor: 'rgba(128, 0, 128, 0.747);',
      }}>
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Найти музыку"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
  );
};

export default CustomizedInputBase;
