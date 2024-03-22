import React, { useEffect } from 'react';
import './aboutUs.css';
import backgroundMusic from './backgroundMusic.mp3';

const CompanyDescription = () => {
  const companyName = 'Dream Cream';

  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="company-description">
      <p>
        Delight in the timeless journey of flavors with {companyName},
        where every scoop is a celebration of creamy indulgence.
        Born from a passion for authenticity,
        our ice cream is crafted from the finest locally-sourced ingredients,
        blended with care, and frozen to perfection. At {companyName},
        we believe in the simple pleasures of life like the joy that comes from
        sharing a moment over a cup of our signature ice cream.
        Our cherished recipes have been churned through generations,
        bringing smiles with classic favorites and exciting the taste buds with innovative new twists.
        Committed to sustainability and community, 
        we ensure that every pint not only tastes good but also does good.
        Join us in savoring the sweet life, where every lick, scoop, and bite is a promise of quality,
        flavor, and the heartfelt warmth of {companyName}.
      </p>
    </div>
  );
};

export default CompanyDescription;
