import React, { Component } from 'react'
import {
  Grid,
  Cell,
  Button,
  Paper,
  CircularProgress,
  TextField
} from 'react-md'
import { withRouter } from 'react-router'
import { getKidById } from '../../stores/kids'
import { makePayment } from '../../stores/payments'
import './index.css'

class Kid extends Component {
  constructor (props) {
    super(props)
    const { match } = props
    this.id = match.params.id
  }
  state = { kid: {}, loading: true }

  componentWillMount () {
    getKidById(this.id).then(kid => {
      this.setState({ kid, loading: false, makingPayment: false })
    })
  }

  async paymentClick (amount) {
    this.setState({
      amount,
      makingPayment: true,
      paymentDescription: '',
      otherAmount: undefined,
      withdrawAmount: undefined
    })
  }

  async confirmPayment (kidId, amount, description) {
    this.setState({ loading: true, makingPayment: false })
    let paymentAmount = amount
    if (amount === 'other') {
      paymentAmount = this.state.otherAmount
    }
    if (amount === 'withdraw') {
      paymentAmount = this.state.withdrawAmount * -1
    }
    const { mainAccount } = await makePayment(kidId, paymentAmount, description)
    this.setState({
      kid: Object.assign({}, this.state.kid, { mainAccount }),
      loading: false
    })
  }

  unconfirm () {
    this.setState({ makingPayment: false })
  }

  descriptionChange (value) {
    this.setState({
      paymentDescription: value
    })
  }

  otherAmountChange (value) {
    this.setState({
      otherAmount: value
    })
  }

  withdrawAmountChange (value) {
    this.setState({
      withdrawAmount: value
    })
  }

  formatNumber (num) {
    if (typeof num === 'number') {
      return num.toFixed(2)
    } else return num
  }

  render () {
    const {
      kid,
      makingPayment,
      loading,
      amount,
      paymentDescription
    } = this.state
    const balance = (kid && kid.mainAccount && kid.mainAccount.balance) || 0
    return (
      <div className='main-kid'>
        {loading && <CircularProgress id='loading' />}
        {!loading &&
          <div>
            <Button id='back' flat onClick={() => this.props.history.push('/')}>
              <i className='material-icons'>arrow_back</i>
            </Button>
            <h1 className='center'>{kid.name}</h1>
            <h2 className='center'>{`$${this.formatNumber(balance)}`}</h2>
            <Grid>
              <Cell size={1} desktopSize={3}>
                <Button raised onClick={() => this.paymentClick(15)}>
                  $15
                </Button>
              </Cell>
              <Cell size={1} desktopSize={3}>
                <Button raised onClick={() => this.paymentClick(10)}>
                  $10
                </Button>
              </Cell>
              <Cell size={1} desktopSize={3}>
                <Button raised onClick={() => this.paymentClick(5)}>
                  $5
                </Button>
              </Cell>
              <Cell size={1} desktopSize={3}>
                <Button raised onClick={() => this.paymentClick(1)}>
                  $1
                </Button>
              </Cell>
              <Cell size={1} desktopSize={3}>
                <Button raised onClick={() => this.paymentClick('other')}>
                  Other
                </Button>
              </Cell>
              <Cell size={1} desktopSize={3}>
                <Button raised onClick={() => this.paymentClick('withdraw')}>
                  Withdraw
                </Button>
              </Cell>
            </Grid>
            {makingPayment &&
              <Paper className='payment-paper'>
                {amount === 'other' &&
                  <TextField
                    id='other-amount'
                    type='number'
                    placeholder='Amount'
                    label='How much?'
                    onChange={value => this.otherAmountChange(value)}
                  />}
                {amount === 'withdraw' &&
                  <TextField
                    id='withdraw-amount'
                    type='number'
                    placeholder='Amount'
                    label='How much?'
                    onChange={value => this.withdrawAmountChange(value)}
                  />}
                <TextField
                  id='payment-description'
                  rows={1}
                  placeholder='Enter a description'
                  label='What is the purpose of this transaction?'
                  onChange={value => this.descriptionChange(value)}
                />
                <Grid>
                  <Cell size={2}>
                    <Button
                      raised
                      onClick={() =>
                        this.confirmPayment(kid.id, amount, paymentDescription)}
                    >
                      Confirm
                    </Button>
                  </Cell><Cell size={2}>
                    <Button raised onClick={() => this.unconfirm()}>
                      Cancel
                    </Button>
                  </Cell>
                </Grid>
              </Paper>}
          </div>}
      </div>
    )
  }
}

export default withRouter(Kid)
