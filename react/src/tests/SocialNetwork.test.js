import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import SocialNetwork from '../blocs/SocialNetwork';

describe('Test SocialNetwork bloc', () => {
  const handleChange = jest.fn();

    test('Check handleChange function with the correct value when a social network link is changed', () => {
        const { getByTestId } = render(<SocialNetwork handleChange={handleChange} />);
        const facebookInput = getByTestId('facebook');
        const twitterInput = getByTestId('twitter');
        const linkedinInput = getByTestId('linkedin');
        const instagramInput = getByTestId('instagram');
        const skypeInput = getByTestId('skype');
        const githubInput = getByTestId('github');
        const slackInput = getByTestId('slack');
        const youtubeInput = getByTestId('youtube');

        fireEvent.change(facebookInput, { target: { value: 'https://www.facebook.com/yourpage' } });
        fireEvent.change(twitterInput, { target: { value: 'https://www.twitter.com/yourpage' } });
        fireEvent.change(linkedinInput, { target: { value: 'https://www.linkedin.com/yourpage' } });
        fireEvent.change(instagramInput, { target: { value: 'https://www.instagram.com/yourpage' } });
        fireEvent.change(skypeInput, { target: { value: 'skypeid' } });
        fireEvent.change(githubInput, { target: { value: 'githubid' } });
        fireEvent.change(slackInput, { target: { value: 'slackid' } });
        fireEvent.change(youtubeInput, { target: { value: 'https://www.youtube.com/yourpage' } });

        expect(handleChange).toHaveBeenCalledTimes(8);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ 
            target: expect.objectContaining({ name: 'facebook' }),
        }));
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ 
            target: expect.objectContaining({ name: 'twitter' }),
        }));
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ 
            target: expect.objectContaining({ name: 'linkedin' }),
        }));
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ 
            target: expect.objectContaining({ name: 'instagram' }), 
        }));
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ 
            target: expect.objectContaining({ name: 'skype' }), 
        }));
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ 
            target: expect.objectContaining({ name: 'github' }), 
        }));
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ 
            target: expect.objectContaining({ name: 'slack' }), 
        }));
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ 
            target: expect.objectContaining({ name: 'youtube' }), 
        }));
    });
});