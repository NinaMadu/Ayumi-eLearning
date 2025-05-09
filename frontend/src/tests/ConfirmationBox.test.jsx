import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationBox from '../components/ConfirmationBox';
import '@testing-library/jest-dom';

describe('ConfirmationBox', () => {
  const mockTitle = 'Delete Item';
  const mockMessage = 'Are you sure you want to delete this item?';

  test('renders title and message correctly', () => {
    render(
      <ConfirmationBox
        title={mockTitle}
        message={mockMessage}
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockMessage)).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onConfirm when Confirm button is clicked', () => {
    const onConfirm = vi.fn();

    render(
      <ConfirmationBox
        title={mockTitle}
        message={mockMessage}
        onConfirm={onConfirm}
        onCancel={() => {}}
      />
    );

    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  test('calls onCancel when Cancel button is clicked', () => {
    const onCancel = vi.fn();

    render(
      <ConfirmationBox
        title={mockTitle}
        message={mockMessage}
        onConfirm={() => {}}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
