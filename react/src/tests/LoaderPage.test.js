import React from 'react';
import { render, fireEvent, getByAltText } from '@testing-library/react';
import LoaderPage from '../blocs/LoaderPage';
import '@testing-library/jest-dom/extend-expect';

describe('Test LoaderPage bloc', () => {
    const handleChange = jest.fn();

    test('Check the valid file selection and handleChange function', () => {
        const { getByTestId } = render(<LoaderPage handleChange={handleChange} />);
        const file = new File(['exampleFile'], 'example.png', { type: 'image/png' });
        const input = getByTestId('loader-page-input');

        fireEvent.change(input, { target: { files: [file] } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith({
            target: {  
                name: 'fileLinkLoader', 
                value: null, 
            },
        });
    });

    test('Check the error message is displayed for an invalid file format', () => {
        const { getByTestId, queryByText } = render(<LoaderPage handleChange={handleChange} />);
        const file = new File(['exampleFile'], 'example.txt', { type: 'text/plain', size: '600000' });
        const input = getByTestId('loader-page-input');

        fireEvent.change(input, { target: { files: [file] } });

        const errorMessage = queryByText((content, element) => {
            return element.tagName.toLowerCase() === 'p' 
            && content.includes('Invalid format: not a TXT file');
        });
        expect(errorMessage).toBeInTheDocument();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith({ 
            target: { 
                name: 'fileLinkLoader', 
                value: null 
            } 
        });
    });

    test('Check the error message is displayed for an invalid file size', () => {
        const { getByTestId, getByText } = render(<LoaderPage handleChange={handleChange} />);
        const file = new File(['exampleFile'], 'example.png', { type: 'image/png', size: '10'});
        const input = getByTestId('loader-page-input');

        fireEvent.change(input, { target: { files: [file] } });

        expect(getByText('Invalid size (min 0.5 MB)')).toBeInTheDocument();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith({ 
            target: { 
                name: 'fileLinkLoader', 
                value: null 
            } 
        });
    });

    test('Check the clear error message and file link when a valid file is selected after an error', () => {
        const { getByTestId, queryByText } = render(<LoaderPage handleChange={handleChange} />);
        const invalidFile = new File(['invalidFile'], 'invalidFile.txt', { type: 'text/plain',  size: '10'});
        const validFile = new File(['exampleFile'], 'example.png', { type: 'image/png', size: '600000' });
        const input = getByTestId('loader-page-input');

        fireEvent.change(input, { target: { files: [invalidFile] } });
        fireEvent.change(input, { target: { files: [validFile] } });

        expect(queryByText('Invalid format: not a TXT file')).toBeNull();
        expect(queryByText(' Invalid size (min 0.5 MB)')).toBeNull();
        expect(handleChange).toHaveBeenCalledTimes(2);
        expect(handleChange).toHaveBeenCalledWith({
            target: { 
                name: 'fileLinkLoader', 
                value: null, 
            },
        });
    });
});
