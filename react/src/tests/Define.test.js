import React from 'react';
import { render, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Define from '../blocs/Define';

describe('Define component tests', () => {

    test('Check colorPrimary state (update) and call handleChange', () => {
        const handleChange = jest.fn();
        const { getByTestId } = render(<Define handleChange={handleChange} />);
        const primaryColorInput = getByTestId('primary-color-input');
        const newColor = '#ff0000';

        fireEvent.change(primaryColorInput, { target: { value: newColor } });

        expect(primaryColorInput.value).toBe(newColor);
        expect(handleChange).toHaveBeenCalledWith(
            expect.objectContaining({ 
                target: { 
                    value: newColor,
                    name:'primarycolor',
                },
            })
        );
    });

    test('Check colorSecondary state (update) and call handleChange', () => {
        const handleChange = jest.fn();
        const { getByTestId } = render(<Define handleChange={handleChange} />);
        const secondaryColorInput = getByTestId('secondary-color-input');
        const newColor = '#00ff00';
    
        fireEvent.change(secondaryColorInput, { target: { value: newColor } });
    
        expect(secondaryColorInput.value).toBe(newColor);
        expect(handleChange).toHaveBeenCalledWith(
            expect.objectContaining({
                target: {
                    value: newColor,
                    name: 'secondarycolor',
                },
            })
        );
    });
  

    test('Check the error message for invalid colorPrimary', () => {
        const { getByTestId, getByText } = render(<Define handleChange={() => {}} />);
        const primaryColorInput = getByTestId('primary-color-input');
        const invalidColor = 'Invalid';

        fireEvent.change(primaryColorInput, { target: { value: invalidColor } });
        const errorMessage = getByText('Invalid color format');

        expect(errorMessage).toBeInTheDocument();
    });

    test('Check the error message for invalid colorSecondary', () => {
        const { getByTestId, getByText } = render(<Define handleChange={() => {}} />);
        const secondaryColorInput = getByTestId('secondary-color-input');
        const invalidColor = 'Invalid';

        fireEvent.change(secondaryColorInput, { target: { value: invalidColor } });
        const errorMessage = getByText('Invalid color format');
        
        expect(errorMessage).toBeInTheDocument();
    });

    test('Check the background picture state and call handleChange', () => {
        const handleChange = jest.fn();
        const { getByTestId } = render(<Define handleChange={handleChange} />);
        const backgroundPictureInput = getByTestId('background-picture-input');
        const file = new File([''], 'background.png', { type: 'image/png' });

        fireEvent.change(backgroundPictureInput, { target: { files: [file] } });

        expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
            target: { name: 'fileLinkBackground', value:null },
        })
        );
    });

    test('Check the background picture and no error message for valid file', () => {
        const { getByTestId, queryByText } = render(<Define handleChange={() => {}} />);
        const backgroundPictureInput = getByTestId('background-picture-input');
        const file = new File([''], 'background.png', { type: 'image/png' });

        fireEvent.change(backgroundPictureInput, { target: { files: [file] } });

        expect(backgroundPictureInput).toBeInTheDocument();
        expect(queryByText('Invalid format: not a PNG file')).toBeNull();
    });

    test('Check the error message for invalid background picture format', () => {
        const { getByTestId, queryByText } = render(<Define handleChange={() => {}} />);
        const backgroundPictureInput = getByTestId('background-picture-input');
        const file = new File([''], 'profile.txt', { type: 'image/txt', size: 6000000 });
    
        fireEvent.change(backgroundPictureInput, { target: { files: [file] } });

        waitFor(() => {
            const errorMessage = queryByText('Invalid format: not a TXT file');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test('Check the error message for invalid background picture size', () => {
        const { getByTestId, getByText } = render(<Define handleChange={() => {}} />);
        const backgroundPictureInput = getByTestId('background-picture-input');
        const file = new File([''], 'background.png', { type: 'image/png', size: 1000 });
    
        fireEvent.change(backgroundPictureInput, { target: { files: [file] } });
        const errorMessage = getByText('Invalid size (min 0.5 MB)');
        
        expect(errorMessage).toBeInTheDocument();
    });

    test('Check the profile picture state and call handleChange', () => {
        const handleChange = jest.fn();
        const { getByTestId } = render(<Define handleChange={handleChange} />);
        const profilePictureInput = getByTestId('profile-picture-input');
        const file = new File([''], 'profile.png', { type: 'image/png', size: 600000 });

        fireEvent.change(profilePictureInput, { target: { files: [file] } });

        expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
            target: { name: 'fileLinkProfile', value:null },
        })
        );
    });

    test('Check the profile picture and no error message for valid file', () => {
        const { getByTestId, queryByText } = render(<Define handleChange={() => {}} />);
        const profilePictureInput = getByTestId('profile-picture-input');
        const file = new File([''], 'profile.png', { type: 'image/png', size: 600000});

        fireEvent.change(profilePictureInput, { target: { files: [file] } });

        expect(profilePictureInput).toBeInTheDocument();
        expect(queryByText('Invalid format: not a PNG file')).toBeNull();
    });

    test('Check the error message for invalid profile picture format', () => {
        const { getByTestId, queryByText } = render(<Define handleChange={() => {}} />);
        const profilePictureInput = getByTestId('profile-picture-input');
        const file = new File([''], 'profile.txt', { type: 'image/txt', size: 600000 });
    
        fireEvent.change(profilePictureInput, { target: { files: [file] } });

        waitFor(() => {
            const errorMessage = queryByText('Invalid format: not a TXT file');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test('Check the error message for invalid profile picture size', () => {
        const { getByTestId, getByText } = render(<Define handleChange={() => {}} />);
        const profilePictureInput = getByTestId('profile-picture-input');
        const file = new File([''], 'profile.png', { type: 'image/png', size: 1000 });
    
        fireEvent.change(profilePictureInput, { target: { files: [file] } });
        const errorMessage = getByText('Invalid size (min 0.5 MB)');

        expect(errorMessage).toBeInTheDocument();
    });
  
});
