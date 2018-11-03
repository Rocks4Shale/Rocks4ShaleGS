import React from 'react'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../store/order'
import {Link} from 'react-router-dom'

class OrderHistory extends React.Component {

  componentDidMount() {
    this.props.fetchOrderHistory(this.props.match.params.id)
  }

  render() {
    return (
      this.props.prevOrders ?
      <div>
        <h2>ORDER HISTORY</h2>
          <br/>
          {this.props.prevOrders.map(order => (
            <div key={order.id}>
              <Link to={`/orders/${order.id}`}>{order.id}</Link>
              <br />
            </div>
          ))}
      </div> :
      <h1>Loading..</h1>
    )
  }
}

const mapStatetoProps = state => ({
  prevOrders: state.order.prevOrders,
})

const mapDispatchToProps = dispatch => ({
  fetchOrderHistory: (userId) => dispatch(fetchOrderHistory(userId)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(OrderHistory)
