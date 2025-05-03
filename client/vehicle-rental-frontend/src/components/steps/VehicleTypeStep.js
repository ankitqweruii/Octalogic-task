import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormControl, 
  FormHelperText,
  CircularProgress
} from '@mui/material';
import api from '../../services/api';

export default function VehicleTypeStep({ formData, onChange, errors }) {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVehicleTypes() {
      if (!formData.wheels) {
        setVehicleTypes([]);
        setLoading(false);
        return;
      }
      
      try {
        const response = await api.getVehicleTypes(formData.wheels);
        setVehicleTypes(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicle types:", err);
        setError("Failed to load vehicle types");
      } finally {
        setLoading(false);
      }
    }

    fetchVehicleTypes();
  }, [formData.wheels]);

  const handleChange = (event) => {
    const selectedTypeId = parseInt(event.target.value, 10);
    const selectedType = vehicleTypes.find(type => type.id === selectedTypeId);
    onChange('vehicleType', selectedType);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">{error}</Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Type of vehicle
      </Typography>
      
      {vehicleTypes.length > 0 ? (
        <FormControl component="fieldset" error={!!errors.vehicleType}>
          <RadioGroup
            aria-label="vehicleType"
            name="vehicleType"
            value={formData.vehicleType?.id || ''}
            onChange={handleChange}
          >
            {vehicleTypes.map((type) => (
              <FormControlLabel 
                key={type.id} 
                value={type.id} 
                control={<Radio />} 
                label={type.name} 
              />
            ))}
          </RadioGroup>
          {errors.vehicleType && <FormHelperText>{errors.vehicleType}</FormHelperText>}
        </FormControl>
      ) : (
        <Typography variant="body1">
          Please select the number of wheels first.
        </Typography>
      )}
    </Box>
  );
}