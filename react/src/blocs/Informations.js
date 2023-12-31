import React, { useState } from 'react';
import { Form, Row, Alert } from 'react-bootstrap';
import './Information.css';

export default function Informations({
  handleChange, 
  information
}) {

  const [errors, setErrors] = useState({});

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10,20}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };

    if (name === 'first_name' || name === 'last_name') {
      if (/\d/.test(value)) {
        newErrors[name] = 'Name should not contain numbers';
      } else if (value.length > 30) {
        e.target.value = value.slice(0, 30);
        newErrors[name] = 'Name should not exceed 30 characters';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'mobile' || name === 'business_phone') {
      if (!validatePhoneNumber(value)) {
        newErrors[name] = 'Invalid phone number (10-20 digits required)';
      } else if (value.length > 20) {
        newErrors[name] = 'Phone number should not exceed 20 digits';
      } else {
        delete newErrors[name];
      }
    }

    if (value.length > 21 && (name === 'mobile' || name === 'business_phone')) {
      e.target.value = value.slice(0, 20);
    }

    if (name === 'email') {
      if (!validateEmail(value)) {
        newErrors[name] = 'Invalid email address';
      } else if (value.length > 100) {
        e.target.value = value.slice(0, 100);
        newErrors[name] = 'Email should not exceed 100 characters';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'company') {
      if (value.length > 50) {
        e.target.value = value.slice(0, 50);
        newErrors[name] = 'Company name should not exceed 50 characters';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'position') {
      if (value.length > 50) {
        e.target.value = value.slice(0, 50);
        newErrors[name] = 'Position should not exceed 50 characters';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'job_id') {
      if (value.length > 30) {
        e.target.value = value.slice(0, 30);
        newErrors[name] = 'Job ID should not exceed 30 characters';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'department') {
      if (value.length > 50) {
        e.target.value = value.slice(0, 50);
        newErrors[name] = 'Department name should not exceed 50 characters';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'address') {
      if (value.length > 500) {
        e.target.value = value.slice(0, 500);
        newErrors[name] = 'Address should not exceed 500 characters';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'resume') {
      if (value.length > 500) {
        e.target.value = value.slice(0, 500);
        newErrors[name] = 'Resume should not exceed 500 characters';
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
    handleChange(e);
  };

  return (
    <div>
      <Form className="container mt-3 mb-3">
        <Row className="mb-3">
          <Form.Label>Name <span className="required-field">*</span> </Form.Label>
          <Form.Group className="col">
            <Form.Control type="text" id="first_name" name="first_name" value={information.first_name} placeholder="First name" onChange={handleInputChange} required />
            {errors.first_name && <Alert variant="danger">{errors.first_name}</Alert>}
          </Form.Group>
          <Form.Group className="col">
            <Form.Control type="text" id="last_name" name="last_name" value={information.last_name} placeholder="Last name" onChange={handleInputChange} required />
            {errors.last_name && <Alert variant="danger">{errors.last_name}</Alert>}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>Phone Number <span className="required-field">*</span> </Form.Label>
          <Form.Group className="col">
            <Form.Control type="tel" id="mobile" name="mobile" value={information.mobile} placeholder="Home number" onChange={handleInputChange} required />
            {errors.mobile && <Alert variant="danger">{errors.mobile}</Alert>}
          </Form.Group>
          <Form.Group className="col">
            <Form.Control type="tel" id="business_phone" name="business_phone" value={information.business_phone} placeholder="Work number" onChange={handleInputChange} required />
            {errors.business_phone && <Alert variant="danger">{errors.business_phone}</Alert>}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>Email <span className="required-field">*</span></Form.Label>
          <Form.Group className="col">
            <Form.Control type="email" id="email" name="email" value={information.email} placeholder="Email address" onChange={handleInputChange} required />
            {errors.email && <Alert variant="danger">{errors.email}</Alert>}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>Organisation <span className="required-field">*</span></Form.Label>
          <Form.Group className="col">
            <Form.Control type="text" id="company" name="company" value={information.company} placeholder="Name of the organisation" onChange={handleInputChange} required />
            {errors.company && <Alert variant="danger">{errors.company}</Alert>}
          </Form.Group>
          <Form.Group className="col">
            <Form.Control type="text" id="position" name="position" value={information.position} placeholder="Your position in the organisation" onChange={handleInputChange} required />
            {errors.position && <Alert variant="danger">{errors.position}</Alert>}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>More information <span className="required-field">*</span></Form.Label>
          <Form.Group className="col">
            <Form.Control type="text" id="job_id" name="job_id" value={information.job_id} placeholder="Job ID" onChange={handleInputChange} required />
            {errors.job_id && <Alert variant="danger">{errors.job_id}</Alert>}
          </Form.Group>
          <Form.Group className="col">
            <Form.Control type="text" id="department" name="department" value={information.department} placeholder="Department name" onChange={handleInputChange} required />
            {errors.department && <Alert variant="danger">{errors.department}</Alert>}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>Address <span className="required-field">*</span></Form.Label>
          <Form.Group className="col">
            <Form.Control as="textarea" rows={3} id="address" name="address" value={information.address} placeholder="Business Address" onChange={handleInputChange} required />
            {errors.address && <Alert variant="danger">{errors.address}</Alert>}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Label>Resume <span className="required-field">*</span></Form.Label>
          <Form.Group className="col">
            <Form.Control as="textarea" rows={3} id="resume" name="resume" value={information.resume} placeholder="Brief about yourself and your skills" onChange={handleInputChange} required />
            {errors.resume && <Alert variant="danger">{errors.resume}</Alert>}
          </Form.Group>
        </Row>

      </Form>
      <div className='mandatoryFields'>
        <p><span className="required-field">*</span> Fields are mandatory</p>
      </div>
    </div>

  )
}
