import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FiHome, FiUserPlus, FiUsers } from 'react-icons/fi';
import PropTypes from 'prop-types';

function AppNavbar({ employeeCount }) {
  const location = useLocation();
  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: <FiHome className="me-1" />,
      exact: true
    },
    { 
      path: '/employees', 
      label: 'Employees', 
      icon: <FiUsers className="me-1" />,
      badge: employeeCount
    },
    { 
      path: '/form', 
      label: 'Add Employee', 
      icon: <FiUserPlus className="me-1" /> 
    }
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100 shadow-sm sticky-top">
      <Container fluid className="px-2 px-sm-3">
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
          <span className="text-primary">EMS</span>
          <span className="ms-1">Portal</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-nav" className="border-0">
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav as="ul" className="align-items-center">
            {navItems.map((item) => (
              <Nav.Item as="li" key={item.path}>
                <Nav.Link
                  as={Link}
                  to={item.path}
                  active={
                    item.exact 
                      ? location.pathname === item.path
                      : location.pathname.startsWith(item.path)
                  }
                  className="d-flex align-items-center position-relative px-2 px-lg-3"
                >
                  {item.icon}
                  {item.label}
                  {item.badge !== undefined && (
                    <Badge pill bg="primary" className="ms-2">
                      {item.badge}
                    </Badge>
                  )}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavbar.propTypes = {
  employeeCount: PropTypes.number
};

AppNavbar.defaultProps = {
  employeeCount: 0
};

export default AppNavbar;