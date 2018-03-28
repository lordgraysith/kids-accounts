import React, { Component } from 'react'
import { Grid, Cell } from 'react-md'
import { Link } from 'react-router-dom'
import { getAllKids } from '../../stores/kids'
import './index.css'

class Kids extends Component {
  state = { kids: [] }

  componentWillMount () {
    getAllKids().then(kids => this.setState({ kids }))
  }

  render () {
    const { kids } = this.state
    return (
      <Grid>
        {kids.map(kid => {
          return (
            <Cell key={kid.id}>
              <Link to={`/kid/${kid.id}`}>{kid.name}</Link>
            </Cell>
          )
        })}
      </Grid>
    )
  }
}

export default Kids
