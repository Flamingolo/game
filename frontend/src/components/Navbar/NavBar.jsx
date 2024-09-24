import React from 'react';
import Tooltip from '../UI/Tooltip';
import Button from '../UI/Button';
import { towns, dungeons, mobs } from './dummyData';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex flex-row justify-center space-x-4">
        
        <div>
          <Button label="Home" onClick={() => console.log('Home clicked')} className="bg-blue-500 hover:bg-blue-600" />
        </div>

        <div className="relative">
          <Tooltip
            text={dungeons.map((dungeon) => (
              <div key={dungeon.id} className="p-1">{dungeon.name}</div>
            ))}
          >
            <Button label="Dungeons" className="bg-purple-500 hover:bg-purple-600" />
          </Tooltip>
        </div>

        <div className="relative">
          <Tooltip
            text={towns.map((town) => (
              <div key={town.id} className="p-1">{town.name}</div>
            ))}
          >
            <Button label="Towns" className="bg-green-500 hover:bg-green-600" />
          </Tooltip>
        </div>

        <div className="relative">
          <Tooltip
            text={mobs.map((mob) => (
              <div key={mob.id} className="p-1">{mob.name}</div>
            ))}
          >
            <Button label="Mobs" className="bg-red-500 hover:bg-red-600" />
          </Tooltip>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
