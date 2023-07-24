import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SocialNetwork from '../blocs/SocialNetwork';
import '@testing-library/jest-dom/extend-expect';


describe('Tests SocialNetwok bloc', () => {

    test('Check the collapse is initially hidden', async () => {
        const { queryByTestId } = render(<SocialNetwork handleChange={() => { }} />);
        const facebookButton = screen.getByTestId('facebook');
        expect(facebookButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('Check the collapse is open when clicked', async () => {
        render(<SocialNetwork handleChange={() => { }} />);
        const facebookButton = screen.getByTestId('facebook');

        fireEvent.click(facebookButton);

        expect(facebookButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('check once opened, the collapse closes when you click on it again', async () => {
        render(<SocialNetwork handleChange={() => { }} />);
        const facebookButton = screen.getByTestId('facebook');

        fireEvent.click(facebookButton);

        expect(facebookButton).toHaveAttribute('aria-expanded', 'true');
        fireEvent.click(facebookButton);
        expect(facebookButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('Check the addition of a link', () => {
        const handleChange = jest.fn();
        render(<SocialNetwork handleChange={handleChange} />);
        const facebookInput = screen.getByTestId('facebook');

        fireEvent.change(facebookInput, { target: { value: 'www.facebook.com/myprofile' } });

        expect(facebookInput.value).toBe('www.facebook.com/myprofile');
    });

});