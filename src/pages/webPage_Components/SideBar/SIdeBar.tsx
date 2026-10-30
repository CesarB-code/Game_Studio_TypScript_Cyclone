import {Nav , Row} from 'react-bootstrap';
import './SideBar.css';

function StackedExample() {
  return (
    <Row> <Nav defaultActiveKey="/home" className="flex-column sidebar-nav">
     
      <Nav.Link href="/home">Store</Nav.Link>
      <Nav.Link href="/events" >Events</Nav.Link>
      <Nav.Link href="/about">Company</Nav.Link>
      
    </Nav></Row>
    
  );
}

export default StackedExample;