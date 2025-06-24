import api from './api';

const DonationService = {
  getAllDonations: async () => {
    try {
      const response = await api.get('donations');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDonationById: async (id) => {
    try {
      const response = await api.get(`donations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createDonation: async (donationData) => {
    try {
      const response = await api.post('donations', donationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateDonation: async (id, donationData) => {
    try {
      const response = await api.put(`donations/${id}`, donationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteDonation: async (id) => {
    try {
      const response = await api.delete(`donations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  contributeToDonation: async (id, amount) => {
    try {
      const response = await api.post(`donations/${id}/contribute`, { amount });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default DonationService;
