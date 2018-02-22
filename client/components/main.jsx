import React from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

import Navigation from './custom/navigation.jsx'


export default class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Navigation />

        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
