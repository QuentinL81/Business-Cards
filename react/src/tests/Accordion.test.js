import { render, screen } from '@testing-library/react';
import AccordionDisplay from '../components/Accordion';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Tests AccordionDisplay component', () => {

    test('Check the title is present', () => {
        const title = "TITRE";
        render(<AccordionDisplay title={title} />);
        
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeInTheDocument();
    });

    test('Check the children is present', () => {
        const children = "CHILDREN CONTENT";
        render(<AccordionDisplay children={children} />);
        const childrenElement = screen.getByText(children);
        expect(childrenElement).toBeInTheDocument();
    });

    test('Check overlay is present', () => {
        render(<AccordionDisplay showOverlayButton={true} overlayButtonMessage="MESSAGE" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
      
        const paragraphElement = buttonElement.querySelector('p');
        expect(paragraphElement).toBeInTheDocument();
      });

    test('Check if a message is present when the overlay is present', () => {
        const message = "MESSAGE";
        render(<AccordionDisplay showOverlayButton={true} overlayButtonMessage={message} />);
        
        const buttonElement = screen.getByRole('button');
        const paragraphElement = buttonElement.querySelector('p');
        expect(paragraphElement).toBeInTheDocument();

        userEvent.hover(paragraphElement);

        const tooltipElement = screen.getByRole('tooltip');
        expect(tooltipElement).toHaveTextContent(message);
    });

    test('Check if a message is present when the overlay is not present', () => {
        const message = "MESSAGE";
        render(<AccordionDisplay showOverlayButton={false} overlayButtonMessage={message} />);
        const buttonElement = screen.getAllByRole('button');
        expect(buttonElement.length).toBe(1);

        const messageElement = screen.queryAllByText(message);
        expect(messageElement.length).toBe(0);
    });

    test('Check if overlay is not present when message is empty', () => {
        render(<AccordionDisplay showOverlayButton={true} overlayButtonMessage={""} />);
        const buttonElement = screen.getAllByRole('button');
        expect(buttonElement.length).toBe(1);
    });

    test('Check that the accordion is open on the first render', () => {
        render(<AccordionDisplay showOverlayButton={false} />);
        const accordionElement = screen.getAllByRole('button');
        expect(accordionElement[0]).toHaveAttribute('aria-expanded', 'true');
    });

});
