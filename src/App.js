// import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import Container from 'react-bootstrap/Container';
// import InvoiceForm from './components/InvoiceForm';

// class App extends Component {
//   render() {
//   return (
//     <div className="App d-flex flex-column align-items-center justify-content-center w-100">
//       <Container>
//         <InvoiceForm/>
//       </Container>
//     </div>
//   );
// }}

// export default App;


import React from 'react';
import { Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/frontpage/Header';
import Footer from './components/frontpage/Footer';
import Home from './components/frontpage/home/Home';
import ContactInfo from './components/frontpage/contact/ContactInfo';
import Invoices from './components/frontpage/invoice/Invoice';
import History from './components/frontpage/history/History';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactInfo />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
