import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Subscribe from '../Subscribe';

export default function BasicModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)} variant="text">
        <span
          style={{
            whiteSpace: 'nowrap',
            fontSize: '12px',
            zIndex: '1000',
            color: 'rgb(92,39,112)',
          }}>
          Подписка
        </span>
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Subscribe />
      </Modal>
    </React.Fragment>
  );
}
