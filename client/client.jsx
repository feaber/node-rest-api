import BootstrapCss from 'bootstrap/dist/css/bootstrap.css'
import BootstrapJS from 'bootstrap/dist/js/bootstrap.min.js'

import '../assets/sass/main.scss'

import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import ReactDOM from 'react-dom'

import Main from './components/main.jsx'

import Invoice from './components/invoice/'
import InvoiceList from './components/invoice/invoice-list.jsx'
import InvoiceAddForm from './components/invoice/invoice-add-form.jsx'
import InvoiceEditForm from './components/invoice/invoice-edit-form.jsx'
import Product from './components/product/'
import ProductList from './components/product/product-list.jsx'
import Customer from './components/customer/'
import CustomerList from './components/customer/customer-list.jsx'
import RouteError from './components/custom/route-error.jsx'


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Invoice}/>
      <Route path="invoices" component={Invoice}>
        <IndexRoute component={InvoiceList}/>
        <Route path="list" component={InvoiceList}/>
        <Route path="add" component={InvoiceAddForm}/>
        <Route path="edit/:id" component={InvoiceEditForm}/>
      </Route>
      <Route path="products" component={Product}>
        <IndexRoute component={ProductList}/>
      </Route>
      <Route path="customers" component={Customer}>
        <IndexRoute component={CustomerList}/>
      </Route>
      <Route path="*" component={RouteError}/>
    </Route>
  </Router>, document.getElementById('client-app'))
