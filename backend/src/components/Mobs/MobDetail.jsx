import React from 'react';

const MobDetail = ({ mob }) => {
  if (!mob) {
    return <div>No mob selected</div>;
  }

  return (
    <div>
      <h2>{mob.name}</h2>
      <p>ID: {mob.id}</p>
      <p>Level: {mob.levelID}</p>
      <p>Gold Drop: {mob.goldDrop.min} - {mob.goldDrop.max}</p>
      <p>Health: {mob.resource.health}</p>
      <p>Mana: {mob.resource.mana}</p>
      <p>Items: {mob.itemIDs ? mob.itemIDs.join(', ') : 'None'}</p>
    </div>
  );
};

export default MobDetail;
