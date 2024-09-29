// import React, { useState } from 'react';
// import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import Header from './components/frontpage/Header';
// import Footer from './components/frontpage/Footer';
// import Home from './components/frontpage/home/Home';
// import ContactInfo from './components/frontpage/contact/ContactInfo';
// import Invoices from './components/frontpage/invoice/Invoice';
// import History from './components/frontpage/history/History';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} />
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/invoices" element={<Invoices />} />
//             <Route path="/3456478765432" element={<History />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


// // import React, { Component } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import './App.css';
// // import Container from 'react-bootstrap/Container';
// // import InvoiceForm from './components/InvoiceForm';

// // class App extends Component {
// //   render() {
// //   return (
// //     <div className="App d-flex flex-column align-items-center justify-content-center w-100">
// //       <Container>
// //         <InvoiceForm/>
// //       </Container>
// //     </div>
// //   );
// // }}

// // export default App;

// // complete WORKING
// // ---
// // import React from 'react';
// // import { Routes } from 'react-router-dom';
// // import { BrowserRouter as Router, Route } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import './App.css';
// // import Header from './components/frontpage/Header';
// // import Footer from './components/frontpage/Footer';
// // import Home from './components/frontpage/home/Home';
// // import ContactInfo from './components/frontpage/contact/ContactInfo';
// // import Invoices from './components/frontpage/invoice/Invoice';
// // import History from './components/frontpage/history/History';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Header />n
// //         <main>
// //           <Routes>
// //             <Route path="/" element={<Home />} />
// //             <Route path="/invoices" element={<Invoices />} />
// //             <Route path="/history" element={<History />} />
// //           </Routes>
// //         </main>
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/frontpage/Header';
import Footer from './components/frontpage/Footer';
import Home from './components/frontpage/home/Home';
import Invoices from './components/frontpage/invoice/Invoice';
import History from './components/frontpage/history/History';
import Login from './components/frontpage/login/login'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(!isAuthenticated); 

  const handleClose = () => setShowModal(false);

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <>
          <Login show={showModal} handleClose={handleClose} />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login show={true} handleClose={() => {}} />} />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
