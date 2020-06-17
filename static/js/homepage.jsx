"use strict";

const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;
const MContext = React.createContext();


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			userId: '',
			name: '',
			isLoggedIn: false
		};
		
		this.userLoggedIn = this.userLoggedIn.bind(this)
	}

	userLoggedIn = (userId, name, password, email) => {
		this.setState({
			isLoggedIn: userId,
			name: name,
			password: password,
			email: email
		})
		console.log(this.state)
	}

	clearSession() {
		event.preventDefault();
		fetch("api/clear-session", {
		method: 'POST'
		})
		.then(response => response.json())
		.then(response => console.log(response))
	}


	render() {
		return (
			<div>
				<Router>
					<Link to="/login" onClick = {this.clearSession}>Register/Login</Link>
					<p></p>
					<Link to="/user/dashboard" >View Dashboard</Link>
					<p></p>
					<Link to="/cc-accounts">View Credit Card Accounts</Link>
					<p></p>
					<Link to="/myprofile">My Profile</Link>
					<p></p>
					{/* <Link to="/add-new">Track a new credit card</Link> */}
				
					<Switch> 
							<Route exact path="/login">
							<Login userLoggedIn = {this.userLoggedIn} /> 
							<p> Welcome {this.state.name}!</p>
							<Registration/>
							</Route>
							<Route exact path="/user/dashboard">
								<Dashboard isLoggedIn={this.state.isLoggedIn} />
							</Route>
							<Route exact path="/cc-accounts">
								<CCAccount isLoggedIn={this.state.isLoggedIn} />
							</Route>
							<Route exact path="/myprofile">
								<UserProfile isLoggedIn={this.state.isLoggedIn} />
							</Route>
					</Switch>
				</Router>
			</div>
			);
		}
	}


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			userId: '',
			name: '',
			isLoggedIn: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.getEmail = this.getEmail.bind(this);
		this.getPassword = this.getPassword.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = {
			email: this.state.email,
			password: this.state.password
		};
		
			fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => {
			if (data === "You have not registered an account.") {
				alert("You have not registered an account.")
			} else {
				this.setState({
					userId: data[0],
					name: data[1],
					password: data[2]
				});
				console.log(this.state);
				this.props.userLoggedIn(data[0], data [1], data[2], data[3])}
			})
		}
		
	getEmail(event) {
		event.preventDefault();
		this.setState({email: event.target.value})
	}
	
	getPassword(event) {
		event.preventDefault();
		this.setState({password: event.target.value})
	}

	render() {

		return (
			<div>
			<form id="LoginForm" onSubmit={this.handleSubmit}>
				<p>Login below.</p>
					<label htmlFor="email">
						Email:
						<input name="email" type="text" onChange = {this.getEmail} ref={this.input} value={this.state.email} />
					</label>
					<label htmlFor="password">
						Password:
						<input name="password" type="text" onChange = {this.getPassword} ref={this.input} value={this.state.password} />
					</label>
					<button type="submit">Login!</button>
			</form>
		</div>
				)
			}
		}
	
	
class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: ''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.getFName = this.getFName.bind(this);
		this.getLName = this.getLName.bind(this);
		this.getEmail = this.getEmail.bind(this);
		this.getPassword = this.getPassword.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.password
		}
		console.log(data)

		fetch('/api/registration', {
			method: 'POST',
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => console.log(data));													
		}
//if created account comes back then conditional render or Router LInk to Dahboard View
	getFName(event) {
		event.preventDefault();
		this.setState({firstname: event.target.value})
	}

	getLName(event) {
		event.preventDefault();
		this.setState({lastname: event.target.value})
	}

	getEmail(event) {
		event.preventDefault();
		this.setState({email: event.target.value})
	}
	
	getPassword(event) {
		event.preventDefault();
		this.setState({password: event.target.value})
	}

	clickAlert(event) {
		event.preventDefault();	}
	
		render() {
			return (
				<div>
					<form onSubmit={this.handleSubmit}>
						<p>New User? Register Here.</p>
							<label htmlFor="firstname">
								First name:
								<input name="firstname" type="text" ref={this.input} onChange = {this.getFName} value={this.state.firstname}/>
							</label>
							<label htmlFor="lastname">
								Last name:
								<input name="lastname" type="text" ref={this.input} onChange={this.getLName} value={this.state.lastname}/>
							</label>
							<label htmlFor="email">
								Email address:
								<input name="email" type="text" ref={this.input} onChange={this.getEmail} value={this.state.email}/>
							<label htmlFor="password">
								Password:
									<input name="password" type="text" ref={this.input} onChange={this.getPassword} value={this.state.value}/>
							</label>
							<button type="submit">Register Me!</button>
							</label>
						</form>
					</div>
				)
			}
		}


class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userId: '',
			isLoggedIn: '',
		}
	}	
		
	render() {		
		let wordDisplay;
		if (typeof (this.props.isLoggedIn) == 'number') {
			console.log(this.props.isLoggedIn);
			wordDisplay = 'in';	
		} else {
			wordDisplay = 'out. You must log in to view this page.'
		};
		<Redirect to='/login'/>
		return (
			<div>
				<h6>You are currently logged {wordDisplay}</h6>
			</div>
		)
	}
}


class CCAccount extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			userId: '',
			name: '',
			isLoggedin: this.props.isLoggedIn,
			ccAcctInfo: {},
			ccInfo: {},
			spendAmt: '',
		}
	
		this.getAcctInfo = this.getAcctInfo.bind(this);
		this.getAmt = this.getAmt.bind(this);
		}

	getAmt(event) {
		this.setState({spendAmt: event.target.value})
		};

	getAcctInfo() {
		const acctData = this.props.isLoggedIn;
		
		fetch('/api/cc-accounts', {
			method: 'POST',
			body: JSON.stringify(acctData)
			}
		)
		.then(response => response.json())

		.then(data => {
			this.setState({ccAcctInfo: data})
			}
		)

		.then( () => fetch('api/cc-info', {method: 'POST'}))
		.then(response => response.json())
		.then(data => {
				this.setState({ccInfo: data})
				
			console.log(this.state.ccInfo);
			console.log(this.state.ccAcctInfo)
		})

		.then( () => {
				console.log(this.state);
				let deadline;
				let timeframe = this.state.ccInfo.spend_timeframe
				let date = this.state.ccAcctInfo.approval_date
				deadline = timeframe * 30
				console.log(date)
		}

		)
	}

	


	// 	get timeframe from ccInfo
	// 						timeframe X 30 days
	// 						* = Add to approval date

	// 						get form input spending
	// 						ccInfo reqd spending 
	// 						* = req minus form

	// }

	render() {

		return(
			<div>
				<span>
					<button 
						onClick={this.getAcctInfo}>
						Show my Credit Cards</button>
					<h4>
						{this.state.ccAcctInfo['cc_acct_name']}
					</h4>
					</span>
				<img width="250" height="167" id="credit-card-image" src="../static/img/british-airways-visa-signature-card.jpeg" /> get iamge
				<span>
					<p>
						Your {this.state.ccAcctInfo.cc_acct_name} was approved on {this.state.ccAcctInfo.approval_date}.</p>
						<p>
						<form id="SpendingForm" onSubmit={this.handleSubmit}>
							<label htmlFor="spendingAmount">
							How much have you spent on this card to date?
							<input name="spending-form" type="text" onChange = {this.getAmt} ref={this.input} value={this.state.spendAmt} />
							</label>
							<button type="submit">Submit</button>
						</form>

						
						You have * days to spend *.

						for bar chart * spending of reqd timeframe
						

					</p>
				</span>
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
				<p>Welcome, **first name last name***! Your account profile is currently up-to-date. If you'd like to make change your password, enter the new password below. </p>
				<p> Email: **from db**</p>
				<form id="password">
					<label htmlFor="password">
						Password:
						<input name="password" type="text"/>
					</label>
					<button>Save new</button>
					</form>
				<a href="route to pull up form for updating">Edit info</a>
				<p></p>
			</div>
		)
	}
}

// class TrackNewAccount extends React.Component {
// 	constructor() {
// 		super();
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<p></p>
// 					<h4>
// 						Update the form fields below.
// 					</h4>
// 					<form>
// 					<label>First Name
// 							<input type="text" name="first-name" placeholder="get from db"/>
// 						</label>
// 						<label>Last Name
// 							<input type="text" name="last-name" placeholder="get from db"/>
// 						</label>
// 						<label>Email
// 							<input type="text" name="email" placeholder="get from db"/>
// 						</label>
// 						<label>Password
// 							<input type="text" name="password" placeholder="get from db"/>
// 						</label>
// 						<button>Save</button>
// 					</form>
// 				</div>
// 			)
// 		}
// 	}



ReactDOM.render (
	<App />,
	document.getElementById("root")
);



//React touter can have paths, what is in the urls of the page we are on. REdirect and link. React router is going ot go ahear and reach into the url and change the url. Lie ot het user. React router not necessary, but nice. COndiditonal rendering. If this path, rout ei s showing in the url, then render what's inside this path. If not, will not render. Different kinds of routing you can do to control . That solves general probalm of showing stuff at different times. COnditional rendering. if statemnts in, return this. 