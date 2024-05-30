import React from 'react';
import PostingERA from './components/postingERA';
import SendingMessages from './components/sendingMessages';
import UpdatePatientBalance from './components/updatePatientBalance'
import CreateInvoices from './components/createInvoices';
import ChargeCreditCards from './components/chargeCreditCards';

const App = () => {
  return (
    <div>
      <h1>HealthAR Management Tool</h1>
      <PostingERA />
      <UpdatePatientBalance />
      <SendingMessages />
      <CreateInvoices />
      <ChargeCreditCards />
      {/* Other components */}
    </div>
  );
}

export default App;
