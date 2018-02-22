import React from 'react'
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import axios from 'axios'

import InvoiceItem from './invoice-item.jsx'


export default class InvoiceAddForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customer_list : [],
      product_list: [],
      invoice_items: [],
      invoice_data: {
        customer_id: -1,
        discount: 0,
        total: 0
      }
    }
  }

  componentDidMount() {
    axios.get('/api/customers', {}).then(function(response) {
      this.setState({
        customer_list: response.data,
        invoice_data: {
          ...this.state.invoice_data,
          customer_id: (response.data && response.data[0]) ? response.data[0].id : -1
        }
      })
    }.bind(this)).catch(function(error) {
      console.log(error)
    })

    axios.get('/api/products', {}).then(function(response) {
      this.setState({
        product_list: response.data
      })
    }.bind(this)).catch(function(error) {
      console.log(error)
    })
  }

  addNewInvoiceItem(event) {
    event.preventDefault()

    let newItem = {
      product_id: (this.state.product_list.length > 0 ) ? this.state.product_list[0].id : -1,
      quantity: 0
    }

    this.setState({
      invoice_items: [...this.state.invoice_items, newItem]
    })
  }

  removeInvoiceItem(index) {
  }

  saveInvoice(event) {
    event.preventDefault()
    console.log('Save the invoice')
  }

  handleCustomerChange(event) {
    this.setState({
      invoice_data: {
        ...this.state.invoice_data,
        customer_id: event.target.value
      }
    })
  }

  handleDiscrountChange(event) {
    this.setState({
      invoice_data: {
        ...this.state.invoice_data,
        discount: event.target.value,
        total: this.recalculateTotal(this.state.invoice_items, event.target.value)
      }
    })
  }

  handleItemChange(index, item_data) {
    let invoice_items = this.state.invoice_items
        .slice(0, index)
        .concat([item_data])
        .concat(this.state.invoice_items
          .slice(index + 1))

    this.setState({
      invoice_items: invoice_items,
      invoice_data: {
        ...this.state.invoice_data,
        total: this.recalculateTotal(invoice_items, this.state.invoice_data.discount)
      }
    })
  }

  findProductPrice(product_id) {
    let price = 0

    this.state.product_list.forEach((item) => {
      if (item.id == product_id) price = item.price
    })

    return price
  }

  recalculateTotal(items, discount) {
    let total = 0

    if (!items || items.length == 0) return 0

    items.forEach((item) => {
      total += ((parseInt(item.quantity)) * this.findProductPrice(item.product_id))
    })

    if (discount > 0) {
      total = total - (total * (discount / 100))
    }

    return isNaN(total) ? 0 : total
  }

  render() {
    let show_invoice_items = (this.state.invoice_items.length > 0)
    let show_customer_list = (this.state.customer_list.length > 0)

    return (
      <div>
        <h3>Invoice form</h3>

        <form>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Customer</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              onChange={(e) => this.handleCustomerChange(e) }>
              {show_customer_list && this.state.customer_list.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
            </FormControl>
          </FormGroup>

          <FormGroup controlId="discount">
            <ControlLabel>Discount</ControlLabel>
            <FormControl
              type="number"
              value={this.state.invoice_data.discount}
              placeholder="Enter text"
              onChange={(e) => this.handleDiscrountChange(e)}
            />
          </FormGroup>


          <div className="invoice-items">
            <h4>Invoice items</h4>

            <Button
              bsStyle="success"
              type="submit"
              bsSize="xsmall"
              onClick={(e) => this.addNewInvoiceItem(e) }>Add new invoice item</Button>

              {show_invoice_items &&
                this.state.invoice_items.map((item, index) => <InvoiceItem
                  key={index}
                  itemId={index}
                  itemData={item}
                  productList={this.state.product_list}
                  onChange={this.handleItemChange.bind(this)}
                />)
              }
          </div>

          <div className="invoice-total">
            Total: {parseFloat(Math.round(this.state.invoice_data.total * 100) / 100).toFixed(2)}
          </div>

          <Button
            bsStyle="primary"
            type="submit"
            onClick={(e) => this.saveInvoice(e) }>Add invoice</Button>
        </form>
      </div>
    )
  }
}
