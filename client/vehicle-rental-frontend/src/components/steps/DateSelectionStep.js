import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormHelperText 
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

export default function DateSelectionStep({ formData, onChange, errors }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Date range picker
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Please select the start and end dates for your vehicle rental.
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <DatePicker
            label="Start Date"
            value={formData.startDate}
            onChange={(newValue) => {
              onChange('startDate', newValue);
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                fullWidth
                error={!!errors.startDate}
                helperText={errors.startDate}
              />
            )}
            disablePast
          />
          
          <DatePicker
            label="End Date"
            value={formData.endDate}
            onChange={(newValue) => {
              onChange('endDate', newValue);
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                fullWidth
                error={!!errors.endDate}
                helperText={errors.endDate}
              />
            )}
            disablePast
            minDate={formData.startDate || new Date()}
          />
        </Box>
        
        {errors.dateRange && (
          <FormHelperText error sx={{ mt: 2 }}>
            {errors.dateRange}
          </FormHelperText>
        )}
      </Box>
    </LocalizationProvider>
  );
}