import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default class Customer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Customer</h1>
        {this.props.children}
      </div>
    )
  }
}
