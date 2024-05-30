import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import PostingERA from './components/postingERA';
import SendingMessages from './components/sendingMessages';
import UpdatePatientBalance from './components/updatePatientBalance'
import CreateInvoices from './components/createInvoices';
import ChargeCreditCards from './components/chargeCreditCards';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

const App = () => {

  return (
    <Router>
      <div className="bg-light min-vh-100">
        <Header />
        <Routes>
          <Route path="/" element={<PostingERA api={api} />} />
          <Route path="/update-patient-balance" element={<UpdatePatientBalance />} />
          <Route path="/messages" element={<SendingMessages />} />
          <Route path="/generate-invoice" element={<CreateInvoices />} />
          <Route path="/credit-card-charge" element={<ChargeCreditCards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
