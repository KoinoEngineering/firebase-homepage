import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    const target = render(<App />);
    expect(target).toMatchSnapshot();
});
