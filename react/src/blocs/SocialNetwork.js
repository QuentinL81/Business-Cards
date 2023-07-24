import React, { useState } from 'react';
import IconNetwork from '../components/IconNetwork';
import './SocialNetwork.css';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import linkedin from '../assets/linkedin.svg';
import instagram from '../assets/instagram.svg';
import yt from '../assets/yt.svg';
import skype from '../assets/skype.svg';
import whatsapp from '../assets/whatsapp.svg';
import behance from '../assets/behance.svg';
import github from '../assets/github.svg';
import slack from '../assets/slack.svg';
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
        <IconNetwork image={facebook} name="facebook" label="www.facebook.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="facebook" />
        <IconNetwork image={linkedin} name="linkedin" label="www.linkedin.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="linkedin" />
        <IconNetwork image={twitter} name="twitter" label="www.twitter.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="twitter" />
        <IconNetwork image={yt} name="youtube" label="www.youtube.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="youtube" />
        <IconNetwork image={instagram} name="instagram" label="www.instagram.com/yourpage" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="instagram" />
        <IconNetwork image={github} name="github" label="GitHub ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="GitHub ID" />
        <IconNetwork image={slack} name="slack" label="Slack ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="Slack ID" />
        <IconNetwork image={skype} name="skype" label="Skype ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="Skype ID" />
        <IconNetwork image={whatsapp} name="whatsapp" label="Whatsapp ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="Whatsapp ID" />
        <IconNetwork image={behance} name="behance" label="Behance ID" handleChange={handleChange} addLink={addLink} removeLink={removeLink} data-testid="Behance ID" />
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
