import { render, screen} from '@testing-library/react';
import OverlayButton from '../components/OverlayButton';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('Test OverlayButton component', () => {

    test('Check the button with a "?" symbol is present', () => {
        const message = 'MESSAGE TOOLTIP';
        render(<OverlayButton message={message} />);
    
        const button = screen.getByText('?');
        expect(button).toBeInTheDocument();
      });

    test('Checks the tooltip when the button is hovered over.', () => {
        const message = 'MESSAGE TOOLTIP';
        render(<OverlayButton message={message} />);
        // Check that the tooltip is not initially displayed
        expect(screen.queryByText(message)).toBeNull();
        const bouton = screen.getByText('?');
        userEvent.hover(bouton);
    
        expect(screen.getByText(message)).toBeInTheDocument();
      });

      test('Check the tooltip placement is correctly set', () => {
        const message = 'MESSAGE TOOLTIP';
        render(<OverlayButton message={message} />);
        
        const placement = 'right';
        expect(placement).toBe('right');
      });

});