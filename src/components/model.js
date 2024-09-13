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
import logoimage from '../malhi.png';
// import './invoicemodel.css'

class InvoiceModal extends React.Component {

  GenerateInvoice = () => {
    const pdfName = this.props.info.billTo ? `${this.props.info.billTo}.pdf` : 'default-invoice-name.pdf';
    
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 792]
      });
      pdf.internal.scaleFactor = 1;
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
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <img 
                  src={logoimage} 
                  alt={this.props.info.billFrom || 'Company Logo'}
                  className="company-logo"
                  style={{ width: '380px', height: '200px' }} // Adjust width and height as needed
                />
              </div>

              <div className="text-center me-5">
                {/* Company Name (Highlighted) */}
                <h5 className="fw-bold text-primary">{'Malhi Enterprises'}</h5>

                {/* Company Address */}
                <div className="me-5">
                  <p style={{ fontWeight: 'bold', color: '#000000' }}>
                    <strong>
                      JALANDHAR CANTT HEAD POST OFFICE, JASVIR SINGH S/O AJIT SINGH, OLD PHAGWARA ROAD, DEEP NAGAR, JALANDHAR
                      <br />
                      JALANDHAR PUNJAB-144005<br/>
                      GST No.:03DDOPM9654Q1ZJ<br/>PAN No.:DDOPM9654Q<br/>
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
                        <strong>Bill To:</strong> {this.props.info.billTo || ''}<br/>
                        <strong>Address:</strong> {this.props.info.billToAddress || ''}<br/>
                        <strong>GST No:</strong> {this.props.info.billGstno || ''}
                      </strong>
                    </p>
                  </div>
                </Col>

                <Col md={4} className="ms-5">
                  <div className="fw-bold">Billing Details:</div>
                  <div>
                    <p>
                      <strong>
                        <strong>Invoice NO:</strong> {this.props.info.billinvoiceno || ''}<br/>
                        <strong>Date:</strong> {this.props.info.dateOfIssue || ''}<br/>
                        <strong>Mode of Payment:</strong> {this.props.info.billmodepayment || ''}
                      </strong>
                    </p>
                  </div>
                </Col>
              </Row>

              <Table className="table table-responsive" style={{ tableLayout: 'fixed', width: '100%' }}>
                <thead className="small">
                  <tr>
                    <th style={{ width: '40px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Sr.No</th>
                    <th style={{ width: '90px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Date</th>
                    <th style={{ width: '70px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Awb No</th>
                    <th style={{ width: '90px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Consignee</th>
                    <th style={{ width: '70px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Destination</th>
                    <th style={{ width: '70px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Product</th>
                    <th style={{ width: '90px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Network No</th>
                    <th style={{ width: '50px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>D/S</th>
                    <th style={{ width: '50px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Pcs</th>
                    <th style={{ width: '60px', fontSize: '11px', fontWeight: 'bold', color: '#000' }}>Weight</th>
                    <th></th>
                    <th style={{ width: '50px', fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }} className="text-end">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map((item, i) => {
                    return (
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
                        <td></td> {/* Empty column */}
                        <td className="text-end" style={{ width: '50px', fontSize: '11px', fontWeight: 'bold', color: '#000', overflowWrap: 'break-word' }}>
                          {item.price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between', // Distributes space evenly between items
                gap: '20px' // Adds space between items
              }}>
                <div style={{ flex: 1 }}>
                  <p><strong><br/><br/><br/><br/><br/><br/><h4>Bank detail </h4>
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
                        <td> </td>
                      </tr>
                      {this.props.valueWithoutGs !== 0.00 &&
                      <tr className="text-end">
                        <td></td>
                        <td className="fw-bold" style={{ width: '100px' }}>Taxable Amount</td>
                        <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.valueWithoutGs}</td>
                      </tr>}
                      {this.props.NonTaxable !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '100px' }}>NonTaxable </td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.NonTaxableAmount}</td>
                        </tr>
                      }
                      {this.props.discountt !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '100px' }}>Discount -</td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.discount}</td>
                        </tr>
                      }
                      {this.props.CGST !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '100px' }}>CGST {this.props.info.CGST}%</td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.CGSTAmount}</td>
                        </tr>
                      }
                      {this.props.SGST !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '100px' }}>SGST {this.props.info.SGST}%</td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.SGSTAmount}</td>
                        </tr>
                      }
                      {this.props.IGST !== 0.00 &&
                        <tr className="text-end">
                          <td></td>
                          <td className="fw-bold" style={{ width: '100px' }}>IGST {this.props.info.IGST}%</td>
                          <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {this.props.IGSTAmount}</td>
                        </tr>
                      }
                      <tr className="text-end">
                        <td></td>
                        <td className="fw-bold" style={{ width: '100px' }}>TOTAL</td>
                        <td className="text-end" style={{ width: '100px' }}>{this.props.currency} {(this.props.subTotal-this.props.discount)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>

              <td>
                <strong>
                  <h4>TERMS & CONDITION:</h4>
                  1. Payment of this invoice should be by crossed account payee cheque / demand draft in favour of Malhi Enterprises.<br/>
                  2. Kindly notify us in writing regarding any discrepancy in this invoice within seven days. Otherwise, this invoice shall be deemed to be correct and payable by you.<br/>
                  3. Interest @2% per month will be charged on delayed payments.<br/>
                  4. Any discrepancy in this invoice must communicate in writing within 7 days of date of invoice.<br/>
                  5. This is a computer-generated invoice with Digital Signature. Does not require signature.<br/><br/><br/>
                  Authorized Signatory
                </strong>
              </td>
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button variant="primary" className="d-block w-100" onClick={this.GenerateInvoice}>
                  <BiPaperPlane style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Send Invoice
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={this.GenerateInvoice}>
                  <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <hr className="mt-4 mb-3"/>
      </div>
    )
  }
}

export default InvoiceModal;
