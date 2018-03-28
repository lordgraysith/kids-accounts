import React, { Component } from 'react'
import { NavigationDrawer } from 'react-md'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import logo from './logo.svg'
import Kids from './components/kids'
import Kid from './components/kid'
import './App.css'

class App extends Component {
  state = {
    response: ''
  }

  componentDidMount () {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/hello')
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Kids} />
          <Route path='/kid/:id' component={Kid} />
        </div>
      </Router>
    )
  }
}

export default App
