import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap'; 
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 w-100">
        <AppNavbar />
        <main className="flex-grow-1 w-100">
          <Container fluid className="px-0">
            <Routes>
              <Route path="/" element={<EmployeeList />} />
              <Route path="/form" element={<EmployeeForm />} />
              <Route path="/form/:id" element={<EmployeeForm />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;