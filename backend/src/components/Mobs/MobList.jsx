import React, { useEffect, useState } from 'react';
import MobCard from './MobCard';

const MobList = () => {
  const [mobs, setMobs] = useState([]);

  useEffect(() => {
    const fetchMobs = async () => {
      try {
        const response = await fetch('/api/mobs');
        const data = await response.json();
        setMobs(data);
      } catch (error) {
        console.error('Error fetching mobs:', error);
      }
    };

    fetchMobs();
  }, []);

  return (
    <div className="mob-list">
      {mobs.map(mob => (
        <MobCard key={mob.id} mob={mob} />
      ))}
    </div>
  );
};

export default MobList;
