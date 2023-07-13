import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Links from '../blocs/Links';
import '@testing-library/jest-dom/extend-expect';

describe('Test Links bloc', () => {

    test ('Check the error message is not displayed for a valid URL', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText, queryByText } = render(<Links handleChange={handleChange} />);
        const input = getByPlaceholderText('www.mywebsite.com');

        fireEvent.change(input, { target: { value: 'www.example.com' } });
        fireEvent.blur(input);

        expect(queryByText('URL is invalid. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io')).toBeNull();
    });

    test('Check the error message is displayed for an invalid URL', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText, getByText } = render(<Links handleChange={handleChange} />);
        const input = getByPlaceholderText('www.mywebsite.com');
    
        fireEvent.change(input, { target: { value: 'InvalidURL' } });
        fireEvent.blur(input);
    
        expect(getByText('URL is invalid. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io')).toBeInTheDocument();
    });

    test('Check the handleChange function when "site_name" input value changes', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = render(<Links handleChange={handleChange} />);
        const input = getByPlaceholderText('My Website');

        fireEvent.change(input, { target: { value: 'My New Website' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
        expect(handleChange.mock.calls[0][0].target.name).toBe('site_name');
        expect(handleChange.mock.calls[0][0].target.value).toBe('My New Website');
    });

    test('check the handleChange when "site_url" input value changes', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = render(<Links handleChange={handleChange} />);
        const input = getByPlaceholderText('www.mywebsite.com');

        fireEvent.change(input, { target: { value: 'www.example.com' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
        expect(handleChange.mock.calls[0][0].target.name).toBe('site_url');
        expect(handleChange.mock.calls[0][0].target.value).toBe('www.example.com');
    });
});
