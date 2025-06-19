import api from './api';

const DonationService = {
  // Listar todas as doações
  getAllDonations: async () => {
    try {
      const response = await api.get('donations');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obter uma doação específica pelo ID
  getDonationById: async (id) => {
    try {
      const response = await api.get(`donations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Criar uma nova doação
  createDonation: async (donationData) => {
    try {
      const response = await api.post('donations', donationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Atualizar uma doação
  updateDonation: async (id, donationData) => {
    try {
      const response = await api.put(`donations/${id}`, donationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Excluir uma doação
  deleteDonation: async (id) => {
    try {
      const response = await api.delete(`donations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Contribuir para uma doação
  contributeToDonation: async (id, amount) => {
    try {
      const response = await api.post(`donations/${id}/contribute`, { amount });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default DonationService;
