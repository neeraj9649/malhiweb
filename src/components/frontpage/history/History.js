import React, { useState, useEffect,useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import { db } from '../invoice/firebase'; // Make sure this points to your Firebase initialization
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import './history.css';

function History() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(''); // State for start date
  const [endDate, setEndDate] = useState(''); // State for end date
  const [filteredData, setFilteredData] = useState([]); // State for filtered
  const [totalSum, setTotalSum] = useState(0);

  // Fetching data from Firebase Firestore
  const fetchDataFromFirebase = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'invoices'));
      const firebaseData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort data by date in descending order
      const sortedData = firebaseData.sort((a, b) => new Date(b.date) - new Date(a.date));
      // Log the fetched data
    console.log('Fetched Data from Firebase:', firebaseData);
      setData(sortedData);
      setFilteredData(sortedData);
      calculateTotalSum(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []); 

  // Update data in Firebase (e.g., after editing data in the table)
  const updateDataInFirebase = async (id, updatedData) => {
    const docRef = doc(db, 'invoices', id); // Replace 'invoices' with your collection name
    await updateDoc(docRef, updatedData);
    console.log('Data updated successfully');
    fetchDataFromFirebase(); // Refetch the data after updating
  };

  useEffect(() => {
    fetchDataFromFirebase(); // Fetch data when the component loads
  }, []);
// Handle filtering data based on the selected date range
  const handleFilterByDate = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const filtered = data.filter((item) => {
      const itemDate = new Date(item.date); // Assuming 'date' field exists in Firebase documents
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });

    if (filtered.length === 0) {
      alert('No data found for the selected date range');
    }

    setFilteredData(filtered); // Update the filtered data
    calculateTotalSum(filtered); // Update the sum based on filtered data
  };
// Function to calculate the sum of the 'total' column
  const calculateTotalSum = (dataToSum) => {
    const sum = dataToSum.reduce((acc, item) => acc + (item.total || 0), 0); // Sum up the 'total' column
    setTotalSum(sum); // Set the sum in state
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log('Imported Data:', jsonData);

      // Optional: Update Firebase with imported data
      jsonData.forEach((item) => {
        const docRef = doc(db, 'invoices', item.id); // Assuming each row in the sheet has an 'id' field
        updateDataInFirebase(item.id, item);
      });
    };
    reader.readAsArrayBuffer(file);
  };

const handleExport = () => {
  // Check if filtered data is available
  if (filteredData.length === 0) {
    alert('No data found for export');
    return;
  }

  // Process the filtered data to flatten array fields
  const exportData = filteredData.map(item => {
    const maxLength = Math.max(
      item.product?.length || 0,
      item.price?.length || 0,
      item.srNo?.length || 0,
      item.destination?.length || 0,
      item.ds?.length || 0,
      item.networkNo?.length || 0,
      item.consignee?.length || 0,
      item.pcs?.length || 0,
      item.awbNo?.length || 0,
      item.weight?.length || 0 // Included weight array length check
    );

    // Create multiple rows if array lengths are greater than 1
    const rows = Array.from({ length: maxLength }).map((_, index) => ({
      Invoice_No: item.Invoice_No || '',
      date: item.date || '',
      Customer_Name: item.Customer_Name || '',    // From this.props.info.billTo
      Mode_Of_Payment: item.Mode_Of_Payment || '',// From this.props.info.billmodepayment
      Gst_No: item.Gst_No || '',                  // From this.props.info.billGstno
      Billing_Address: item.Billing_Address || '', // From this.props.info.billToAddress
      consignee: item.consignee?.[index] || '',
      destination: item.destination?.[index] || '',
      product: item.product?.[index] || '',
      pcs: item.pcs?.[index] || '',
      weight: item.weight?.[index] || '', // Add weight array value here
      price: item.price?.[index] || '',
      taxableAmount: item.taxableAmount || '',
      nonTaxableAmount: item.nonTaxableAmount || '',
      CGST: item.CGST || '',
      SGST: item.SGST || '',
      total: item.total || '',
      srNo: item.srNo?.[index] || '',
      ds: item.ds?.[index] || '',
      networkNo: item.networkNo?.[index] || '',
      awbNo: item.awbNo?.[index] || ''
    }));

    return rows;
  });

  // Flatten the array of arrays into a single array of rows
  const flattenedExportData = exportData.flat();

  // Convert the flattened data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(flattenedExportData);
  const workbook = XLSX.utils.book_new();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered_History');

  // Write the workbook to a file
  XLSX.writeFile(workbook, 'Filtered_History.xlsx');
};



  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <h1>History</h1>
      {/* history header */}
          <div className='historyhead'> 
            <div className="filter-section">
              <h1>Filter</h1>
              <label htmlFor="start-date">Start Date:</label>
              <input 
                type="date" 
                id="start-date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)} 
              />
              <label htmlFor="end-date">End Date:</label>
              <input 
                type="date" 
                id="end-date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} 
              />
              <button className="done-btn" onClick={handleFilterByDate}>Done</button>
            </div>

            <div className="import-export-section">
              <h1>Import/Export</h1>
              <div className="button-group">
                <div className="import-btn-container">
                  <span className="button-text">Add Excel File</span>
                  <button className="import-btn">Import</button>
                </div>
                <div className="export-btn-container">
                  <span className="button-text">Download Excel File</span>
                  <button className="export-btn" onClick={handleExport}>Export</button> {/* Add onClick handler */}
                </div>
              </div>
            </div>

              <div className="search-bar">
                <h1>Search</h1>
                <input type="search" placeholder="Search here" />
                <i className="fas fa-search"></i>
              </div>
          </div>


      {/* --------4564------ */}

      {/* Display data in a table for visualization */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Date</th>
            <th>Invoice No</th>
            <th>Customer Name</th>
            <th>Mode of Payment</th>
            <th>Gst No</th>
            <th>Billing Address</th>
            <th>Consignee</th>
            <th>Destination</th>
            <th>Product</th>
            <th>Pcs</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Taxable Amount</th>
            <th>Non-Taxable Amount</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>IGST</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.date || ''}</td>
              <td>{item.Invoice_No || ''}</td>
              <td>{item.Customer_Name || ''}</td>
              <td>{item.Mode_Of_Payment || ''}</td>
              <td>{item.Gst_No || ''}</td>
              <td>{item.Billing_Address || ''}</td>
              <td>{item.consignee || ''}</td>
              <td>{item.destination || ''}</td>
              <td>{item.product || ''}</td>
              <td>{item.pcs || ''}</td>
              <td>{item.weight || ''}</td>
              <td>{item.price || ''}</td>
              <td>{item.taxableAmount || ''}</td>
              <td>{item.nonTaxableAmount || ''}</td>
              <td>{item.CGST || ''}</td>
              <td>{item.SGST || ''}</td>
              <td>{item.IGST || ''}</td>
              <td>{item.total || ''}</td>
              <td>
                <button 
                  className="btn btn-sm btn-warning"
                  onClick={() => updateDataInFirebase(item.id, { ...item, total: item.total + 10 })} // Example: increase total by 10
                >
                  Update Total
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Text box to display the sum of the 'total' column */}
      <div className="total-sum-section mt-3">
    <label htmlFor="total-sum">Total Sale:</label>
    <input 
      type="text" 
      id="total-sum" 
      value={totalSum} 
      readOnly 
      className="form-control" 
    />
  </div>


    </div>
  );
}

export default History;
