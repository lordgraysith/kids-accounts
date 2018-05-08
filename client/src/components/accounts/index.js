import React, { Component } from 'react'
import { Grid, Cell, Button, CircularProgress } from 'react-md'
// import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getKidWithAccounts } from '../../stores/accounts'
import './index.css'

class Accounts extends Component {
  constructor (props) {
    super(props)
    const { match } = props
    this.id = match.params.id
  }
  state = { kid: {}, loading: true }

  componentWillMount () {
    getKidWithAccounts(this.id).then(kid =>
      this.setState({ kid, loading: false })
    )
  }

  navigate (path) {
    this.props.history.push(path)
  }

  render () {
    const { kid, loading } = this.state
    const { accounts } = kid
    return (
      <div className='main-kids'>
        {loading && <CircularProgress id='loading' />}
        {!loading &&
          <div>
            <Button id='back' icon onClick={() => this.props.history.goBack()}>
              <i className='material-icons'>arrow_back</i>
            </Button>
            <h1 className='center header'>{kid.name}'s Accounts</h1>

            <Grid>
              {accounts.map(account => {
                return (
                  <Cell key={account.id} size={2} desktopSize={4}>
                    <Button
                      raised
                      onClick={() =>
                        this.navigate(`/kid/${kid.id}/account/${account.id}`)}
                    >
                      {account.accountType}
                    </Button>
                  </Cell>
                )
              })}
            </Grid>
          </div>}
      </div>
    )
  }
}

export default withRouter(Accounts)
