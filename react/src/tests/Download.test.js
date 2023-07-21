import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { queryByTestId } from '@testing-library/dom';
import Download from '../blocs/Download';
import '@testing-library/jest-dom/extend-expect';


describe('Download component tests', () => {
    const handleChange = jest.fn();

    afterEach(() => {
        handleChange.mockClear();
    });

    test('Check initial display', () => {
        const { getByText, getByAltText, getByTestId, queryByTestId } = render(<Download handleChange={handleChange} />);
        expect(getByText('Download Picture')).toBeInTheDocument();
        expect(getByAltText('Plus-logo')).toBeInTheDocument();
        expect(getByTestId('Download-picture-input')).toBeInTheDocument();
        expect(queryByTestId('remove-picture-input')).toBeNull();
    });

    test('Check selecting an invalid file', () => {
        const { getByTestId, queryByTestId, getByText } = render(<Download handleChange={handleChange} />);
        const fileInput = getByTestId('Download-picture-input');
        const file = new File(['invalidFormat'], 'example.txt', { type: 'text/plain', size: 600000 });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(queryByTestId('remove-picture-input')).toBeNull();
        expect(getByText(/Invalid format: not a TXT file/)).toBeInTheDocument();
    });

    test('Check selecting an invalid size (less than 0.5 MB)', () => {
        const { getByTestId, getByText, queryByTestId } = render(<Download handleChange={handleChange} />);
        const fileInput = getByTestId('Download-picture-input');
        const file = new File(['invalidSize'], 'example.png', { type: 'image/png', size: 100 });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(queryByTestId('remove-picture-input')).toBeNull();
        expect(getByText('Invalid size (min 0.5 MB)')).toBeInTheDocument();
    });

});
