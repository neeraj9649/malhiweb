import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(function(item) {
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel.bind(this)} key={item.id} currency={currency}/>
      )
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>Product Details</th>
              <th>PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button
  className="Addbtninv"
  onClick={this.props.onRowAdd}
  style={{
    backgroundColor: '#043e7b', // Background color
    color: 'white',         // Text color
    border: 'none',         // Remove border
    padding: '0.5rem 1rem', // Padding for better appearance
    borderRadius: '5px',    // Rounded corners
    cursor: 'pointer',       // Change cursor on hover
    transition: 'background-color 0.3s', // Transition effect
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'darkred')}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'green')}
>
  Add Item
</Button>

      </div>
    );

  }

}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
        <td style={{width: '300px'}}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "awbb",
            placeholder: "Enter AWB No.",
            value: this.props.item.awbb,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "consignee",
            placeholder: "Enter Consignee Name",
            value: this.props.item.consignee,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "destination",
            placeholder: "Enter Destination",
            value: this.props.item.destination,
            id: this.props.item.id
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "product",
            placeholder: "Enter Product Name",
            value: this.props.item.product,
            id: this.props.item.id
          }}/>
        </td>
        <td style={{width: '300px'}}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "networkno",
            placeholder: "Enter Network No.",
            value: this.props.item.networkno,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "dsa",
            placeholder: "Enter D/S",
            value: this.props.item.dsa,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "number",
            name: "pcs",
            placeholder: "Enter No of Pcs",
            value: this.props.item.pcs,
            id: this.props.item.id,
            step:"any",
            min:'0'            
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "number",
            name: "weight",
            placeholder: "Enter Total Weight in Kg",
            value: this.props.item.weight,
            id: this.props.item.id,
            step:"any",
            min:'0' 
          }}/>
        </td>
        <td style={{width: '200px'}}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            leading: this.props.currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: this.props.item.price,
            id: this.props.item.id,
          }}/>
        </td>
        <td className="text-center" style={{minWidth: '50px'}}>
          <BiTrash onClick={this.onDelEvent.bind(this)} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
        </td>
      </tr>
    );

  }

}

export default InvoiceItem;
