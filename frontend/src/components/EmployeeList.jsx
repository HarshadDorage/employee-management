import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Table,
  Card,
  Container,
  Button,
  Spinner,
  Badge,
  Form,
  InputGroup,
  Row,
  Col,
  Alert
} from 'react-bootstrap';
import { FiEdit, FiTrash2, FiPlus, FiUsers, FiSearch } from 'react-icons/fi';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

 const fetchEmployees = async () => {
  try {
    setLoading(true);
    setError(null);
    const res = await axios.get('http://localhost:5000/employees');
    setEmployees(res.data.employees); // Extract the array from the response
  } catch (err) {
    setError(err.message || 'Failed to fetch employees');
    toast.error('Failed to fetch employees');
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (err) {
        toast.error('Failed to delete employee');
      }
    }
  };

  const filteredEmployees = Array.isArray(employees) 
  ? employees.filter(employee =>
      employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee?.designation?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading employee data...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error Loading Employees</Alert.Heading>
          <p>{error}</p>
          <hr />
          <Button
            variant="outline-danger"
            onClick={fetchEmployees}
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="text-primary mb-1">
            <FiUsers className="me-2" />
            Employee Directory
          </h2>
          <p className="text-muted small mb-0">Manage your organization's employees</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            as={Link}
            to="/form"
            variant="primary"
            size="sm"
            className="d-flex align-items-center py-1 px-3"
          >
            <FiPlus className="me-1" size={26} />
            <span className="small">Add Employee</span>
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0">Employee Records</h5>
          <Badge bg="secondary" pill>
            {filteredEmployees.length} {filteredEmployees.length === 1 ? 'record' : 'records'}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, email or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Designation</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee._id}>
                      <td className="align-middle">
                        <strong>{employee.name}</strong>
                      </td>
                      <td className="align-middle">
                        <a href={`mailto:${employee.email}`}>{employee.email}</a>
                      </td>
                      <td className="align-middle">
                        {employee.phone || '-'}
                      </td>
                      <td className="align-middle">
                        <Badge bg="info" className="text-capitalize">
                          {employee.designation}
                        </Badge>
                      </td>
                      <td className="align-middle text-end">
                        <Button
                          as={Link}
                          to={`/form/${employee._id}`}
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          title="Edit"
                        >
                          <FiEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(employee._id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="py-4">
                        <FiUsers size={48} className="text-muted mb-3" />
                        <h5 className="text-muted">
                          {employees.length === 0
                            ? 'No employees found'
                            : 'No matching employees found'}
                        </h5>
                        <p className="text-muted">
                          {employees.length === 0
                            ? 'Get started by adding your first employee'
                            : 'Try a different search term'}
                        </p>
                        {employees.length === 0 && (
                          <Button as={Link} to="/form" variant="primary" className="mt-2">
                            <FiPlus className="me-2" /> Add Employee
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        {filteredEmployees.length > 0 && (
          <Card.Footer className="bg-light text-muted small">
            Showing {filteredEmployees.length} of {employees.length} employees
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
}

export default EmployeeList;