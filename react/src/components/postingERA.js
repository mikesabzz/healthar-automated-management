import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PostERA = (props) => {
  const [eraData, setEraData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await props.api.get('/api/mockdata');
        const data = response.data;
        setEraData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Patient Name', field: 'patientName' },
    { headerName: 'Payment Amount', field: 'paymentAmount' },
    { headerName: 'Service Date', field: 'serviceDate' },
    { headerName: 'Insurance Company', field: 'insuranceCompany' }
  ];

  return (
    <Container fluid>
      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGridReact
          rowData={eraData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </Container>
  );
};

export default PostERA;
