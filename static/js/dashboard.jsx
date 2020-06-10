

class App extends React.Component {
	render() {
		return (
			<div>
				<CCAccount />
				<UserProfile />
				<UpdateUserProfile />
	
			</div>
		)
	}
}

class CCAccount extends React.Component {
	constructor() {
		super()
		this.state = {}
		}

render() {
	return(
		<div>
			<span>
				<h4>
					British Airways Signature Visa
				</h4>
				</span>
			<img width="250" height="167" id="credit-card-image" src="../static/img/british-airways-visa-signature-card.jpeg" />
			<span>
				<p>
					ALERT: You have **from database** of days to complete **from database** in spending
				</p>
			</span>
			<span>Progress toward spending bonus **BAR CHART**</span>
			<p>
			<a href="https://www.britishairways.com/">
				Visit British Airways Avios portal
			</a>
			</p>
		</div>
	)
}
}

class UserProfile extends React.Component {
	constructor() {
		super()
		this.state = {}
		}

render() {
	return(
		<div>
			<h4>My Profile</h4>
			<p>**Display email and password from database**</p>
			<p> Email: **from db**</p>
			<p> Password: **from db**</p>
			<a href="route to pull up form for updating">Edit info</a>
			<p></p>
		</div>
	)
}
}

class UpdateUserProfile extends React.Component {
	constructor() {
		super()
		this.state = {}
		}

render() {
	return(
		<div>
			<p></p>
				<h4>
					Update the form fields below.
				</h4>
			<form>
			<label>First Name
					<input type="text" name="first-name" placeholder="get from db"/>
				</label>
				<label>Last Name
					<input type="text" name="last-name" placeholder="get from db"/>
				</label>
				<label>Email
					<input type="text" name="email" placeholder="get from db"/>
				</label>
				<label>Password
					<input type="text" name="password" placeholder="get from db"/>
				</label>
				<button>Save</button>
			</form>
		</div>
	)
}
}


ReactDOM.render (
	<App />,
	document.getElementById("root")
);