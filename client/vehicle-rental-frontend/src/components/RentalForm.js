import React, { useState } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography, 
  Paper,
  CircularProgress
} from '@mui/material';
import UserInfoStep from './steps/UserInfoStep';
import WheelsSelectionStep from './steps/WheelsSelectionStep';
import VehicleTypeStep from './steps/VehicleTypeStep';
import VehicleModelStep from './steps/VehicleModelStep';
import DateSelectionStep from './steps/DateSelectionStep';
import ConfirmationStep from './steps/ConfirmationStep';
import api from '../services/api';

const steps = [
  'Personal Information',
  'Number of Wheels',
  'Vehicle Type',
  'Vehicle Model',
  'Rental Period',
  'Confirmation'
];

export default function RentalForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: null,
    vehicleType: null,
    vehicle: null,
    startDate: null,
    endDate: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [bookingComplete, setBookingComplete] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    switch (activeStep) {
      case 0: 
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        break;
      case 1: 
        if (!formData.wheels) {
          newErrors.wheels = 'Please select number of wheels';
        }
        break;
      case 2: 
        if (!formData.vehicleType) {
          newErrors.vehicleType = 'Please select a vehicle type';
        }
        break;
      case 3: 
        if (!formData.vehicle) {
          newErrors.vehicle = 'Please select a vehicle model';
        }
        break;
      case 4: 
        if (!formData.startDate) {
          newErrors.startDate = 'Start date is required';
        }
        if (!formData.endDate) {
          newErrors.endDate = 'End date is required';
        } else if (formData.startDate && formData.endDate && 
                  formData.startDate > formData.endDate) {
          newErrors.endDate = 'End date must be after start date';
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) {
      return;
    }

    if (activeStep === 4 && formData.vehicle && formData.startDate && formData.endDate) {
      setIsLoading(true);
      try {
        const response = await api.checkAvailability(
          formData.vehicle.id,
          formData.startDate,
          formData.endDate
        );
        setIsAvailable(response.data.available);
        if (!response.data.available) {
          setErrors({
            ...errors,
            dateRange: 'This vehicle is not available for the selected dates'
          });
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error checking availability:', error);
        setErrors({
          ...errors,
          dateRange: 'Error checking availability'
        });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }

    if (activeStep === 1) { 
      setFormData({
        ...formData,
        vehicleType: null,
        vehicle: null
      });
    } else if (activeStep === 2) { 
      setFormData({
        ...formData,
        vehicle: null
      });
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await api.createBooking({
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: formData.vehicle.id,
        startDate: formData.startDate,
        endDate: formData.endDate
      });
      setBookingComplete(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrors({
        ...errors,
        submit: 'Error submitting booking: ' + 
          (error.response?.data?.message || 'Unknown error')
      });
    }
    setIsLoading(false);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <UserInfoStep 
            formData={formData} 
            onChange={handleInputChange} 
            errors={errors} 
          />
        );
      case 1:
        return (
          <WheelsSelectionStep 
            formData={formData} 
            onChange={handleInputChange} 
            errors={errors} 
          />
        );
      case 2:
        return (
          <VehicleTypeStep 
            formData={formData} 
            onChange={handleInputChange} 
            errors={errors} 
          />
        );
      case 3:
        return (
          <VehicleModelStep 
            formData={formData} 
            onChange={handleInputChange} 
            errors={errors} 
          />
        );
      case 4:
        return (
          <DateSelectionStep 
            formData={formData} 
            onChange={handleInputChange} 
            errors={errors} 
          />
        );
      case 5:
        return (
          <ConfirmationStep 
            formData={formData}
            isAvailable={isAvailable}
            bookingComplete={bookingComplete}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {bookingComplete ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Booking Completed Successfully!
                </Typography>
                <Typography variant="body1">
                  Your {formData.vehicle?.brand} {formData.vehicle?.model} is booked 
                  from {new Date(formData.startDate).toLocaleDateString()} 
                  to {new Date(formData.endDate).toLocaleDateString()}.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Thank you for your booking, {formData.firstName}!
                </Typography>
              </Box>
            ) : (
              <>
                {getStepContent(activeStep)}
                
                {errors.submit && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {errors.submit}
                  </Typography>
                )}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  
                  {activeStep === steps.length - 1 ? (
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={handleSubmit}
                      disabled={!isAvailable}
                    >
                      Confirm Booking
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}
