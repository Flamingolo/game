import React from 'react';
import Tooltip from '../UI/Tooltip';
import Button from '../UI/Button';
import { towns, dungeons, mobs } from './dummyData';

const Navbar = () => {
  return (
    <nav className="navbar">  {/* Define navbar styles in separate CSS */}
      <div className="navbar-container">
        
        {/* Home Button */}
        <div>
          <Button label="Home" onClick={() => console.log('Home clicked')} />
        </div>

        {/* Dungeons Tooltip */}
        <div className="tooltip-wrapper">
          <Tooltip
            text={dungeons.map((dungeon) => (
              <div key={dungeon.id}>{dungeon.name}</div>
            ))}
          >
            <Button label="Dungeons" />
          </Tooltip>
        </div>

        {/* Towns Tooltip */}
        <div className="tooltip-wrapper">
          <Tooltip
            text={towns.map((town) => (
              <div key={town.id}>{town.name}</div>
            ))}
          >
            <Button label="Towns" />
          </Tooltip>
        </div>

        {/* Mobs Tooltip */}
        <div className="tooltip-wrapper">
          <Tooltip
            text={mobs.map((mob) => (
              <div key={mob.id}>{mob.name}</div>
            ))}
          >
            <Button label="Mobs" />
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
