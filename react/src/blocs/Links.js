import { Form, Row, Alert } from "react-bootstrap";
import { useState } from "react";
import './Links.css'
import hyperlien from '../assets/hyperlien.svg'

export default function Links({
  handleChange
}) {
  const [invalidUrl, setInvalidUrl] = useState(false);

  const isValidUrl = (url) => {
    const urlPattern = /^www\.[A-Za-z0-9-]+\.(com|fr|dev|net|org|io)(\/[^\s]*)?$/i;
    return urlPattern.test(url);
  };

  const handleUrlChange = (event) => {
    const { name, value } = event.target;

    if (name === "site_url" && !isValidUrl(value)) {
      setInvalidUrl(true);
      return;
    }

    setInvalidUrl(false);
    handleChange(event);
  };

  return (
    <div className="container mt-3 mb-3">
      <Row className="mb-3">
        <Form.Label><span className="required-field">*</span> Links </Form.Label>
        <img className='hyperlien_img' src={hyperlien} alt="hyperlien-img" />
        <Form.Group controlId="Name" className="col">
          <Form.Control type="text" name="site_name" placeholder="My Website" onChange={handleChange} required />
        </Form.Group>
        <img className='hyperlien_img' src={hyperlien} alt="hyperlien-img" />
        <Form.Group controlId="Name" className="col">
          <Form.Control type="link" name="site_url" placeholder="www.mywebsite.com" onChange={handleUrlChange} required />
        </Form.Group>
      </Row>
      {invalidUrl && (
        <Alert variant="danger">
          URL is invalid. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io
        </Alert>
      )}
      <div className='mandatoryFields'>
        <p><span className="required-field">*</span> Field is mandatory</p>
      </div>
    </div>
  );
}
