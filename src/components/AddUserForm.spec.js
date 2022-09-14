import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  act,
} from '@testing-library/react';
import { AddUserForm } from './AddUserForm';

describe('Render Component', () => {
  test('Init Form component', () => {
    render(<AddUserForm />);
    expect(screen.getByTestId('addUserForm')).toBeInTheDocument();
  });
  test('Init Form component with all inputs', () => {
    render(<AddUserForm />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });
  test('Init Form component with correct inputs', () => {
    render(<AddUserForm />);
    const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
    const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const date = screen.getByRole('textbox', { name: /date/i });
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
});

describe('Test Inputs and validations', () => {
  test('test filling inputs with correct data', () => {
    render(<AddUserForm />);
    const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
    const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const dateInput = screen.getByRole('textbox', { name: /date/i });
    fireEvent.change(firstNameInput, { target: { value: 'Cregan' } });
    fireEvent.change(lastNameInput, { target: { value: 'Stark' } });
    fireEvent.change(emailInput, { target: { value: 'Cregan@Stark.north' } });
    fireEvent.change(dateInput, { target: { value: '2024-05-24' } });
    expect(firstNameInput).toHaveValue('Cregan');
    expect(lastNameInput).toHaveValue('Stark');
    expect(emailInput).toHaveValue('Cregan@Stark.north');
    expect(dateInput).toHaveValue('20/24/0524');
  });
  test('test email validation', async () => {
    render(<AddUserForm />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'Winter is Coming' } });
    });
    const emailErrorMsg = await waitFor(() =>
      screen.findByText('Enter a valid email')
    );

    expect(emailErrorMsg).toBeInTheDocument();
  });
  test('Init Form component with correct inputs', () => {
    render(<AddUserForm />);
    const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
    const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const date = screen.getByRole('textbox', { name: /date/i });
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });
});
