import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Item from '../components/Items and Inventory/Item';
import ItemDetailModal from '../components/Items and Inventory/ItemDetailModal';
import ItemList from '../components/Items and Inventory/ItemList';

describe('Item Component', () => {
  test('renders Item component', () => {
    const item = { id: 1, name: 'Sword', value: 100 };
    render(<Item item={item} />);
    const itemElement = screen.getByTestId('item');
    expect(itemElement).toBeInTheDocument();
  });

  test('displays item name and value', () => {
    const item = { id: 1, name: 'Sword', value: 100 };
    render(<Item item={item} />);
    const itemNameElement = screen.getByText(item.name);
    const itemValueElement = screen.getByText(`Value: ${item.value}`);
    expect(itemNameElement).toBeInTheDocument();
    expect(itemValueElement).toBeInTheDocument();
  });
});

describe('ItemDetailModal Component', () => {
  test('renders ItemDetailModal component', () => {
    const item = { id: 1, name: 'Sword', value: 100, description: 'A sharp blade' };
    render(<ItemDetailModal item={item} />);
    const itemDetailModalElement = screen.getByTestId('item-detail-modal');
    expect(itemDetailModalElement).toBeInTheDocument();
  });

  test('displays item details', () => {
    const item = { id: 1, name: 'Sword', value: 100, description: 'A sharp blade' };
    render(<ItemDetailModal item={item} />);
    const itemNameElement = screen.getByText(item.name);
    const itemValueElement = screen.getByText(`Value: ${item.value}`);
    const itemDescriptionElement = screen.getByText(item.description);
    expect(itemNameElement).toBeInTheDocument();
    expect(itemValueElement).toBeInTheDocument();
    expect(itemDescriptionElement).toBeInTheDocument();
  });
});

describe('ItemList Component', () => {
  test('renders ItemList component', () => {
    render(<ItemList />);
    const itemListElement = screen.getByTestId('item-list');
    expect(itemListElement).toBeInTheDocument();
  });

  test('displays a list of items', () => {
    const items = [
      { id: 1, name: 'Sword', value: 100 },
      { id: 2, name: 'Shield', value: 150 },
    ];
    render(<ItemList items={items} />);
    const itemElements = screen.getAllByTestId('item');
    expect(itemElements.length).toBe(items.length);
  });
});
