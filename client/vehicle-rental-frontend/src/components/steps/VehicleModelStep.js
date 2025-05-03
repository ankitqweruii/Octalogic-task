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

export default function VehicleModelStep({ formData, onChange, errors }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVehicles() {
      if (!formData.vehicleType) {
        setVehicles([]);
        setLoading(false);
        return;
      }
      
      try {
        const response = await api.getVehicles(formData.vehicleType.id);
        setVehicles(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles");
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, [formData.vehicleType]);

  const handleChange = (event) => {
    const selectedVehicleId = parseInt(event.target.value, 10);
    const selectedVehicle = vehicles.find(vehicle => vehicle.id === selectedVehicleId);
    onChange('vehicle', selectedVehicle);
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
        Specific Model
      </Typography>
      
      {vehicles.length > 0 ? (
        <FormControl component="fieldset" error={!!errors.vehicle}>
          <RadioGroup
            aria-label="vehicle"
            name="vehicle"
            value={formData.vehicle?.id || ''}
            onChange={handleChange}
          >
            {vehicles.map((vehicle) => (
              <FormControlLabel 
                key={vehicle.id} 
                value={vehicle.id} 
                control={<Radio />} 
                label={`${vehicle.brand} ${vehicle.model} (${vehicle.year})`} 
              />
            ))}
          </RadioGroup>
          {errors.vehicle && <FormHelperText>{errors.vehicle}</FormHelperText>}
        </FormControl>
      ) : (
        <Typography variant="body1">
          Please select a vehicle type first.
        </Typography>
      )}
    </Box>
  );
}
