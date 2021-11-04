import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from '.';

describe('Async Component Example', () => {
  it('button 1 shows on screen', async () => {
    render(<Async />);

    screen.logTestingPlaygroundURL();

    expect(screen.getByText('Hello World')).toBeInTheDocument();

    // expect(await screen.findByText('Button 1')).toBeInTheDocument();
    await waitFor(() => {
      return expect(screen.getByText('Button 1')).toBeInTheDocument();
    });
  });

  it('button 2 disappears from screen', async () => {
    render(<Async />);

    // await waitFor(() => {
    //   return expect(screen.queryByText('Button 2')).not.toBeInTheDocument();
    // });
    await waitForElementToBeRemoved(screen.queryByText('Button 2'));
  });
});
