import React from 'react';
import { Box, Typography, Divider, Paper } from '@mui/material';

export default function ConfirmationStep({ formData, isAvailable, bookingComplete }) {
  if (!isAvailable) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Vehicle Not Available
        </Typography>
        <Typography>
          We're sorry, but the selected vehicle is not available for the chosen dates.
          Please go back and select different dates.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Booking Summary
      </Typography>
      
      <Paper variant="outlined" sx={{ p: 3, mt: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Personal Information
        </Typography>
        <Typography>
          {formData.firstName} {formData.lastName}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" fontWeight="bold">
          Vehicle Details
        </Typography>
        <Typography>
          Type: {formData.vehicleType?.name} ({formData.wheels} wheels)
        </Typography>
        <Typography>
          Model: {formData.vehicle?.brand} {formData.vehicle?.model} ({formData.vehicle?.year})
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" fontWeight="bold">
          Rental Period
        </Typography>
        <Typography>
          From: {formData.startDate && new Date(formData.startDate).toLocaleDateString()}
        </Typography>
        <Typography>
          To: {formData.endDate && new Date(formData.endDate).toLocaleDateString()}
        </Typography>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Please confirm your booking by clicking the "Confirm Booking" button below.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}