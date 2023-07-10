import { Accordion} from "react-bootstrap";
import OverlayButton from "./OverlayButton";
import './Accordion.css';

export default function AccordionDisplay({ 
  children, 
  title, 
  overlayButtonMessage, 
  showOverlayButton 
}) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="alignement">
          {title}
          {showOverlayButton && overlayButtonMessage && <OverlayButton message={overlayButtonMessage} />}
          </div>
        </Accordion.Header> 
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
      <div className="blanc"/>
    </Accordion>

  );
}