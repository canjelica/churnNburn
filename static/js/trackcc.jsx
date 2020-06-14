class App extends React.Component {
	render() {
		return (
			<div>
				<Login/>
			</div>
		)
	}
}



class AddCCAccount extends React.Component {
	constructor() {
		super()
		this.state = {}
		}

render() {
	return(
		<div>
			<p></p>
				<h3>
					My Credit Card Accounts
				</h3>
				<h6>Select the credit card issuer from below</h6>
				<img width="250" height="167" id="credit-card-image" src="../static/img/American-Express-Logotype-Stacked.png"/>

				<img width="250" height="167" id="credit-card-image" src="../static/img/chase-bank-logo.png"  />
			</div>
	)
}
}

ReactDOM.render (
	<App />,
	document.getElementById("root")
);