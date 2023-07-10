import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import Download from '../blocs/Download';
import '@testing-library/jest-dom/extend-expect';

describe('Test Download bloc', () => {
    const handleChange = jest.fn();

    test('Check handleChange function with the correct value when a file is selected', () => {
        const { getByTestId } = render(<Download handleChange={handleChange} />);
        const fileInput = getByTestId('download-picture-input');
        const file = new File(['exampleFile'], 'example.png', { type: 'image/png' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith({
        target: expect.objectContaining({ name: 'fileLinkDownload', value: null }),
        });
    });
    
    test('Check the remove button is not present (invalid file)', () => {
        const { getByTestId, queryByTestId } = render(<Download handleChange={handleChange} />);
        const fileInput = getByTestId('download-picture-input');
        const removeButton = queryByTestId('remove-picture-input');
    
        const file = new File(['exampleFile'], 'example.txt', { type: 'text/plain' });
    
        fireEvent.change(fileInput, { target: { files: [file] } });
    
        expect(removeButton).not.toBeInTheDocument();
    });

    test('Check the error message is displayed for an invalid file format', () => {
        const { getByTestId, queryByText } = render(<Download handleChange={handleChange} />);
        const fileInput = getByTestId('download-picture-input');
        const file = new File(['invalidFormat'], 'example.txt', { type: 'text/plain', size: '600000' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        const errorMessage = queryByText((content, element) => {
            return element.tagName.toLowerCase() === 'p' 
            && content.includes('Invalid format: not a TXT file');
        });

        expect(errorMessage).toBeInTheDocument();
    });

    test('Check the error message is displayed for an invalid file size', () => {
        const { getByTestId, getByText } = render(<Download handleChange={handleChange} />);
        const fileInput = getByTestId('download-picture-input');
        const file = new File(['invalidSize'], 'example.png', { type: 'image/png', size: 100 });

        fireEvent.change(fileInput, { target: { files: [file] } });
        const errorMessage = getByText('Invalid size (min 0.5 MB)');

        expect(errorMessage).toBeInTheDocument();
    });
});