import * as React from 'react';
import Button from '@mui/joy/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar(
      'У вас не хватает средств на покупку отправьте деньги на номер +995-568-30-36-56',
    );
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClick}
        variant="soft"
        color="neutral"
        endDecorator={<KeyboardArrowRight />}>
        Купить сейчас
      </Button>
      {/* <Button onClick={handleClick}>Show snackbar</Button> */}
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
