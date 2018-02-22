import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'


export default class CustomerList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      customer_list: [],
      invoice_items: []
    }
  }

  componentDidMount() {
    axios.get('/api/customers', {}).then(function(response) {
      this.setState({
        customer_list: response.data
      })
    }.bind(this)).catch(function(error) {
      console.log(error)
    })
  }

  render() {
    let show_table = (this.state.customer_list.length > 0)

    return (
      <div>
        <h3>Customer list</h3>

        {show_table &&
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>phone</th>
              <th>address</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customer_list.map((item) =>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
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
