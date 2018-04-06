import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Kids from './components/kids'
import Kid from './components/kid'
import './App.css'

class App extends Component {
  state = {
    response: ''
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
