import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '₹',
      currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billstate: '',
      billToEmail: '',
      billGstno: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billinvoiceno: '',
      billFromAddress: '',
      billmodepayment: '',
      notes: '',
      total: '0.00',
      subTotal: '0.00',
      CGST : '',
      CGSTAmount: '0.00',
      SGST: '',
      SGSTAmount: '0.00',
      IGST: '',
      IGSTAmount: '0.00',
      NonTaxable:'0.00',
      discount:'',
      NonTaxableAmount:'0.00'
      
    };
    this.state.items = [
      {
        id: 0,
        name: '',
        awb:'',
        consignee:'',
        destination:'',
        product:'',
        networkno:'',
        dsa:'',
        pcs:'',
        weight:'',
        price: '',
        quantity: 1
      }
    ];
    this.editField = this.editField.bind(this);
  }
  componentDidMount(prevProps) {
    this.handleCalculateTotal()
  }
  handleRowDel = (itemToDelete) => {
    const items = this.state.items.filter(item => item.id !== itemToDelete.id);
    this.setState({ items }, this.handleCalculateTotal);
  }
  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var newItem = {
      id: id,
      name: '',
      awb:'',
      consignee:'',
      destination:'',
      product:'',
      networkno:'',
      dsa:'',
      pcs:'',
      weight:'',
      price: '',
      quantity: 1
    };this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }), this.handleCalculateTotal);
  }
handleCalculateTotal = () => {
    const subTotal = this.state.items.reduce((total, item) => {
      const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
      return total + itemTotal;
    }, 0).toFixed(2);

    this.setState({
      subTotal: parseFloat(subTotal).toFixed(2)
    }, () => {
      this.setState({
        CGSTAmount: parseFloat(parseFloat(subTotal) * (this.state.CGST / 100)).toFixed(2)
      }, () => {
        this.setState({
          SGSTAmount: parseFloat(parseFloat(subTotal) * (this.state.SGST / 100)).toFixed(2)
        }, () => {
          this.setState({
              IGSTAmount: parseFloat(parseFloat(subTotal) * (this.state.IGST / 100)).toFixed(2)
            }, () => {
              this.setState({
            total: (parseFloat(subTotal) + parseFloat(this.state.CGSTAmount)+ parseFloat(this.state.IGSTAmount)+parseFloat(this.state.SGSTAmount)).toFixed(2)
          });
        });
      });
    });
  });
  };

  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var items = this.state.items.slice();
    var newItems = items.map(function(items) {
      for (var key in items) {
        if (key === item.name && items.id === item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({items: newItems});
    this.handleCalculateTotal();
  };
  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.handleCalculateTotal();
  };
  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };
  openModal = (event) => {
    event.preventDefault()
    this.handleCalculateTotal()
    this.setState({isOpen: true})
  };
  closeModal = (event) => this.setState({isOpen: false});
  render() {
    return (<Form onSubmit={this.openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div class="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div class="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control type="date" value={this.state.dateOfIssue} name={"dateOfIssue"} onChange={(event) => this.editField(event)} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control type="number" value={this.state.invoiceNumber} name={"invoiceNumber"} onChange={(event) => this.editField(event)} min="1" style={{
                    maxWidth: '70px'
                  }} required="required"/>
              </div>
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control placeholder={"Name of customer"} rows={3} value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Enter the GST NO"} value={this.state.billGstno}  name="billGstno" className="my-2" onChange={(event) => this.editField(event)}  required="required"/>
                <Form.Control placeholder={"Billing address"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Billing Details:</Form.Label>
                <Form.Control placeholder={"Enter Invoice NO "} rows={3} value={this.state.billinvoiceno} type="text" name="billinvoiceno" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                {/* <Form.Control placeholder={"Email address"} value={this.state.billFromEmail} type="email" name="billFromEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/> */}
                <Form.Control placeholder={"Enter the mode of payment"} value={this.state.billmodepayment} type="text" name="billmodepayment" className="my-2" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
            </Row>
            <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Taxable Amount:
                  </span>
                  <span>{this.state.currency}
                    {this.state.subTotal}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Non-Taxable Amount:
                  </span>
                  <span>
                    <span className="small ">({this.state.NonTaxable || 0}%)</span>
                    {this.state.currency}
                    {this.state.NonTaxableAmount || 0}</span>
                </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount -
                  </span>
                  <span>
                    <span className="small "></span>
                    {this.state.currency}
                    {this.state.discount || 0}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">CGST:
                  </span>
                  <span>
                    <span className="small ">({this.state.CGST || 0}%)</span>
                    {this.state.currency}
                    {this.state.CGSTAmount || 0}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">SGST:</span>
                  <span>
                  <span className="small ">({this.state.SGST || 0}%)</span>
                    {this.state.currency}
                    {this.state.SGSTAmount || 0}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">IGST:
                  </span>
                  <span>
                    <span className="small ">({this.state.IGST || 0}%)</span>
                    {this.state.currency}
                    {this.state.IGSTAmount || 0}</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  <span className="fw-bold">{this.state.currency}
                    {(this.state.total - this.state.discount) || 0}</span>
                </div>
              </Col>
            </Row>
            <hr className="my-4"/>
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control placeholder="Thanks for your business!" name="notes" value={this.state.notes} onChange={(event) => this.editField(event)} as="textarea" className="my-2" rows={1}/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">Review Invoice</Button>
            <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} discount={this.state.discount} NonTaxableAmount={this.state.NonTaxableAmount} CGSTAmount={this.state.CGSTAmount} SGSTAmount={this.state.SGSTAmount} IGSTAmount={this.state.IGSTAmount} total={this.state.total}/>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select onChange={event => this.onCurrencyChange({currency: event.target.value})} className="btn btn-light my-1" aria-label="Change Currency">
                <option value="₹">INR (Indian Rupee)</option>
                <option value="$">USD (US Dollor)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">NonTaxableAmount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="NonTaxable" type="number" value={this.state.NonTaxable} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="discount" type="number" value={this.state.discount} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">CGST rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="CGST" type="number" value={this.state.CGST} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">SGST rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="SGST" type="number" value={this.state.SGST} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">IGST rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="IGST" type="number" value={this.state.IGST} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>)
  }
}

export default InvoiceForm;
