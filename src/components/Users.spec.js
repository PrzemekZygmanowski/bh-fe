import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { Users } from './Users';

const users = [
  {
    id: '1',
    firstName: 'Jon',
    lastName: 'Snow',
    email: 'Jon@Snow.north',
    date: '2022-09-14T18:56:47.165Z',
    __typename: 'User',
  },
  {
    id: '2',
    firstName: 'Tyrion',
    lastName: 'Lanister',
    email: 'Tyrion@Lanister.west',
    date: '2022-09-14T22:00:00.000Z',
    __typename: 'User',
  },
  {
    id: '3',
    firstName: 'Rhaenyra',
    lastName: 'Targaryen',
    email: 'Rhaenyra@Targaryen.crownland',
    date: '2022-09-16T22:00:00.000Z',
    __typename: 'User',
  },
];

describe('Render Component', () => {
  const renderWithoutData = () => render(<Users users={[]} />);
  test('Init Users component', () => {
    renderWithoutData();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
  test('Init Users component with loading spinner', () => {
    render(<Users users={[]} loading={true} />);
    expect(
      screen.getByRole('progressbar', {
        name: /loader/i,
      })
    ).toBeInTheDocument();
  });
  test('Init Users component with error', () => {
    render(<Users users={[]} error={true} />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
  test('Data Grid should have proper columns', () => {
    renderWithoutData();

    const firstNameHeader = screen.getByRole('columnheader', {
      name: /first name/i,
    });
    const lastNameHeader = screen.getByRole('columnheader', {
      name: /last name/i,
    });
    const emailNameHeader = screen.getByRole('columnheader', {
      name: /email/i,
    });
    expect(firstNameHeader).toBeInTheDocument();
    expect(lastNameHeader).toBeInTheDocument();
    expect(emailNameHeader).toBeInTheDocument();
  });
});

describe('Render Component with mocked data', () => {
  const renderWithData = () => render(<Users users={users} />);
  test('Init Users component with mocked data', () => {
    renderWithData();
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);
  });
  test('check if random cell from mocked data is in the document', () => {
    renderWithData();
    expect(
      screen.getByRole('cell', {
        name: /jon@snow\.north/i,
      })
    ).toBeInTheDocument();
  });
  test('check if all mocked data are in the document', () => {
    renderWithData();
    const firstRow = screen.getByRole('row', {
      name: /jon snow jon@snow\.north/i,
    });
    const secondRow = screen.getByRole('row', {
      name: /tyrion lanister tyrion@lanister\.west/i,
    });
    const thirdRow = screen.getByRole('row', {
      name: /rhaenyra targaryen rhaenyra@targaryen\.crownland/i,
    });
    expect(firstRow).toBeInTheDocument();
    expect(secondRow).toBeInTheDocument();
    expect(thirdRow).toBeInTheDocument();
  });
  //   test('test delete row functionality', async () => {
  //     renderWithData();
  //     const row = await waitFor(() =>
  //       screen.findAllByRole('row', {
  //         name: /jon snow jon@snow\.north/i,
  //       })
  //     );
  //     console.log(row);
  //     fireEvent.click(within(row).getByRole('button', { name: /delete/i }));
  //     await waitFor(() => {
  //       expect(row).not.toBeInTheDocument();
  //     });
  //   });

  //   //     const row = screen.getByRole('row', {  name: /jon snow jon@snow\.north 2022\-09\-14t18:56:47\.165z delete/i});within(row).getByRole('button', {  name: /delete/i});
  //   //     const firstRow = await waitFor(() =>
  //   //     screen.findByRole('row', {
  //   //       name: /jon snow jon@snow\.north 2022\-09\-14t18:56:47\.165z delete/i,
  //   //     })
  //   //   );
});
