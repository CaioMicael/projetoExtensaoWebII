import React from 'react';
import './Dashboard.css';

function Dashboard() {
  const user = {
    name: 'João da Silva',
    email: 'joao@email.com',
    totalDonated: 'R$ 1.200',
    donations: [
      { id: 1, campaign: 'Ajuda para Enchentes RS', value: 'R$ 200', date: '01/06/2025' },
      { id: 2, campaign: 'Doe para a APAE', value: 'R$ 500', date: '15/05/2025' },
      { id: 3, campaign: 'Lar das Meninas - Reforma', value: 'R$ 500', date: '10/05/2025' },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Painel do Usuário</h2>
      <div className="user-card">
        <h3>{user.name}</h3>
        <div className="user-info">{user.email}</div>
        <div className="user-total">Total doado: <b>{user.totalDonated}</b></div>
      </div>
      <div className="donations-section">
        <h4>Minhas Doações</h4>
        <table className="donations-table">
          <thead>
            <tr>
              <th>Campanha</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {user.donations.map((d) => (
              <tr key={d.id}>
                <td>{d.campaign}</td>
                <td>{d.value}</td>
                <td>{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
