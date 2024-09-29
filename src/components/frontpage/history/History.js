import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import { db } from '../invoice/firebase'; // Make sure this points to your Firebase initialization
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import './history.css';

function History() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(''); // State for start date
  const [endDate, setEndDate] = useState(''); // State for end date
  const [filteredData, setFilteredData] = useState([]); // State for filtered
  const [totalSum, setTotalSum] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

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
    const docRef = doc(db, 'invoices', id);
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
      const itemDate = new Date(item.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });

    if (filtered.length === 0) {
      alert('No data found for the selected date range');
    }

    setFilteredData(filtered);
    calculateTotalSum(filtered);
  }; 

  // Function to calculate the sum of the 'total' column
  const calculateTotalSum = (dataToSum) => {
    const sum = dataToSum.reduce((acc, item) => acc + (item.total || 0), 0);
    setTotalSum(sum);
  };

  // Search functionality
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(item => 
      item.Invoice_No.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Customer_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.consignee && item.consignee.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filtered.length === 0) {
      alert('No data found for the search term');
    }

    setFilteredData(filtered);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log('Imported Data:', jsonData);

      for (const row of jsonData) {
        const formattedData = {
          Invoice_No: row['Invoice_No'] || '',
          date: row['Date'] || '',
          Customer_Name: row['Customer_Name'] || '',
          Mode_Of_Payment: row['Mode_Of_Payment'] || '',
          Gst_No: row['GST_No'] || '',
          Billing_Address: row['Billing_Address'] || '',
          CGST: row['CGST'] || '',
          SGST: row['SGST'] || '',
          IGST: row['IGST'] || '',
          TaxableAmount: row['TaxableAmount'] || '0.00',
          NonTaxableAmount: row['NonTaxableAmount'] || '0.00',
          discount: row['Discount'] || '0.00',
          total: parseFloat(row['total']) || 0,
          awbNo: row['awbNo'] ? [row['awbNo']] : [],
          consignee: row['Consignee'] ? [row['Consignee']] : [],
          destination: row['Destination'] ? [row['Destination']] : [],
          product: row['Product'] ? [row['Product']] : [],
          pcs: row['Pcs'] ? [row['Pcs']] : [],
          weight: row['Weight'] ? [row['Weight']] : [],
          price: row['Price'] ? [row['Price']] : [],
          ds: row['ds'] ? [row['ds']] : [],
          networkNo: row['networkNo'] ? [row['networkNo']] : [],
        };

        try {
          await addDoc(collection(db, 'invoices'), formattedData);
          console.log('Data inserted:', formattedData);
        } catch (error) {
          console.error('Error inserting data:', error);
        }
      }

      fetchDataFromFirebase(); // Refresh the data after import
    };

    reader.readAsArrayBuffer(file);
  };

  const handleExport = () => {
    if (filteredData.length === 0) {
      alert('No data found for export');
      return;
    }

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
        item.weight?.length || 0
      );

      const rows = Array.from({ length: maxLength }).map((_, index) => ({
        srNo: item.srNo?.[index] || '',
        Invoice_No: item.Invoice_No || '',
        Date: item.date || '',
        Customer_Name: item.Customer_Name || '',
        Mode_Of_Payment: item.Mode_Of_Payment || '',
        GST_No: item.Gst_No || '',
        Billing_Address: item.Billing_Address || '',
        Consignee: item.consignee?.[index] || '',
        Destination: item.destination?.[index] || '',
        Product: item.product?.[index] || '',
        Pcs: item.pcs?.[index] || '',
        Weight: item.weight?.[index] || '',
        Price: item.price?.[index] || '',
        TaxableAmount: item.TaxableAmount || '',
        NonTaxableAmount: item.NonTaxableAmount || '',
        CGST: item.CGST || '',
        SGST: item.SGST || '',
        IGST: item.IGST || '',
        total: item.total || '',
        ds: item.ds?.[index] || '',
        networkNo: item.networkNo?.[index] || '',
        awbNo: item.awbNo?.[index] || ''
      }));

      return rows;
    });

    const flattenedExportData = exportData.flat();
    const headers = [
      'Sr No', 'Invoice No', 'Date', 'Consignee', 'Destination', 'Product', 'Pcs',
      'Weight', 'Price', 'Taxable Amount', 'Non-Taxable Amount', 'CGST',
      'SGST', 'Total', 'DS', 'Network No', 'AWB No',
      'Customer Name', 'Mode of Payment', 'GST No', 'Billing Address'
    ];

    const worksheet = XLSX.utils.json_to_sheet(flattenedExportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered_History');
    XLSX.writeFile(workbook, 'Filtered_History.xlsx');
  };

  const deleteDataFromFirebase = async (id) => {
    try {
      await deleteDoc(doc(db, 'invoices', id));
      fetchDataFromFirebase(); // Refetch data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <h1>History</h1>
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
              <button 
                className="import-btn" 
                onClick={() => document.getElementById('hiddenFileInput').click()}>
                Import
              </button>
              <input 
                type="file" 
                id="hiddenFileInput" 
                accept=".xlsx, .xls" 
                onChange={handleImport} 
                style={{ display: 'none' }} 
              />
            </div>

            <div className="export-btn-container">
              <span className="button-text">Download Excel File</span>
              <button className="export-btn" onClick={handleExport}>Export</button>
            </div>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by Invoice No, Name, or Consignee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <button className="search-button" onClick={handleSearch}>🔍</button>
        </div>

      </div>

    <div className="tablee-container" style={{ maxHeight: '800px', width: '100%' }}> 
      <table className="tablee mt-3" style={{ minWidth: '1000px' }}>
        <thead>
          <tr>
            <th>Sr. No.</th> {/* Add the Sr. No. header */}
            <th>Date</th>
            <th>Invoice No</th>
            <th>Customer Name</th>
            <th>Mode of Payment</th>
            <th>Gst No</th>
            <th>Billing Address</th>
            <th>AWB No</th>
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
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td> {/* Display Sr. No. */}
              <td>{item.date || ''}</td>
              <td>{item.Invoice_No || ''}</td>
              <td>{item.Customer_Name || ''}</td>
              <td>{item.Mode_Of_Payment || ''}</td>
              <td>{item.Gst_No || ''}</td>
              <td>{item.Billing_Address || ''}</td>
              <td>{item.awbNo ? item.awbNo.join(', ') : ''}</td>
              <td>{item.consignee ? item.consignee.join(', ') : ''}</td>
              <td>{item.destination ? item.destination.join(', ') : ''}</td>
              <td>{item.product ? item.product.join(', ') : ''}</td>
              <td>{item.pcs ? item.pcs.join(', ') : ''}</td>
              <td>{item.weight ? item.weight.join(', ') : ''}</td>
              <td>{item.price ? item.price.join(', ') : ''}</td>
              <td>{item.TaxableAmount || ''}</td>
              <td>{item.NonTaxableAmount || ''}</td>
              <td>{item.CGST || ''}</td>
              <td>{item.SGST || ''}</td>
              <td>{item.IGST || ''}</td>
              <td>{item.total || ''}</td>
              <td>
                <button className="dbtn" onClick={() => deleteDataFromFirebase(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>





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


