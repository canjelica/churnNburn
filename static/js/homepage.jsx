"use strict";

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
	}

	render() {
		return (
			<div>
				<Link to="/dashboard">View Dashboard</Link>
				<Link to="/cc-accounts">View Credit Card Accounts</Link>
				<Link to="/dashboard">View Dashboard</Link>
				<Router>
					<Switch>
						<Route path="/home">
							<Home/>
						</Route>
						<Route path="/dashboard">
							<Dashboard/>
						</Route>
						<Route path="/cc-accounts">
							<CCAccount/>
						</Route>
						<Route path="/myprofile">
							<UserProfile/>
						</Route>
						<Route path="/myprofile/update">
							<UpdateUserProfile/>
						</Route>
					</Switch>
				</Router>
			</div>
			);
		}
	}


class Home extends React.Component {
	render() {
		return (
			<div>
			<Login/>
			<Registration/>
			</div>
			)
		}
	}

class Dashboard extends React.Component {
	render() {
		return (
			<div>
			<LoginStatus/>
			<CCAccount/>
			<UserProfile/>
			</div>
			)
		}
	}	


class Login extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		email: '',
	// 		password: ''
	// 	};

	// handleSubmit(event) {
	// 	event.preventDefault();
	// 	const formData = {
	// 		email: this.state.email,
	// 		password: this.state.password
	// 	}

	// 	console.log(data.get("email"));
	// 	console.log(data.get("password"));
		
	// 	fetch('/api/login', {
	// 		method: 'POST',
	// 		body: data,
	// 	});
  // }		
	//Need a fetch method to gather form input and send to database

	render() {
		return (
			<div>
			<form id="LoginForm" onSubmit={this.handleSubmit}>
				<p>Login below.</p>
					<label htmlFor="email">
						Email:
						<input name="email" type="text" ref={this.input}/>
					</label>
					<label htmlFor="password">
						Password:
						<input name="password" type="text" ref={this.input}/>
					</label>
					<button>Login!</button>
			</form>
		</div>
				)
			}
		}
	
	
class Registration extends React.Component {
	// constructor() {
	// 	super();
	// 	this.handleSubmit = this.handleSubmit.bind(this);
	// 	// this.input = React.createRef();
	// }

	// handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	const data = new FormData(event.target); //Ask mentors what this is doing
	// 	console.log(data.get("email"), data.get("password"), data.get("first-name"), data.get("last-name"));
	// }
	
		render() {
			//this is where I put in functions that loop constantly 
			//componenddidmount, set up an dlaunch the method at the beginning of the render. Doing an axios call, continues on to whatever it did. Runs immediatley and only once.
			return (
				<div>
					<form onSubmit={this.handleSubmit}>
						<p>New User? Register Here.</p>
							<label htmlFor="first-name">
								First name:
								<input name="first-name" type="text" ref={this.input}/>
							</label>
							<label htmlFor="last-name">
								Last name:
								<input name="last-name" type="text" ref={this.input}/>
							</label>
							<label htmlFor="email">
								Email address:
								<input name="email" type="text" ref={this.input}/>
							<label htmlFor="password">
								Password:
									<input name="password" type="text" ref={this.input}/>
							</label>
							<button>Login!</button>
							</label>
						</form>
					</div>
				)
			}
		}


class LoginStatus extends React.Component {
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



//React touter can have paths, what is in the urls of the page we are on. REdirect and link. React router is going ot go ahear and reach into the url and change the url. Lie ot het user. React router not necessary, but nice. COndiditonal rendering. If this path, rout ei s showing in the url, then render what's inside this path. If not, will not render. Different kinds of routing you can do to control . That solves general probalm of showing stuff at different times. COnditional rendering. if statemnts in, return this. 