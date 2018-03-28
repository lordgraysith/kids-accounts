import React, { Component } from 'react'
import { getKidById } from '../../stores/kids'
import './index.css'

class Kid extends Component {
  constructor ({ match }) {
    super()
    this.id = match.params.id
  }
  state = { kid: {} }

  componentWillMount () {
    getKidById(this.id).then(kid => {
      this.setState({ kid })
    })
  }

  render () {
    const { kid } = this.state
    return <h1>{kid.name}</h1>
  }
}

export default Kid
