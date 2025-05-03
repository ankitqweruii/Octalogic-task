import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = {
  getVehicleTypes: (wheels) => {
    return axios.get(`${API_URL}/vehicle-types?wheels=${wheels}`);
  },
  
  getVehicles: (typeId) => {
    return axios.get(`${API_URL}/vehicles?typeId=${typeId}`);
  },
  
  checkAvailability: (vehicleId, startDate, endDate) => {
    return axios.get(`${API_URL}/bookings/availability`, {
      params: {
        vehicleId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }
    });
  },
  
  createBooking: (bookingData) => {
    return axios.post(`${API_URL}/bookings`, {
      ...bookingData,
      startDate: bookingData.startDate.toISOString().split('T')[0],
      endDate: bookingData.endDate.toISOString().split('T')[0]
    });
  }
};

export default api;