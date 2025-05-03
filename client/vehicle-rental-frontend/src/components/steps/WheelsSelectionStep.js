import React from 'react';
import { 
  Box, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormControl, 
  FormHelperText 
} from '@mui/material';

export default function WheelsSelectionStep({ formData, onChange, errors }) {
  const handleChange = (event) => {
    onChange('wheels', parseInt(event.target.value, 10));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Number of wheels
      </Typography>
      <FormControl component="fieldset" error={!!errors.wheels}>
        <RadioGroup
          aria-label="wheels"
          name="wheels"
          value={formData.wheels || ''}
          onChange={handleChange}
        >
          <FormControlLabel value={2} control={<Radio />} label="2 Wheels" />
          <FormControlLabel value={4} control={<Radio />} label="4 Wheels" />
        </RadioGroup>
        {errors.wheels && <FormHelperText>{errors.wheels}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
