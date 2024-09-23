import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DungeonList from '../components/Dungeon/DungeonList';
import DungeonDetail from '../components/Dungeon/DungeonDetail';
import DungeonActions from '../components/Dungeon/DungeonActions';

describe('DungeonList Component', () => {
  test('renders DungeonList component', () => {
    render(<DungeonList />);
    const dungeonListElement = screen.getByTestId('dungeon-list');
    expect(dungeonListElement).toBeInTheDocument();
  });

  test('displays a list of dungeons', () => {
    const dungeons = [
      { id: 1, name: 'Dungeon 1' },
      { id: 2, name: 'Dungeon 2' },
    ];
    render(<DungeonList dungeons={dungeons} />);
    const dungeonElements = screen.getAllByTestId('dungeon-item');
    expect(dungeonElements.length).toBe(dungeons.length);
  });
});

describe('DungeonDetail Component', () => {
  test('renders DungeonDetail component', () => {
    const dungeon = { id: 1, name: 'Dungeon 1', description: 'A dark and scary place' };
    render(<DungeonDetail dungeon={dungeon} />);
    const dungeonDetailElement = screen.getByTestId('dungeon-detail');
    expect(dungeonDetailElement).toBeInTheDocument();
  });

  test('displays dungeon details', () => {
    const dungeon = { id: 1, name: 'Dungeon 1', description: 'A dark and scary place' };
    render(<DungeonDetail dungeon={dungeon} />);
    const dungeonNameElement = screen.getByText(dungeon.name);
    const dungeonDescriptionElement = screen.getByText(dungeon.description);
    expect(dungeonNameElement).toBeInTheDocument();
    expect(dungeonDescriptionElement).toBeInTheDocument();
  });
});

describe('DungeonActions Component', () => {
  test('renders DungeonActions component', () => {
    render(<DungeonActions />);
    const dungeonActionsElement = screen.getByTestId('dungeon-actions');
    expect(dungeonActionsElement).toBeInTheDocument();
  });

  test('calls onAction when action button is clicked', () => {
    const onActionMock = jest.fn();
    render(<DungeonActions onAction={onActionMock} />);
    const actionButton = screen.getByText('Perform Action');
    fireEvent.click(actionButton);
    expect(onActionMock).toHaveBeenCalled();
  });
});
