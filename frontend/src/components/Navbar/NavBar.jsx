import React, { useEffect, useState } from "react";
import { getTowns } from "../../services/getTowns";

const NavBar = () => {
    const [dropdown, setDropdown] = useState(false);
    const [towns, setTowns] = useState([]);

    useEffect(() => {
        const fetchTowns = async () => {
            try {
                const data = await getTowns();
                setTowns(data);
            } catch (error) {
                console.error('Failed to fetch towns: ', error);
            }
        };

        fetchTowns();
    }, []);


    return (
        <nav className="navbar">
          <ul className="navbar-list">
            <li><a href="/">Home</a></li>
            <li 
              onMouseEnter={() => setDropdown(true)} 
              onMouseLeave={() => setDropdown(false)}
            >
              Towns
              {dropdown && (
                <ul className="dropdown">
                  {towns.map(town => (
                    <li key={town.id}><a href={`/town/${town.id}`}>{town.name}</a></li>
                  ))}
                </ul>
              )}
            </li>
            <li><a href="/dungeon">Dungeons</a></li>
            <li><a href="/inventory">Inventory</a></li>
          </ul>
        </nav>
      );

}