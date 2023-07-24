import React, { useState } from 'react';
import IconNetwork from '../components/IconNetwork';
import './SocialNetwork.css';
import facebookOpen from '../assets/facebookbleu.svg';
import twitterOpen from '../assets/twitterbleu.svg';
import linkedinOpen from '../assets/linkedinbleu.svg';
import instagramOpen from '../assets/instagrambleu.svg';
import ytOpen from '../assets/ytbleu.svg';
import skypeOpen from '../assets/skypebleu.svg';
import whatsappOpen from '../assets/whatsappbleu.svg';
import behanceOpen from '../assets/behancebleu.svg';
import githubOpen from '../assets/githubbleu.svg';
import slackOpen from '../assets/slackbleu.svg';

import facebookClose from '../assets/facebookgris.svg';
import twitterClose from '../assets/twittergris.svg';
import linkedinClose from '../assets/linkedingris.svg';
import instagramClose from '../assets/instagramgris.svg';
import ytClose from '../assets/ytgris.svg';
import skypeClose from '../assets/skypegris.svg';
import whatsappClose from '../assets/whatsappgris.svg';
import behanceClose from '../assets/behancegris.svg';
import githubClose from '../assets/githubgris.svg';
import slackClose from '../assets/slackgris.svg';
import { Alert, Collapse, Form } from 'react-bootstrap';

export default function SocialNetwork({
  handleChange
}) {
  const [links, setLinks] = useState([]);

  const addLink = (link) => {
    setLinks([...links, link]);
  }

  const removeLink = (linkToRemove) => {
    setLinks(links.filter(link => link.name !== linkToRemove.name));
  }
  const handleLinkChange = (event) => {

    const { value, name } = event.target;

    let updatedLinks = links.map(link =>
      link.name === name ? { ...link, link: value } : link
    );

    if (value === '') {
      updatedLinks = updatedLinks.map(link =>
        link.name === name ? { ...link, invalidURL: false } : link
      );
    } else if (!isValidUrl(value)) {
      updatedLinks = updatedLinks.map(link =>
        link.name === name ? { ...link, invalidURL: true } : link
      );
    } else {
      updatedLinks = updatedLinks.map(link =>
        link.name === name ? { ...link, invalidURL: false } : link
      );
    }
    setLinks(updatedLinks);
    handleChange(event);

  };

  const isValidUrl = (url) => {
    const urlPattern = /^www\.[A-Za-z0-9-]+\.(com|fr|dev|net|org|io)(\/[^\s]*)?$/i;
    return urlPattern.test(url);
  };
  return (
    <div className='all-responsive'>
      <div className='social-networks'>
        <IconNetwork imageClose={facebookClose} imageOpen={facebookOpen} name="facebook" label="www.facebook.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="facebook" />
        <IconNetwork imageClose={linkedinClose} imageOpen={linkedinOpen} name="linkedin" label="www.linkedin.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="linkedin" />
        <IconNetwork imageClose={twitterClose} imageOpen={twitterOpen} name="twitter" label="www.twitter.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="twitter" />
        <IconNetwork imageClose={ytClose} imageOpen={ytOpen} name="youtube" label="www.youtube.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="youtube" />
        <IconNetwork imageClose={instagramClose} imageOpen={instagramOpen} name="instagram" label="www.instagram.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="instagram" />
        <IconNetwork imageClose={githubClose} imageOpen={githubOpen} name="github" label="GitHub ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="GitHub ID" />
        <IconNetwork imageClose={slackClose} imageOpen={slackOpen} name="slack" label="Slack ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="Slack ID" />
        <IconNetwork imageClose={skypeClose} imageOpen={skypeOpen} name="skype" label="Skype ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="Skype ID" />
        <IconNetwork imageClose={whatsappClose} imageOpen={whatsappOpen} name="whatsapp" label="Whatsapp ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="Whatsapp ID" />
        <IconNetwork imageClose={behanceClose} imageOpen={behanceOpen} name="behance" label="Behance ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="Behance ID" />
      </div>
      <div className='petit_reseaux'>
        {links.map((link) =>
          <div className='isOpen' key={link.name}>

            <Collapse in={true}>
              <div id="collapse-text">
                <Form>
                  <div className="input-group">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <img className='image-aveclabel' src={link.image} alt="URL Icon" />
                      </span>
                    </div>
                    <Form.Control
                      type="text"
                      placeholder={link.label}
                      value={link.link}
                      name={link.name}
                      data-testid={link.name}
                      onChange={handleLinkChange}
                    />
                  </div>
                </Form>
              </div>
            </Collapse>
            {link.invalidURL && (
              <Alert variant="danger">
                URL is invalid. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
