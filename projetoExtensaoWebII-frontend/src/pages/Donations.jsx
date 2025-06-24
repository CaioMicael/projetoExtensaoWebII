import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import DonationService from '../services/donationService';
import './Donations.css';

function Donations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [contributionAmount, setContributionAmount] = useState('');
  const [contributingTo, setContributingTo] = useState(null);  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    organization: '',
    goal_amount: ''
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const data = await DonationService.getAllDonations();
      setDonations(data);
    } catch (err) {
      console.error('Erro ao buscar doações:', err);
      setError('Não foi possível carregar as doações.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDonation) {
        await DonationService.updateDonation(editingDonation.id, formData);
      } else {
        await DonationService.createDonation(formData);
      }
      
      setFormData({
        name: '',
        description: '',
        organization: '',
        goal_amount: ''
      });
      setShowForm(false);
      setEditingDonation(null);
      fetchDonations();
    } catch (err) {
      console.error('Erro ao salvar doação:', err);
      setError('Erro ao salvar doação. Verifique os dados e tente novamente.');
    }
  };

  const handleEdit = (donation) => {
    setEditingDonation(donation);
    setFormData({
      name: donation.name,
      description: donation.description,
      organization: donation.organization,
      goal_amount: donation.goal_amount
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta doação?')) {
      try {
        await DonationService.deleteDonation(id);
        fetchDonations();
      } catch (err) {
        console.error('Erro ao excluir doação:', err);
        setError('Erro ao excluir doação.');
      }
    }
  };

  const handleContribute = async (donationId) => {
    if (!contributionAmount || contributionAmount <= 0) {
      alert('Por favor, informe um valor válido para contribuição.');
      return;
    }

    try {
      await DonationService.contributeToDonation(donationId, parseFloat(contributionAmount));
      setContributionAmount('');
      setContributingTo(null);
      fetchDonations();
      alert('Contribuição realizada com sucesso!');
    } catch (err) {
      console.error('Erro ao contribuir:', err);
      setError('Erro ao realizar contribuição.');
    }
  };
  const calculateProgress = (raised, goal) => {
    const raisedNum = parseFloat(raised) || 0;
    const goalNum = parseFloat(goal) || 0;
    return goalNum > 0 ? Math.min((raisedNum / goalNum) * 100, 100) : 0;
  };

  if (loading) {
    return <div className="donations-container">Carregando doações...</div>;
  }

  return (
    <div className="donations-container">
      <div className="donations-header">
        <h2>Doações</h2>
        {isAuthenticated && (
          <button 
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : 'Nova Doação'}
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="donation-form">
          <h3>{editingDonation ? 'Editar Doação' : 'Nova Doação'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome da Campanha</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>
            <div className="form-group">
              <label>Organização</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Meta de Arrecadação (R$)</label>
              <input
                type="number"
                name="goal_amount"
                value={formData.goal_amount}
                onChange={handleInputChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingDonation ? 'Atualizar' : 'Criar'}
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingDonation(null);
                  setFormData({
                    name: '',
                    description: '',
                    organization: '',
                    goal_amount: ''
                  });
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="donations-grid">
        {donations.length > 0 ? donations.map((donation) => (
          <div key={donation.id} className="donation-card">
            <h3>{donation.name}</h3>
            <p className="donation-organization">Por: {donation.organization}</p>
            <p className="donation-description">{donation.description}</p>
              <div className="donation-progress">              <div className="progress-info">
                <span>R$ {parseFloat(donation.raised_amount || 0).toFixed(2)}</span>
                <span>Meta: R$ {parseFloat(donation.goal_amount || 0).toFixed(2)}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${calculateProgress(donation.raised_amount, donation.goal_amount)}%` }}
                />
              </div>
              <p className="progress-percentage">
                {calculateProgress(donation.raised_amount, donation.goal_amount).toFixed(1)}% arrecadado
              </p>
            </div>

            <div className="donation-actions">
              {contributingTo === donation.id ? (
                <div className="contribution-form">
                  <input
                    type="number"
                    placeholder="Valor (R$)"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    min="0.01"
                    step="0.01"
                  />
                  <button 
                    className="btn-primary"
                    onClick={() => handleContribute(donation.id)}
                  >
                    Confirmar
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setContributingTo(null);
                      setContributionAmount('');
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button 
                  className="btn-contribute"
                  onClick={() => setContributingTo(donation.id)}
                >
                  Contribuir
                </button>
              )}

              {isAuthenticated && user?.type === 'estabelecimento' && (
                <div className="admin-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(donation)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(donation.id)}
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          </div>
        )) : (
          <p>Nenhuma doação disponível.</p>
        )}
      </div>
    </div>
  );
}

export default Donations;
