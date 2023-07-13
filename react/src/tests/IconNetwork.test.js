import { render, screen, fireEvent } from '@testing-library/react';
import InconNetwork from '../components/IconNetwork';
import '@testing-library/jest-dom/extend-expect';

describe('Test IconNetwork component', () => {

    test('Check the compoment button', () => {
        render(<InconNetwork image="picture.png" label="Label" />);
        const component = screen.getByRole('button');
        expect(component).toBeInTheDocument();
    });

    test('Check the component form when button is clicked', () => {
        render(<InconNetwork image="picture.png" label="Label" />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const form = screen.getByPlaceholderText('Label');
        expect(form).toBeInTheDocument();
    });

    test('Check the form is submitted correctly', () => {
        const handleChange = jest.fn();
        render(<InconNetwork image="picture.png" label="Label" handleChange={handleChange} />);
      
        const button = screen.getByRole('button');
        fireEvent.click(button);
      
        const form = screen.getByPlaceholderText('Label');
        fireEvent.change(form, { target: { value: 'https://example.com' } });
      
        fireEvent.submit(form);
      
        expect(screen.queryByPlaceholderText('Label')).toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: 'name' })).not.toBeInTheDocument();
      });
      
});