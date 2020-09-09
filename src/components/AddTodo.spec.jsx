import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import AddTodo from './AddTodo';

describe('AddTodo', () => {
  it('should render without errors', async () => {
    render(<AddTodo />);

    const field = await screen.findByPlaceholderText('Add Todo here');
    const button = await screen.findByTestId('add-todo-button');

    expect(field).toHaveValue('');
    expect(button).toHaveTextContent('Add');
  });

  it('should accept input without errors', async () => {
    render(<AddTodo inputValue="add test data" />);

    const field = await screen.findByPlaceholderText('Add Todo here');
    const button = await screen.findByTestId('add-todo-button');

    expect(field).toHaveValue('add test data');
    expect(button).toHaveTextContent('Add');
  });

  it('should trigger text change', async () => {
    let called = 0;
    const handleInputChange = () => {
      called++;
    };

    render(<AddTodo onInputChange={handleInputChange} />);

    const field = await screen.findByPlaceholderText('Add Todo here');

    fireEvent.change(field, {
      target: { value: 'a' },
    });

    fireEvent.change(field, {
      target: { value: 'ab' },
    });

    fireEvent.change(field, {
      target: { value: 'abc' },
    });

    expect(called).toEqual(3);
    expect(field).toHaveValue('abc');
  });

  it('should accept input without errors', async () => {
    let called = 0;
    const handleButtonClick = () => {
      called++;
    };

    render(<AddTodo onButtonClick={handleButtonClick} />);

    const button = await screen.findByTestId('add-todo-button');

    fireEvent.click(button);

    expect(called).toEqual(1);
  });
});
