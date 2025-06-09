import React from 'react';
import './Organizations.css';

function Organizations() {
  const orgs = [
    {
      id: 1,
      name: 'Defesa Civil',
      description: 'Órgão responsável por ações de prevenção, socorro e assistência em situações de desastres naturais.',
      city: 'Porto Alegre',
      type: 'Governo',
    },
    {
      id: 2,
      name: 'APAE',
      description: 'Associação de Pais e Amigos dos Excepcionais, promovendo inclusão e apoio a pessoas com deficiência.',
      city: 'Canoas',
      type: 'ONG',
    },
    {
      id: 3,
      name: 'Lar das Meninas',
      description: 'Instituição de acolhimento para meninas em situação de vulnerabilidade social.',
      city: 'Gravataí',
      type: 'ONG',
    },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Organizações</h2>
      <div className="orgs-list">
        {orgs.map((o) => (
          <div className="org-card" key={o.id}>
            <h3>{o.name}</h3>
            <p className="desc">{o.description}</p>
            <div className="org-info">
              <span className={`badge ${o.type === 'ONG' ? 'ong' : 'gov'}`}>{o.type}</span>
              <span className="city">{o.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Organizations;
