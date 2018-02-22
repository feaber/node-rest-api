import React from 'react'
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import {Link} from 'react-router'

export default class InvoiceItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      product_list: this.props.productList,
      item_id: this.props.itemId,
      item_data: this.props.itemData,
      price: 0.00,
      total: 0.00
    }
  }

  componentWillMount() {
    let new_price = this.findProductPrice(this.props.itemData.product_id)

    this.setState({
      price: this.findProductPrice(this.props.itemData.product_id),
      total: this.recalculateTotal(this.state.item_data.quantity, new_price)
    })
  }

  componentWillReceiveProps(newProps) {
    let new_price = this.findProductPrice(this.props.itemData.product_id)

    this.setState({
      product_list: newProps.productList,
      item_id: newProps.itemId,
      item_data: newProps.itemData,
      price: new_price,
      total: this.recalculateTotal(newProps.itemData.quantity, new_price)
    })
  }

  handleProductChange(event) {
    let item_data = {
      ...this.state.item_data,
      product_id: event.target.value
    }

    let new_price = this.findProductPrice(event.target.value)

    this.setState({
      item_data: item_data,
      price: new_price,
      total: this.recalculateTotal(this.state.item_data.quantity, new_price)
    })

    this.props.onChange(this.state.item_id, item_data)
  }

  handleQuantityChange(event) {
    let item_data = {
      ...this.state.item_data,
      quantity: event.target.value,
    }

    this.setState({
      item_data: item_data,
      total: this.recalculateTotal(event.target.value, this.state.price)
    })

    this.props.onChange(this.state.item_id, item_data)
  }

  recalculateTotal(qty, price) {
    let total = 0

    total = price * parseInt(qty)
    return isNaN(total) ? 0 : total
  }

  findProductPrice(product_id) {
    let price = 0

    this.state.product_list.forEach((item) => {
      if (item.id == product_id) price = item.price
    })

    return price
  }

  render() {
    let show_product_list = (this.state.product_list.length > 0)

    return (
      <div>
        <Row>
          <Col md={3}>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Product</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={(e) => this.handleProductChange(e) }>
                {show_product_list && this.state.product_list.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
              </FormControl>
            </FormGroup>
          </Col>
          <Col md={3}>
            Price: {this.state.price}
          </Col>
          <Col md={3}>
            <FormGroup controlId="quantity">
              <ControlLabel>Quantity</ControlLabel>
              <FormControl
                type="number"
                value={this.state.item_data.quantity}
                onChange={(e) => this.handleQuantityChange(e)}
              />
            </FormGroup>
          </Col>
          <Col md={3}>
            Item total: {parseFloat(Math.round(this.state.total * 100) / 100).toFixed(2)}
          </Col>
        </Row>
      </div>
    )
  }
}
