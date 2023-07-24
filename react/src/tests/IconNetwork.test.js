import { render, screen, fireEvent } from '@testing-library/react';
import IconNetwork from '../components/IconNetwork';
import '@testing-library/jest-dom/extend-expect';

describe('Tests IconNetwork component', () => {
    test('Check the compoment button', () => {
        render(<IconNetwork image="picture.png" label="Label" addLink={jest.fn()} removeLink={jest.fn()} />);
        const component = screen.getByRole('button');
        expect(component).toBeInTheDocument();
    });

    test('Check if the image and "alt" attribute are rendered correctly', () => {
        render(<IconNetwork image="picture.png" label="Label" addLink={jest.fn()} removeLink={jest.fn()} />);
        const imageElement = screen.getByAltText('Click here');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'picture.png');
    });

    test('Check the calls addLink or removeLink function', () => {
        const addLinkMock = jest.fn();
        const removeLinkMock = jest.fn();
        render(<IconNetwork image="picture.png" label="Label" addLink={addLinkMock} removeLink={removeLinkMock} />);
        const buttonElement = screen.getByRole('button');

        // Click on the button when "open" is false
        fireEvent.click(buttonElement);
        expect(addLinkMock).toHaveBeenCalledTimes(1);
        expect(removeLinkMock).not.toHaveBeenCalled();

        // Click on the button when "open" is true
        fireEvent.click(buttonElement);
        expect(removeLinkMock).toHaveBeenCalledTimes(1);
        expect(addLinkMock).toHaveBeenCalledTimes(1);
    });

});
