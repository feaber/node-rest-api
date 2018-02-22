import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default class RouteError extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1 className="page-header text-overflow">Routing error</h1>

        <Row>
          <Col xs={12}>
            <div className="panel">
              <div className="panel-heading">
                <h3 className="panel-title">404 Page not found</h3>
              </div>
              <div className="panel-body">
                The page cannot be found...
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
