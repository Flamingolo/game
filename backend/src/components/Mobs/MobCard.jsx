import React from 'react';

const MobCard = ({ mob }) => {
  return (
    <div className="mob-card">
      <h2>{mob.name}</h2>
      <p>Level: {mob.levelID}</p>
      <p>Gold Drop: {mob.goldDrop.min} - {mob.goldDrop.max}</p>
      <p>Health: {mob.resource.health}</p>
      <p>Mana: {mob.resource.mana}</p>
      <p>Items: {mob.itemIDs ? mob.itemIDs.join(', ') : 'None'}</p>
    </div>
  );
};

export default MobCard;
