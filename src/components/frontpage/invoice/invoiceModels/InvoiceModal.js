import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logoimage from '../invoiceModels/malhi.png';

// Import Firestore functionality
import { db } from '../firebase'; // Ensure this imports your initialized Firebase instance
import { collection, addDoc } from 'firebase/firestore';

class InvoiceModal extends React.Component {
  
  // Function to send invoice data to Firestore
  sendInvoiceToFirestore = async () => {
  const invoiceData = {
    date: this.props.info.dateOfIssue || '',
    Invoice_No: this.props.info.billinvoiceno || '',
    Customer_Name: this.props.info.billTo || '',
    Mode_Of_Payment: this.props.info.billmodepayment || '',
    Gst_No: this.props.info.billGstno || '',
    Billing_Address: this.props.info.billToAddress || '',
    awbNo: this.props.items.map(item => item.awbb || ''),      // Array of AWB numbers
    consignee: this.props.items.map(item => item.consignee || ''),
    destination: this.props.items.map(item => item.destination || ''),
    product: this.props.items.map(item => item.product || ''),
    networkNo: this.props.items.map(item => item.networkno || ''),
    ds: this.props.items.map(item => item.dsa || ''),
    pcs: this.props.items.map(item => item.pcs || ''),
    weight: this.props.items.map(item => item.weight || ''),
    price: this.props.items.map(item => item.price || ''),
    TaxableAmount: this.props.valueWithoutGst || 0,
    NonTaxableAmount: this.props.NonTaxableAmount || 0,
    discount: this.props.discount || 0,
    CGST: this.props.CGSTAmount || 0,
    SGST: this.props.SGSTAmount || 0,
    IGST: this.props.IGSTAmount || 0,
    total: (this.props.subTotal - this.props.discount) || 0,
  };

  console.log('Data being sent to Firestore:', invoiceData);

  try {
    const docRef = await addDoc(collection(db, 'invoices'), invoiceData);
    console.log('Invoice successfully saved to Firestore with ID:', docRef.id);
  } catch (e) {
    console.error('Error saving invoice to Firestore:', e);
  }
};


  // Function to generate invoice PDF
  GenerateInvoice = () => {
    const pdfName = this.props.info.billTo ? `${this.props.info.billTo}.pdf` : 'default-invoice-name.pdf';
    // const invcn =this.props.info.billinvoiceno ? `${this.props.info.billinvoiceno}.pdf` : 'default-invoice-name.pdf';

    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(pdfName);
    });
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-2">
              <div className="w-50">
                <img
                  src={logoimage}
                  alt={this.props.info.billFrom || 'Company Logo'}
                  className="company-logo"
                  style={{ width: '300px', height: '150px' }}
                />
              </div>

              <div className="text-center me-3">
                <h5 className="fw-bold text-primary">{'Malhi Enterprises'}</h5>
                <div className="me-5">
                  <p style={{ fontWeight: 'bold', color: '#000000',margin: '0'  }}>
                  <strong>
                    JALANDHAR CANTT HEAD POST OFFICE, JASVIR SINGH S/O AJIT SINGH, OLD PHAGWARA ROAD, DEEP NAGAR, JALANDHAR
                    <br />
                    JALANDHAR PUNJAB-144005<br />
                    GST No.:03DDOPM9654Q1ZJ<br />PAN No.:DDOPM9654Q<br />
                    Contact No:- +91 7719674619
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <Row className="mb-4">
                <Col md={4} className="me-5">
                  <div className="fw-bold">Billed to:</div>
                  <div>
                    <p>
                      <strong>
                        Bill To: {this.props.info.billTo || ''}<br />
                        Address: {this.props.info.billToAddress || ''}<br />
                        GST No: {this.props.info.billGstno || ''}
                      </strong>
                    </p>
                  </div>
                </Col>

                <Col md={4} className="ms-5">
                  <div className="fw-bold">Billing Details:</div>
                  <div>
                    <p>
                      <strong>
                        Invoice NO: {this.props.info.billinvoiceno || ''}<br />
                        Date: {this.props.info.dateOfIssue || ''}<br />
                        Mode of Payment: {this.props.info.billmodepayment || ''}
                      </strong>
                    </p>
                  </div>
                </Col>
              </Row>

              <Table className="table table-responsive" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead className="small">
                  <tr>
                    <th style={{ width: '40px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Sr.No</th>
                    <th style={{ width: '90px',fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Date</th>
                    <th style={{ width: '70px' ,fontSize: '11px', fontWeight: 'bold', color: '#000'}}>Awb No</th>
                    <th style={{ width: '90px',fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Consignee</th>
                    <th style={{ width: '70px',fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Destination</th>
                    <th style={{ width: '70px' ,fontSize: '11px', fontWeight: 'bold', color: '#000'}}>Product</th>
                    <th style={{ width: '90px' ,fontSize: '11px', fontWeight: 'bold', color: '#000'}}>Network No</th>
                    <th style={{ width: '50px' ,fontSize: '11px', fontWeight: 'bold', color: '#000'}}>D/S</th>
                    <th style={{ width: '50px' ,fontSize: '11px', fontWeight: 'bold', color: '#000'}}>Pcs</th>
                    <th style={{ width: '60px' ,fontSize: '11px', fontWeight: 'bold', color: '#000'}}>Weight</th>
                    <th></th>
                    <th style={{ width: '50px' ,fontSize: '11px', fontWeight: 'bold', color: '#000'}} className="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map((item, i) => (
                    <tr id={i} key={i}>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{i + 1}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{this.props.info.dateOfIssue}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.awbb}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.consignee}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.destination}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.product}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.networkno}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.dsa}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.pcs}</td>
                      <td style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.weight}</td>
                      <td></td>
                      <td className="text-end" style={{ fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between', // Distributes space evenly between items
                gap: '20px' // Adds space between items
              }}>
                <div style={{ flex: 1 }}>
                  <p><strong><br/><br/><br/><br/><h4>Bank detail </h4>
                  <b>Bank name :-</b> Kotak Mahindra <br/>
                  <b>Name :-</b> Malhi Enterprises <br/>
                  <b>Ac no :-</b> 5148114343<br/>
                  <b>IFSC code :-</b>KKBK0004020</strong></p>
                </div>
                <div style={{ flex: 1 }}>
                  <Table style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                    <tbody>
                      <tr>
                        <td> </td>
                        <td> </td>
                      </tr>
                      {this.props.valueWithoutGs !== 0.00 &&
                      <tr className="text-end">
                        <td></td>
                        <td className="fw-bold" style={{ width: '90px' }}>Taxable Amount</td>
                        <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.valueWithoutGst}</td>
                      </tr>}
                      {this.props.NonTaxable !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '90px' }}>NonTaxable </td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.NonTaxableAmount}</td>
                        </tr>
                      }
                      {this.props.discountt !== 0.00 &&     
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '90px' }}>Discount -</td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.discount}</td>
                        </tr>
                      }
                      {this.props.CGST !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '90px' }}>CGST {this.props.info.CGST}%</td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.CGSTAmount}</td>
                        </tr>
                      }
                      {this.props.SGST !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '90px' }}>SGST {this.props.info.SGST}%</td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.SGSTAmount}</td>
                        </tr>
                      }
                      {this.props.IGST !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '90px' }}>IGST {this.props.info.IGST}%</td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.IGSTAmount}</td>
                        </tr>
                      }
                      <tr className="text-end">
                        <td></td>
                        <td className="fw-bold" style={{ width: '90px' }}>TOTAL</td>
                        <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {(this.props.subTotal-this.props.discount)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <td>
                <strong>
                  <h5>TERMS & CONDITION:</h5>
                  1. Payment of this invoice should be by crossed account payee cheque / demand draft in favour of Malhi Enterprises.<br/>
                  2. Kindly notify us in writing regarding any discrepancy in this invoice within seven days. Otherwise, this invoice shall be deemed to be correct and payable by you.<br/>
                  3. Interest @2% per month will be charged on delayed payments.<br/>
                  4. Any discrepancy in this invoice must communicate in writing within 7 days of date of invoice.<br/>
                  5. This is a computer-generated invoice with Digital Signature. Does not require signature.<br/><br/><br/><br/><br/>
                  Authorized Signatory
                </strong>
              </td>
            </div>
          </div>

          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button variant="primary" className="d-block w-100" onClick={() => {
                  this.sendInvoiceToFirestore();  // Save to Firestore
                  this.GenerateInvoice();         // Generate the PDF
                }}>
                  <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />
                  Send Invoice
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={this.GenerateInvoice}>
                  <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <hr className="mt-4 mb-3" />
      </div>
    );
  }
}

export default InvoiceModal;
