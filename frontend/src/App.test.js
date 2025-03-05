import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { taskApi } from './services/api';

// Mock the API calls
jest.mock('./services/api');

describe('App Component', () => {
  const mockTodos = [
    { _id: '1', title: 'Test Todo 1', completed: false },
    { _id: '2', title: 'Test Todo 2', completed: true },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Mock the getAll API call
    taskApi.getAll.mockResolvedValue({ data: mockTodos });
  });

  test('renders todo list application', async () => {
    render(<App />);
    
    // Check for main heading
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
    
    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    });
  });

  test('adds a new todo', async () => {
    const newTodo = { _id: '3', title: 'New Todo', completed: false };
    taskApi.create.mockResolvedValue({ data: newTodo });

    render(<App />);
    
    // Wait for initial todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    // Get the input and button
    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByText('Add');

    // Type in the input
    await userEvent.type(input, 'New Todo');
    
    // Submit the form
    fireEvent.click(addButton);

    // Wait for the new todo to appear
    await waitFor(() => {
      expect(screen.getByText('New Todo')).toBeInTheDocument();
    });

    // Verify API call
    expect(taskApi.create).toHaveBeenCalledWith({ title: 'New Todo' });
  });

  test('toggles todo completion', async () => {
    const updatedTodo = { ...mockTodos[0], completed: true };
    taskApi.toggleComplete.mockResolvedValue({ data: updatedTodo });

    render(<App />);
    
    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    // Find and click the toggle button for the first todo
    const toggleButton = screen.getByTestId('toggle-1');
    fireEvent.click(toggleButton);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(taskApi.toggleComplete).toHaveBeenCalledWith('1', true);
    });
  });

  test('deletes a todo', async () => {
    taskApi.delete.mockResolvedValue({ data: {} });

    render(<App />);
    
    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    // Find and click the delete button for the first todo
    const deleteButton = screen.getByTestId('delete-1');
    fireEvent.click(deleteButton);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(taskApi.delete).toHaveBeenCalledWith('1');
    });
  });

  test('shows error message when API fails', async () => {
    // Mock API failure
    taskApi.getAll.mockRejectedValue(new Error('API Error'));

    render(<App />);
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch todos. Please try again later.')).toBeInTheDocument();
    });
  });
});
