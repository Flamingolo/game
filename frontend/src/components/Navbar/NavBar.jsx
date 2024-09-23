import React from 'react';
import { towns, dungeons } from './dummyData';

const Navbar = () => {
  return (
    <nav>
      <ul>
        {towns.map((town) => (
          <li key={town.id}>{town.name}</li>
        ))}
      </ul>
      <ul>
        {dungeons.map((dungeon) => (
          <li key={dungeon.id}>{dungeon.name}</li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
