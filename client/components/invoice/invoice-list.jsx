import React from 'react'
import { Row, Col, Table, Button } from 'react-bootstrap'
import axios from 'axios'
import {Link} from 'react-router'


export default class InvoiceList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      invoice_list: []
    }
  }

  componentDidMount() {
    axios.get('/api/invoices', {}).then(function(response) {
      this.setState({
        invoice_list: response.data
      })
    }.bind(this)).catch(function(error) {
      console.log(error)
    })
  }

  render() {
    let show_table = (this.state.invoice_list.length > 0)

    return (
      <div>
        <h3>Invoice list</h3>

        <Link to="/invoices/add" className="btn btn-primary">Add new invoice</Link>

        {show_table &&
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>customer</th>
              <th>discount</th>
              <th>total</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {this.state.invoice_list.map((item) =>
              <tr>
                <td>{item.id}</td>
                <td>{item.customer}</td>
                <td>{item.discount}</td>
                <td>{item.total}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
              </tr>
            )}
          </tbody>
        </Table>}
      </div>
    )
  }
}
