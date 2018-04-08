import React, { Component } from 'react'
import { Grid, Cell, Button, CircularProgress } from 'react-md'
// import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getAllKids } from '../../stores/kids'
import './index.css'

class Kids extends Component {
  state = { kids: [], loading: true }

  componentWillMount () {
    getAllKids().then(kids => this.setState({ kids, loading: false }))
  }

  navigate (path) {
    this.props.history.push(path)
  }

  render () {
    const { kids, loading } = this.state
    return (
      <div>
        {loading && <CircularProgress id='loading' />}
        {!loading &&
          <Grid>
            {kids.map(kid => {
              return (
                <Cell key={kid.id} size={2} desktopSize={4}>
                  <Button
                    raised
                    onClick={() => this.navigate(`/kid/${kid.id}`)}
                  >
                    {kid.name}
                  </Button>
                </Cell>
              )
            })}
          </Grid>}
      </div>
    )
  }
}

export default withRouter(Kids)
