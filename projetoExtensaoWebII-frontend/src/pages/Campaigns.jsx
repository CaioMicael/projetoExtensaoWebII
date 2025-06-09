import React from 'react';
import './Campaigns.css';

function Campaigns() {
  // Exemplo de campanhas fictícias
  const campaigns = [
    {
      id: 1,
      title: 'Ajuda para Enchentes RS',
      description: 'Campanha emergencial para arrecadação de mantimentos e roupas para famílias afetadas pelas enchentes no Rio Grande do Sul.',
      goal: 'R$ 50.000',
      progress: 'R$ 32.400',
      organization: 'Defesa Civil',
    },
    {
      id: 2,
      title: 'Doe para a APAE',
      description: 'Ajude a APAE a continuar oferecendo suporte a crianças e jovens com deficiência intelectual.',
      goal: 'R$ 20.000',
      progress: 'R$ 8.200',
      organization: 'APAE',
    },
    {
      id: 3,
      title: 'Lar das Meninas - Reforma',
      description: 'Campanha para reforma do Lar das Meninas, garantindo mais conforto e segurança para as acolhidas.',
      goal: 'R$ 15.000',
      progress: 'R$ 4.500',
      organization: 'Lar das Meninas',
    },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Campanhas de Doação</h2>
      <div className="campaigns-list">
        {campaigns.map((c) => (
          <div className="campaign-card" key={c.id}>
            <h3>{c.title}</h3>
            <p className="desc">{c.description}</p>
            <div className="org">Organização: <b>{c.organization}</b></div>
            <div className="progress-bar-bg">
              <div className="progress-bar" style={{width: Math.min(100, (parseInt(c.progress.replace(/\D/g, '')) / parseInt(c.goal.replace(/\D/g, ''))) * 100) + '%'}}></div>
            </div>
            <div className="goal">Meta: <b>{c.goal}</b> | Arrecadado: <b>{c.progress}</b></div>
            <button className="donate-btn">Doar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Campaigns;
