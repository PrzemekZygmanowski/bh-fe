import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { ADD_USER } from '../graphql/ADD_USER';

import { AddUserForm } from './AddUserForm';
const addUserMock = {
  request: {
    query: ADD_USER,
    variables: {
      firstName: 'Cregan',
      lastName: 'Stark',
      email: 'Cregan@Stark.north',
      date: '20/24/0524',
    },
  },
  result: {
    data: {
      user: {
        id: 1,
        firstName: 'Cregan',
        lastName: 'Stark',
        email: 'Cregan@Stark.north',
        date: '20/24/0524',
      },
    },
  },
};

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
  test('Submit button should be in the document', () => {
    render(<AddUserForm />);
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).toBeInTheDocument();
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
  test('after completing the form with correct data and pressing the submit button, the form should be submit', async () => {
    const addUser = jest.fn();
    jest.useFakeTimers().setSystemTime(new Date('2025-05-14'));
    render(
      <MockedProvider mocks={[addUserMock]} addTypename={false}>
        <AddUserForm addUser={addUser} />
      </MockedProvider>
    );
    const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
    const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const dateInput = screen.getByRole('textbox', { name: /date/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    const currentDate = '05/15/2025';
    userEvent.type(firstNameInput, 'Cregan');
    userEvent.type(lastNameInput, 'Stark');
    userEvent.type(emailInput, 'Cregan@Stark.north');
    userEvent.type(dateInput, currentDate);
    userEvent.click(submitBtn);
    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith({
        variables: {
          firstName: 'Cregan',
          lastName: 'Stark',
          email: 'Cregan@Stark.north',
          date: currentDate,
        },
      });
    });
  });
  test('should get an error message when try to submit the form with an empty first name field', async () => {
    const addUser = jest.fn();
    render(
      <MockedProvider mocks={[addUserMock]} addTypename={false}>
        <AddUserForm addUser={addUser} />
      </MockedProvider>
    );
    const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    userEvent.type(firstNameInput, '');
    userEvent.click(submitBtn);
    await waitFor(() => {
      const emailErrorMsg = screen.getByText(/first name is required/i);
      expect(emailErrorMsg).toBeInTheDocument();
    });
  });
  test('should get an error message when try to submit the form with an empty last name field', async () => {
    const addUser = jest.fn();
    render(
      <MockedProvider mocks={[addUserMock]} addTypename={false}>
        <AddUserForm addUser={addUser} />
      </MockedProvider>
    );
    const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    userEvent.type(lastNameInput, '');
    userEvent.click(submitBtn);
    await waitFor(() => {
      const emailErrorMsg = screen.getByText(/last Name is required/i);
      expect(emailErrorMsg).toBeInTheDocument();
    });
  });
  test('after enter invalid email it should return error message', async () => {
    const addUser = jest.fn();
    render(<AddUserForm addUser={addUser} />);
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    userEvent.type(emailInput, 'Winter is Coming');
    userEvent.click(submitBtn);
    await waitFor(() => {
      const emailErrorMsg = screen.getByText(/enter a valid email/i);
      expect(emailErrorMsg).toBeInTheDocument();
    });
  });
  test('should get an error message when try to submit the form with an empty email field', async () => {
    const addUser = jest.fn();
    render(
      <MockedProvider mocks={[addUserMock]} addTypename={false}>
        <AddUserForm addUser={addUser} />
      </MockedProvider>
    );
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    userEvent.type(emailInput, '');
    userEvent.click(submitBtn);
    await waitFor(() => {
      const emailErrorMsg = screen.getByText(/email is required/i);
      expect(emailErrorMsg).toBeInTheDocument();
    });
  });
  test('should get an error message when try to submit the form with with an empty date field', async () => {
    const addUser = jest.fn();
    jest.useFakeTimers().setSystemTime(new Date('2025-05-14'));
    render(
      <MockedProvider mocks={[addUserMock]} addTypename={false}>
        <AddUserForm addUser={addUser} />
      </MockedProvider>
    );
    const dateInput = screen.getByRole('textbox', { name: /date/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    userEvent.type(dateInput, null);
    userEvent.click(submitBtn);
    await waitFor(() => {
      const emailErrorMsg = screen.getByText(
        /date must be a `date` type, but the final value was: `Invalid Date`/i
      );
      expect(emailErrorMsg).toBeInTheDocument();
    });
  });
  test('should get an error message when try to submit the form with with an earlier date', async () => {
    const addUser = jest.fn();
    jest.useFakeTimers().setSystemTime(new Date('2025-05-14'));
    render(
      <MockedProvider mocks={[addUserMock]} addTypename={false}>
        <AddUserForm addUser={addUser} />
      </MockedProvider>
    );
    const dateInput = screen.getByRole('textbox', { name: /date/i });
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    userEvent.type(dateInput, '');
    userEvent.type(dateInput, '05/13/2020');
    userEvent.click(submitBtn);
    await waitFor(() => {
      const emailErrorMsg = screen.getByText(/date must be later than today/i);
      expect(emailErrorMsg).toBeInTheDocument();
    });
  });
});
