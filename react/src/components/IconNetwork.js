import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import './IconNetwork.css'

export default function InconNetwork({
  image,
  label,
  handleChange,
  name
}) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const [invalidUrl, setInvalidUrl] = useState(false);
  const handleLinkChange = (event) => {

    const { value } = event.target;
    setLink(value);

    handleChange(event);
    if (value === '') {
      setInvalidUrl(false);
    } else if (!isValidUrl(value)) {
      setInvalidUrl(true);
    } else {
      setInvalidUrl(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);
  };

  const isValidUrl = (url) => {
    const urlPattern = /^www\.[A-Za-z0-9-]+\.(com|fr|dev|net|org|io)(\/[^\s]*)?$/i;
    return urlPattern.test(url);
  };

  return (
    <div className='icon-network'>
      <div>
        <Button className='buttons'
          onClick={() => setOpen(!open)}
          aria-controls="collapse-text"
          aria-expanded={open}
        >
          <img src={image} alt="Click here" />
        </Button>
      </div>

      <div className='isOpen'>

        <Collapse in={open}>
          <div id="collapse-text">
            <Form onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <img src={image} alt="URL Icon" />
                  </span>
                </div>
                <Form.Control
                  type="text"
                  placeholder={label}
                  value={link}
                  name={name}
                  data-testid={name}
                  onChange={handleLinkChange}
                />
              </div>
            </Form>
          </div>
        </Collapse>

        {invalidUrl && (
          <Alert variant="danger">
            URL is invalid. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io
          </Alert>
        )}
      </div>
    </div>
  )
}