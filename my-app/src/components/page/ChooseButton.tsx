import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';

export default function ExampleSegmentedControls() {
  const [justify, setJustify] = React.useState('flex-start');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <RadioGroup
        orientation="horizontal"
        aria-labelledby="segmented-controls-example"
        name="justify"
        value={justify}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setJustify(event.target.value)}
        sx={{
          minHeight: 48,
          padding: '4px',
          borderRadius: '12px',
          bgcolor: 'neutral.softBg',
          '--RadioGroup-gap': '4px',
          '--Radio-actionRadius': '8px',
        }}>
        {['Популярные', 'Легендарные', 'Старые'].map((item) => (
          <Radio
            key={item}
            // color="neutral"
            value={item}
            disableIcon
            label={item}
            variant="plain"
            sx={{
              px: 2,
              alignItems: 'center',
              backgroundColor: 'white',
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'background.surface',
                    boxShadow: 'sm',
                    borderRadius: '20px',
                    '&:hover': {
                      background: 'linear-gradient(95deg, #A500A0 0%, #D4D4D4 100%);',
                      borderRadius: '20px',
                    },
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
