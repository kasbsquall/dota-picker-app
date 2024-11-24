import React from 'react';

interface RecommendationItemProps {
  role: string;
  heroName: string;
  heroImage: string;
  reasons: string[];
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ role, heroName, heroImage, reasons }) => {
  return (
    <div className="recommendation">
      <img src={heroImage} alt={heroName} className="hero-image-suggestion" />
      <div className="heroinforecomendation">
        <span className="role">{role}:</span> <span className="hero-name">{heroName}</span>
        <ul className="reason-list">
          {reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecommendationItem;