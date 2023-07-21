import React from 'react';
import { render, fireEvent, waitFor} from '@testing-library/react';
import Links from '../blocs/Links';
import '@testing-library/jest-dom/extend-expect';

describe('Test Links bloc', () => {

    test('Check the error message is not displayed for a valid URL', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText, queryByText } = render(<Links handleChange={handleChange} />);
        const input = getByPlaceholderText('www.mywebsite.com');

        fireEvent.change(input, { target: { value: 'www.example.com' } });
        fireEvent.blur(input);

        expect(queryByText('URL is invalid. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io')).toBeNull();
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


    test('Check for invalid format in site_name', async () => {
        const handleChange = jest.fn();
        const { getByTestId, queryByText } = render(<Links handleChange={handleChange} />);
        const siteNameInput = getByTestId('site-name-input');

        // Test invalid format for site_name (contains a number)
        fireEvent.change(siteNameInput, { target: { value: 'My Website 123' } });
        fireEvent.blur(siteNameInput);

        waitFor(() => {
            const errorMessageNameFormat = 'Site name should not contain numbers';
            expect(queryByText(errorMessageNameFormat)).toBeInTheDocument();
        });

        // Test valid format for site_name
        fireEvent.change(siteNameInput, { target: { value: 'My Website' } });
        fireEvent.blur(siteNameInput);

        await waitFor(() => {
            const errorMessageNameFormat = 'Site name should not contain numbers';
            expect(queryByText(errorMessageNameFormat)).not.toBeInTheDocument();
        });
    });

    test('Check for invalid format in site_url', async () => {
        const handleChange = jest.fn();
        const { getByTestId, queryByText } = render(<Links handleChange={handleChange} />);
        const siteUrlInput = getByTestId('site-url-input');
      
        // Test invalid format for site_url (invalid URL)
        fireEvent.change(siteUrlInput, { target: { value: 'invalidurl' } });
        fireEvent.blur(siteUrlInput);
      
        waitFor(() => {
          const errorMessageUrlFormat = 'Invalid URL. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io';
          expect(queryByText(errorMessageUrlFormat)).toBeInTheDocument();
        });
        
        // Test valid format for site_url
        fireEvent.change(siteUrlInput, { target: { value: 'www.example.com' } });
        fireEvent.blur(siteUrlInput);
      
        await waitFor(() => {
          const errorMessageUrlFormat = 'Invalid URL. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io';
          expect(queryByText(errorMessageUrlFormat)).not.toBeInTheDocument();
        });
      });

      test('Check if site_name does not exceed 255 characters', async () => {
        const handleChange = jest.fn();
        const { getByTestId, queryByText } = render(<Links handleChange={handleChange} />);
        const siteNameInput = getByTestId('site-name-input');
      
        // Test valid format for site_name (less than 255 characters)
        fireEvent.change(siteNameInput, { target: { value: 'My Website' } });
        fireEvent.blur(siteNameInput);
      
        waitFor(() => {
          const errorMessageNameFormat = 'Site name should not exceed 255 characters';
          expect(queryByText(errorMessageNameFormat)).not.toBeInTheDocument();
        });
      
        // Test invalid format for site_name (exceeds 255 characters)
        fireEvent.change(siteNameInput, { target: { value: 'a'.repeat(256) } });
        fireEvent.blur(siteNameInput);
      
        waitFor(() => {
          const errorMessageNameFormat = 'Site name should not exceed 255 characters';
          expect(queryByText(errorMessageNameFormat)).toBeInTheDocument();
        });
      });

      test('Check if site_url does not exceed 255 characters', async () => {
        const handleChange = jest.fn();
        const { getByTestId, queryByText } = render(<Links handleChange={handleChange} />);
        const siteUrlInput = getByTestId('site-url-input');
      
        // Test valid format for site_url (less than 255 characters)
        fireEvent.change(siteUrlInput, { target: { value: 'www.mywebsite.com' } });
        fireEvent.blur(siteUrlInput);

        waitFor(() => {
          const errorMessageUrlFormat = 'URL should not exceed 255 characters';
          expect(queryByText(errorMessageUrlFormat)).not.toBeInTheDocument();
        });
      
        // Test invalid format for site_url (exceeds 255 characters)
        fireEvent.change(siteUrlInput, { target: { value: 'a'.repeat(256) } });
        fireEvent.blur(siteUrlInput);
      
        waitFor(() => {
          const errorMessageUrlFormat = 'URL should not exceed 255 characters';
          expect(queryByText(errorMessageUrlFormat)).toBeInTheDocument();
        });
      });
    
      
});
