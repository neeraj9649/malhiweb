import React from 'react';
import InvoiceForm from '../invoice/invoiceModels/InvoiceForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function Invoices() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <h1>Generate Invoice</h1>
      <InvoiceForm />
    </div>
  );
}

export default Invoices;
