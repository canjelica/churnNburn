"use strict";

const Router = window.ReactRouterDOM.BrowserRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;
const MContext = React.createContext();


class App extends React.Component {
constructor (props) {
	super(props);
		this.state = {
			userId: '',
			isLoggedIn: false
		};
	
		this.isLoggedIn = this.isLoggedIn.bind(this);
	}

isLoggedIn(data) {
	let userId, name;
	[userId, name] = data;
	this.setState({ userId: userId });
}

	render() {
	
		return (
			<div>

				<Router>
					<NavBar></NavBar>

					<Link to="/login">Register/Login</Link>
					<p></p>
					<Link to="/dashboard" >View Dashboard</Link>
					<p></p>
					<Link to="/cc-accounts">View Credit Card Accounts</Link>
					<p></p>
					<Link to="/profile">My Profile</Link>

					<Switch>
						<Route exact path="/login" component={Login}/>
						{/* <Route exact path="/dashboard" component={DashboardPage}/>
						<Route exact path="/profile" component={Profile}/>
						<Route exact path="/cc-accounts" component={CCAccount}/> */}
					</Switch>
				</Router>
			</div>
			);
		}
	}


	

	class NavBar extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				userId: '',
				name: ''
			}
		}
	
		render() {
			return (
				<div>
					<h3>Welcome, {this.state.name}.</h3>
					<h3>Navigation</h3>
					<p> <Link to='/dashboard'>Dashboard</Link></p>
				</div>
			)
		}
	}


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};

	this.handleFieldChange = this.handleFieldChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
}

	handleFieldChange(evt) {
	this.setState({ [evt.target.id]: evt.target.value });
	}

	handleSubmit(evt) {
	evt.preventDefault();
	const data = {
		email: this.state.email,
		password: this.state.password
	}
	fetch('/api/login', {
		method: 'post',
		body: JSON.stringify(data)
	})
	.then(res => res.json())  //res is userid, name
	.then(data => {
		if (typeof data[0] == 'number') {
			this.props.isLoggedIn(data);
		} else {
			alert(data);
		}
	})
	this.setState({email: event.target.value});
	this.setState({password: event.target.value});
	}

	render() {
		return (
			<div id='login'>
				<p></p>
				<form onSubmit={this.handleSubmit}>Log in below.
					<p>
						Email: <input
							id='email'
							type='text'
							placeholder="Email"
							value={this.state.email}
							onChange={this.handleFieldChange}/>
					Password: <input
							id='password'
							type='text'
							placeholder="Password"
							value={this.state.password}
							onChange={this.handleFieldChange}
						/>
					</p>
					<p>
							<input type='submit' />
					</p>
				</form>
			</div>
		)
	}
}




ReactDOM.render (
	<App />,
	document.getElementById("root")
);