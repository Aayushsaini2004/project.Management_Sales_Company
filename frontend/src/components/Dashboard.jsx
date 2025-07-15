import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Assuming you'll put custom styles here
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Table } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register components
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Get total orders
      const ordersResponse = await axios.get('http://localhost:5000/api/orders');
      setTotalOrders(ordersResponse.data.length);

      // Get total suppliers
      const suppliersResponse = await axios.get('http://localhost:5000/api/suppliers');
      setTotalSuppliers(suppliersResponse.data.length);

      // Get total inventory items
      const inventoryResponse = await axios.get('http://localhost:5000/api/inventory');
      setTotalInventory(inventoryResponse.data.length);

      // Get total employees and employee data
      const employeesResponse = await axios.get('http://localhost:5000/api/employees');
      setTotalEmployees(employeesResponse.data.length);
      setEmployees(employeesResponse.data);

      // Fetch real sales data for dashboard chart
      const salesResponse = await axios.get('http://localhost:5000/api/sales/monthly');
      setSalesData(salesResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message || error);
    }
  };

  // Calculate total sales for percentage
  const totalSales = salesData.reduce((sum, data) => sum + data.sales, 0);
  const pieChartData = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: 'Sales Percentage',
        data: salesData.map((data) =>
          totalSales ? ((data.sales / totalSales) * 100).toFixed(2) : 0
        ),
        backgroundColor: [
          '#3dc0f8', '#c933f7', '#f8c03d', '#3df8c0', '#f83d3d',
          '#3df83d', '#c03df8', '#f83dc0', '#3dc0f8', '#c933f7',
          '#f8c03d', '#3df8c0'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-bg-animated">
        {/* Robot images with animation */}
        <img src="C:\Users\ss\Downloads\Halloween video call-bro.png" className="robot-bg r1" alt="robot" />
        <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f916.svg" className="robot-bg r2" alt="robot" />
        <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f916.svg" className="robot-bg r3" alt="robot" />
        <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f916.svg" className="robot-bg r4" alt="robot" />
        {/* ...existing waves and circles... */}
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="dash-circle c1"></div>
        <div className="dash-circle c2"></div>
        <div className="dash-circle c3"></div>
        <div className="dash-circle c4"></div>
        <div className="dash-circle c5"></div>
      </div>
      <div className="container-fluid" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row">
          <div className="col-md-2 p-0 vh-100 bg-dark" style={{ position: 'fixed', left: 0, top: 0 }}>
            <Sidebar />
          </div>

          <div className="col-md-10 offset-md-2" style={{ marginTop: '60px' }}>
            <div className="mt-4 px-3">
              <h1 style={{
                fontWeight: 900,
                letterSpacing: '2px',
                background: 'linear-gradient(90deg, #3dc0f8 60%, #c933f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
              }}>
                Admin Dashboard
              </h1>

              <div className="row mt-5">
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Orders</Card.Title>
                      <Card.Text>{totalOrders}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Suppliers</Card.Title>
                      <Card.Text>{totalSuppliers}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Inventory</Card.Title>
                      <Card.Text>{totalInventory}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Employees</Card.Title>
                      <Card.Text>{totalEmployees}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <h3>Employees</h3>
                  <Table className="custom-table" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee._id}>
                          <td>{employee.name}</td>
                          <td>{employee.department}</td>
                          <td>{employee.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <h3>Sales</h3>
                  <div className="chart-container">
                    <Pie data={pieChartData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
//                     <Bar data={salesChartData} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
