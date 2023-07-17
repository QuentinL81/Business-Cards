import { Form, Row, Alert } from "react-bootstrap";
import { useState } from "react";
import './Links.css';
import hyperlien from '../assets/hyperlien.svg';

export default function Links({
  handleChange
}) {
  const [errors, setErrors] = useState({});

  const validateUrl = (url) => {
    const urlPattern = /^www\.[A-Za-z0-9-]+\.(com|fr|dev|net|org|io)(\/[^\s]*)?$/i;
    return urlPattern.test(url);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newErrors = { ...errors };

    if (name === 'siteName') {
      if (/\d/.test(value)) {
        newErrors.siteName = 'Site name should not contain numbers';
      } else if (value.length > 255) {
        event.target.value = value.slice(0, 255);
        newErrors.siteName = 'Site name should not exceed 255 characters';
      } else {
        delete newErrors.siteName;
      }
    }

    if (name === 'siteUrl') {
      if (!validateUrl(value)) {
        newErrors.siteUrl = 'Invalid URL. Please enter a valid URL. Domain name valid: .com|.fr|.dev|.net|.org|.io';
      } else if (value.length > 255) {
        event.target.value = value.slice(0, 255);
        newErrors.siteUrl = 'URL should not exceed 255 characters';
      } else {
        delete newErrors.siteUrl;
      }
    }

    setErrors(newErrors);
    handleChange(event);
  };

  return (
    <div className="container mt-3 mb-3">
      <Row className="mb-3">
        <Form.Label><span className="required-field">*</span> Links </Form.Label>
        <img className='hyperlien_img' src={hyperlien} alt="hyperlien-img" />
        <Form.Group controlId="Name" className="col">
          <Form.Control type="text" name="siteName" placeholder="My Website" onChange={handleInputChange} required />
          {errors.siteName && <Alert variant="danger">{errors.siteName}</Alert>}
        </Form.Group>
        <img className='hyperlien_img' src={hyperlien} alt="hyperlien-img" />
        <Form.Group controlId="Url" className="col">
          <Form.Control type="text" name="siteUrl" placeholder="www.mywebsite.com" onChange={handleInputChange} required />
          {errors.siteUrl && <Alert variant="danger">{errors.siteUrl}</Alert>}
        </Form.Group>
      </Row>
      <div className='mandatoryFields'>
        <p><span className="required-field">*</span> Field is mandatory</p>
      </div>
    </div>
  );
}
