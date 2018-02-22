import React from 'react'
import { Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import axios from 'axios'


export default class InvoiceEditForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customer_list : [],
      products: [],
      invoice_items: []
    }
  }

  componentDidMount() {
  }

  addNewInvoiceItem() {
  }

  removeInvoiceItem(index) {
  }

  render() {
    return (
      <div>
        <h3>Invoice form</h3>

        <form>

        </form>
      </div>
    )
  }
}
