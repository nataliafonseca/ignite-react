import { render } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('Active Link component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>,
    );

    expect(getByText('Home')).toBeInTheDocument();
  });

  it('correctly adds active class', () => {
    const { getByText } = render(
      <>
        <ActiveLink href="/" activeClassName="active">
          <a>Home</a>
        </ActiveLink>
        <ActiveLink href="/dashboard" activeClassName="active">
          <a>Dashboard</a>
        </ActiveLink>
      </>,
    );

    expect(getByText('Home')).toHaveClass('active');
    expect(getByText('Dashboard')).not.toHaveClass('active');
  });
});
