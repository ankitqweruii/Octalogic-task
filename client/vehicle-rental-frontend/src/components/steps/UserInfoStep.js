import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

export default function UserInfoStep({ formData, onChange, errors }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        What is your name?
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
          autoFocus
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </Box>
    </Box>
  );
}