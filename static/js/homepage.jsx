const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isLoggedin: false };
	}
	
	render() {
		return (
			<div>
				<Router>

					<Link to="/">Register/Login</Link>
					<p></p>
					<Link to={`/user/dashboard`}>View Dashboard</Link>
					<p></p>
					<Link to="/cc-accounts">View Credit Card Accounts</Link>
					<p></p>
					<Link to="/myprofile">My Profile</Link>
					<p></p>
					{/* <Link to="/add-new">Track a new credit card</Link> */}

				
					<Switch>
					<Route path="/">
							<Login/>
							<Registration/>
						</Route>
						<Route path="/user/dashboard">
							<Dashboard/>
						</Route>
						<Route path="/cc-accounts">
							<CCAccount/>
						</Route>
						<Route path="/myprofile">
							<UserProfile/>
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
			password: ''
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
		}
		console.log(data)

		fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => console.log(data));
		
		// if data=="You are logged in, render new Dashboard component" withRouter LInk or Conditional reander, switch views
													
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
					<button>Login!</button>
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
							<button>Login!</button>
							</label>
						</form>
					</div>
				)
			}
		}


class Dashboard extends React.Component {
	constructor() {
		super()
		this.state = {
			isLoggedIn: true
		}
	}

		render() {
			let wordDisplay
			if (this.state.isLoggedIn) {
				wordDisplay = "in"
			} else {
				wordDisplay = "out"
			};;
		
			return (
				<div>
					<h3>You are currently logged {wordDisplay}</h3>
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