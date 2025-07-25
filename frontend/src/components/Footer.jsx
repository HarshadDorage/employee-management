import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Employee Management System</h5>
            <p className="text-muted">
              A simple yet powerful tool to manage your organization's employees.
            </p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-muted">Home</a></li>
              <li><a href="/form" className="text-decoration-none text-muted">Add Employee</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact</h5>
            <address className="text-muted">
              <p>123 Company St<br />City, Country</p>
              <p>Email: info@company.com</p>
            </address>
          </Col>
        </Row>
        <hr className="bg-secondary" />
        <Row>
          <Col className="text-center text-muted">
            <small>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;