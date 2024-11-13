import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RolebasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/AdminSummary';
import ListDepartments from './components/departments/ListDepartments';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import ListEmployees from './components/employees/ListEmployees';
import AddEmployee from './components/employees/AddEmployee';
import ViewEmployee from './components/employees/ViewEmployee';
import EditEmployee from './components/employees/EditEmployee';
import AddSalary from './components/salary/AddSalary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/admin-dashboard' />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route
          path='/admin-dashboard'
          element={
            <PrivateRoutes>
              <RolebasedRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RolebasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          {/* ADMIN DASHBOARD CHILDREN */}

          {/* DEPARTMENTS */}
          <Route
            path='/admin-dashboard/departments'
            element={<ListDepartments />}
          ></Route>
          <Route
            path='/admin-dashboard/departments/add'
            element={<AddDepartment />}
          ></Route>
          <Route
            path='/admin-dashboard/departments/:id'
            element={<EditDepartment />}
          ></Route>
          {/* Employees */}
          <Route
            path='/admin-dashboard/employees'
            element={<ListEmployees />}
          ></Route>
          <Route
            path='/admin-dashboard/employees/:id'
            element={<ViewEmployee />}
          ></Route>
          <Route
            path='/admin-dashboard/employees/add'
            element={<AddEmployee />}
          ></Route>
          <Route
            path='/admin-dashboard/employees/edit/:id'
            element={<EditEmployee />}
          ></Route>

          {/* Salary */}
          <Route path='/admin-dashboard/salary' element={<AddSalary />}></Route>
        </Route>
        <Route
          path='/employee-dashboard'
          element={<EmployeeDashboard />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
