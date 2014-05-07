/** @jsx React.DOM */

var CartItem = React.createClass({
	render: function() {
		var totalPrice = this.props.data.quantity * this.props.data.price;
		return (
			<tr className="cartItem">
				<td>{this.props.data.name}</td>
				<td>{this.props.data.quantity}</td>
				<td>{this.props.data.price}</td>
				<td>{totalPrice}</td>
			</tr>
		);
	}
});

var ShoppingCart = React.createClass({
	__loadItems: function() {
		$.ajax({
			url: this.props.url,
			dataType: "json",
			success: function(data) {
				this.setState({ items: data });
			}.bind(this)
		});
	},
	getInitialState: function() {
		return ({ items: [] });
	},
	componentWillMount: function() {
		this.__loadItems();
	},
	render: function() {
		var nodes = this.state.items.map(function (i) {
			return <CartItem data={i} key={i.productId} />;
		});
		return (
			<div className="cart">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Product</th>
							<th>Quantity</th>
							<th>Price</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{nodes}
					</tbody>
				</table>
			</div>
		);
	}
});