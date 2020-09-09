import React from 'react';
import { render, screen } from '@testing-library/react';

import Layout from './Layout';

describe('Layout', () => {
  it('should render without errors', async () => {
    const { container } = render(
      <Layout>
        <p>Hello World</p>
      </Layout>
    );

    expect(container).toHaveTextContent('TODO APP');
    expect(container).toHaveTextContent('Hello World');
  });
});
