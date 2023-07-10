import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Download({ 
  handleChange 
}) {
  const [fileLinkDownload, setFileLinkDownload] = useState();
  const [error, setError] = useState('');

  const handleDownloadChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileLinkName = 'fileLinkDownload';
      validateFile(file, setError, setFileLinkDownload, fileLinkName);
    }
  };

  const handleImageRemove = () => {
    setFileLinkDownload(null);
    setError('');
    handleChange({ target: { name: 'fileLinkDownload', value: null } });
  };

  const validateFile = (file, setError, setFileLink, fileLinkName) => {
    const validFormats = ['image/png', 'image/jpeg', 'image/gif'];
    const validSize = 500000; // Minimum file size (0.5 MB)

    if (validFormats.includes(file.type) && file.size >= validSize) {
      const fileLink = URL.createObjectURL(file);
      setFileLink(fileLink);
      setError('');
      handleChange({ target: { name: fileLinkName, value: fileLink } });
    } else {
      let formatError = '';
      if (!validFormats.includes(file.type)) {
        const fileExtension = file.name.split('.').pop().toUpperCase();
        formatError = `Invalid format: not a ${fileExtension} file`;
      }
      let sizeError = '';
      if (file.size < validSize) {
        sizeError = 'Invalid size (min 0.5 MB)';
      }
      setError(`${formatError} ${sizeError}`);
      setFileLink(null);
      handleChange({ target: { name: fileLinkName, value: null } });
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Download Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleDownloadChange}
                  data-testid="download-picture-input"
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {fileLinkDownload && (
          <Row>
            <Col>
              <div className="preview-image">
                <img src={fileLinkDownload} alt="DownloadPreview" width='200'/>
                <button className="remove-btn" data-testid="remove-picture-input" onClick={handleImageRemove}>
                  Remove
                </button>
              </div>
            </Col>
          </Row>
        )}
        {error && (
          <Row>
            <Col>
              <p className="error-message">{error}</p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Download;
