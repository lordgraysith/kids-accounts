import React, { Component } from 'react'
import { List, ListItem, Button, CircularProgress } from 'react-md'
import { withRouter } from 'react-router'
import { map } from 'lodash'
import { getKidAndAccount } from '../../stores/accounts'
// import { createTransaction, deleteTransaction } from '../../stores/transactions'
import './index.css'

class Account extends Component {
  constructor (props) {
    super(props)
    const { match } = props
    this.kidId = match.params.kidId
    this.accountId = match.params.accountId
  }
  state = { kid: {}, loading: true }

  componentWillMount () {
    getKidAndAccount(this.kidId, this.accountId).then(kid => {
      this.setState({ kid, loading: false })
    })
  }

  formatNumber (num) {
    if (typeof num === 'number') {
      return num.toFixed(2)
    } else return num
  }

  render () {
    const { kid, loading } = this.state
    const name = (kid && kid.account && kid.account.name) || ''
    const balance = (kid && kid.account && kid.account.balance) || 0
    const transactions = (kid && kid.account && kid.account.transactions) || []
    return (
      <div className='main-kid'>
        {loading && <CircularProgress id='loading' />}
        {!loading &&
          <div>
            <Button id='back' icon onClick={() => this.props.history.goBack()}>
              <i className='material-icons'>arrow_back</i>
            </Button>
            <h1 className='center'>{kid.name}'s {name}</h1>
            <h2 className='center'>{`${this.formatNumber(balance)}`}</h2>
            <List>
              {map(transactions, t => {
                return <ListItem />
              })}
            </List>
          </div>}
      </div>
    )
  }
}

export default withRouter(Account)
