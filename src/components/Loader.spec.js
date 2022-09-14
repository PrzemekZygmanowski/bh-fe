import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

test('renders Loader component', () => {
  render(<Loader />);
  expect(
    screen.getByRole('progressbar', {
      name: /loader/i,
    })
  ).toBeInTheDocument();
});
