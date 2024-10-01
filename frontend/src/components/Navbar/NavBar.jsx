import React from 'react';
import Tooltip from '../UI/Tooltip';
import Button from '../UI/Button';
import { towns, dungeons, mobs } from './dummyData';

const Navbar = () => {
  return (
    <nav className="bg-black-ui text-gold-ui p-4">
      <div className="flex flex-row space-x-4 justify-center">

        <div>
          <Button label="Home" onClick={() => console.log('Home clicked')} className="bg-red-ui hover:bg-red-ui-900" />
        </div>

        <div className="relative">
          <Tooltip
            text={dungeons.map((dungeon) => (
              <div key={dungeon.id} className="p-1">{dungeon.name}</div>
            ))}
          >
            <Button label="Dungeons" className="bg-red-ui hover:bg-red-ui-900" />
          </Tooltip>
        </div>

        <div className="relative">
          <Tooltip
            text={towns.map((town) => (
              <div key={town.id} className="p-1">{town.name}</div>
            ))}
          >
            <Button label="Towns" className="bg-red-ui hover:bg-red-ui-900" />
          </Tooltip>
        </div>

        <div className="relative">
          <Tooltip
            text={mobs.map((mob) => (
              <div key={mob.id} className="p-1">{mob.name}</div>
            ))}
          >
            <Button label="Mobs" className="bg-red-ui hover:bg-red-ui-900" />
          </Tooltip>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
