import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'


export default class ProductList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      product_list: []
    }
  }

  componentDidMount() {
    axios.get('/api/products', {}).then(function(response) {
      this.setState({
        product_list: response.data
      })
    }.bind(this)).catch(function(error) {
      console.log(error)
    })
  }

  render() {
    let show_table = (this.state.product_list.length > 0)

    return (
      <div>
        <h3>Product list</h3>
        {show_table &&
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>createdAt</th>
              <th>updatedAt</th>
            </tr>
          </thead>
          <tbody>
            {this.state.product_list.map((item) =>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
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
