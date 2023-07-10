import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom/extend-expect';

describe('Test Navbar component', () => {
    test('Check the return link correctly', () => {
        render(<Navbar />);
        const returnLink = screen.getByText('< RETURN');
        expect(returnLink).toBeInTheDocument();
        expect(returnLink).toHaveAttribute('href', '/');
      });
    
      test('Check the viewB link correctly', () => {
        render(<Navbar />);
        const viewBLink = screen.getByText('VIEW ALREADY SAVED V-CARD');
        expect(viewBLink).toBeInTheDocument();
        expect(viewBLink).toHaveAttribute('href', '/view');
      });
    
      test('Check the viewB link when clicked', () => {
        render(<Navbar />);
        const viewBLink = screen.getByText('VIEW ALREADY SAVED V-CARD');
        fireEvent.click(viewBLink);
        expect(viewBLink).toHaveTextContent('CREATE A NEW V-CARD');
      });


});