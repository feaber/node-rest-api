import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default class Product extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Product</h1>
        {this.props.children}
      </div>
    )
  }
}
