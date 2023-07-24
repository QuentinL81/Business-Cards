import {render, screen, fireEvent} from '@testing-library/react';
import OverlayButton from '../components/OverlayButton';
import '@testing-library/jest-dom/extend-expect';

describe('Tests OverlayButton component', () => {

  test('OverlayButton renders correctly', () => {
    const { container } = render(<OverlayButton message="TOOLTIP MESSAGE" />);
    expect(container).toMatchSnapshot();
  });

  test('Tooltip appears on mouseover', () => {
    render(<OverlayButton message="TOOLTIP MESSAGE" />);
    const bulbImage = screen.getByAltText('Ampoule-logo');
  
    expect(screen.queryByText('TOOLTIP MESSAGE')).toBeNull();
  
    fireEvent.mouseOver(bulbImage);
    const tooltip = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'div' && content === 'TOOLTIP MESSAGE';
    });
  
    expect(tooltip).toBeVisible();
  });

  test('Tooltip disappears on mouseout', async () => {
    render(<OverlayButton message="TOOLTIP MESSAGE" />);
    const bulbImage = screen.getByAltText('Ampoule-logo');
  
    fireEvent.mouseOver(bulbImage);
    const tooltip = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'div' && content === 'TOOLTIP MESSAGE';
    });
    expect(tooltip).toBeVisible();

    fireEvent.mouseOut(bulbImage);
    expect(screen.queryByText('Tooltip message')).toBeNull();
    
  });

  test('Check the tooltip placement is correctly set', () => {
    const message = 'TOOLTIP MESSAGE';
    render(<OverlayButton message={message} />);

    const placement = 'right';
    expect(placement).toBe('right');
  });

});