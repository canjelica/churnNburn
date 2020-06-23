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
			userId: '',
			name: '',
			isLoggedIn: false
		};
		
		this.userLoggedIn = this.userLoggedIn.bind(this);
	}

	userLoggedIn = (userId, name, email) => {
		this.setState({
			isLoggedIn: true,
			userId: userId,
			name: name,
			email: email
		});
		console.log(localStorage.getItem['userId']);
		console.log(this.state)
	}

	render() {
		return (
			<div>
				<Router>
					<Link to="/">Login</Link>
					<p></p>
					<Link to="/dashboard">Dashboard</Link>
					<p></p>
					<Link to="/register">Register an Account</Link>
					<p></p>
					<Link to="/cc-accounts">View Credit Card Accounts</Link>
					<p></p>
					<Link to="/myprofile">My Profile</Link>
					<p></p>
					<Link to="/add-new">Track a new credit card</Link>
				
			
					<Switch>
						<Route exact path="/">
							<Login exact path="/" userLoggedIn = {this.userLoggedIn} /> 
							<p>
							<Logout clearSession = {this.clearSession} />
							</p>
							</Route>
						<Route exact path="/register">
							<Registration/>
						</Route>
						<Route exact path="/dashboard">
							<Dashboard isLoggedIn={this.state.isLoggedIn} />
						</Route>
						<Route exact path="/cc-accounts">
							<CCAccount isLoggedIn={this.state.isLoggedIn} />
							{/* way of creating a cc account component for each acct the user has. Have another parameter that somewhere where I'm getting a list of user accounts. parameter would be the account.  Look at tutorial*/}
						</Route>
						<Route exact path="/myprofile">
							<UserProfile isLoggedIn={this.state.isLoggedIn} />
						</Route>
						<Route exact path="/add-new">
							<TrackNewAccount isLoggedIn={this.state.isLoggedIn} creditCardId={this.state.creditCards} />
						</Route>
						<Route exact path="/add-new/form">
							
						</Route>
					</Switch>
				</Router>
			</div>
			);
		}
	}


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isLoggedIn: false}
	}

	componentDidMount() {
		this.setState({isLoggedIn: localStorage.getItem['userId']});
		console.log(this.state)
	}

	render() {
		
		return (
			<div>

			</div>
		)
	}
}


class Logout extends React.Component {
	constructor(props) {
		super(props);

		localStorage.removeItem('user_id');
		this.clearSession = this.clearSession.bind(this)
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
				<button type="submit" name="logout" onClick = {this.clearSession}>Log out</button>
			</div>
		)
	}
}

{CCAccount}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			userId: '',
			name: '',
			isLoggedIn: false
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
		// .then(data => console.log(data))
		.then(data => {
			if ('error' in data) {
				alert(data['error']);
				console.log(data)
			} else {
				this.setState({
					userId: data[0],
					name: data[1],
					email: data[2],
					isLoggedIn: true
				});
				localStorage.setItem('userId', data[0]);
				localStorage.setItem('name', data[1]);
				localStorage.setItem('email', data[2]);
				console.log(this.state);
				this.props.userLoggedIn(data[0], data [1], data[2])}
			})
		}


		
	getEmail(event) {
		event.preventDefault();
		this.setState({email: event.target.value});
	}
	
	getPassword(event) {
		event.preventDefault();
		this.setState({password: event.target.value});
	}

	render() {
		if(this.state.name) {
			return (
				<div>
					<h3>Welcome {this.state.name}!</h3>
				</div>
			)
		}

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
						<input name="password" type="text" onChange = {this.getPassword} ref={this.input} value={this.state.password}/>
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
		this.loginRedirect = this.loginRedirect.bind(this);
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
		.then(data => alert(data));												
		}

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

	loginRedirect(event) {
		event.preventDefault();	
		return <Redirect to="/login"/>
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
							<button type="submit" onClick={this.loginRedirect}>Register Me!</button>
							</label>
						</form>
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
			spentAmt: '',
		}
	
		this.getAcctInfo = this.getAcctInfo.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		}

	componentDidMount() {
		this.setState(this.props.state);
		console.log(this.state);
		console.log(this.props.state)
	}
	
	getAcctInfo() {
		const acctData = this.props.isLoggedIn;
		
		fetch('/api/cc-accounts', {
			method: 'POST',
			body: JSON.stringify(acctData)
			}
		)
		.then(response => response.json())

		.then(data => {
			if ('error' in data) {
				alert(data['error'])
			} else {
				this.setState({ccAcctInfo: data});
			}
		}
	)
		.then( () => fetch('api/cc-info', {method: 'POST'}))
		.then(response => response.json())
		.then(data => console.log(data))
		.then(data => {
			this.setState({ccInfo: data});
			console.log(this.state.ccInfo);
			console.log(this.state.ccAcctInfo);
		})

		.then( () => {
				const months = [ "January", "February", "March", "April", "May", "June", 
				"July", "August", "September", "October", "November", "December", "January", "February", "March", "April" ]

				let deadline;
				let timeframe = this.state.ccInfo.spend_timeframe
				let date = new Date(this.state.ccAcctInfo.approval_date) //instantiates Date object
				let month = date.getMonth() //gets month of date
				
				let newDate = timeframe + month  //gets month for spending deadline
				deadline = (months[newDate] + " " + date.getDate() + ", " + 2020) //date.getFullYear());
				this.setState({ccDeadline: deadline});
				console.log(this.state)
		})		
	}
	
	getAmt() {
		this.setState({spentAmt: event.target.value});
	}

	handleSubmit() {
		event.preventDefault()
		this.setState({spentAmt: event.target.value});
		console.log(this.state.spentAmt)
		let reqdSpend = this.state.ccInfo.req_spending;
		let remainingSpend = reqdSpend - this.state.spentAmt;
		this.setState({toSpend: remainingSpend})
		console.log(remainingSpend)
	}
	

	render() {

		return(
			<div>
				<span>
					<button 
						onClick={this.getAcctInfo}>
						Show my Credit Cards</button>
					<h4>
						Your {this.state.ccAcctInfo['cc_acct_name']} ending in *0005
					</h4>
					</span>
				<img width="250" height="167" id="credit-card-image" src={this.state.ccInfo.cc_img}/>
				<span>
						<form id="SpendingForm" onSubmit={this.handleSubmit}>
							<label htmlFor="spendingAmount">
							How much have you spent on this card to date?  $
							<input name="spending-form" type="text" onChange={this.handleSubmit} value={this.state.spentAmt} />
							<button name="submit">Submit</button>
							</label>
						</form>
						{/* {() => {
							if (typeof this.handleSubmit == 'number') {
							let spend = this.handleSubmit
						} else {
							spend = 'some money'
						}}} */}
						To get your credit card spending bonus, you must spend ${this.state.toSpend} by {this.state.ccDeadline}.
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
constructor(props) {
	super(props)
	this.state = {
		currentPW: '',
		newPW: ''
	}

	this.getNewPassword = this.getNewPassword.bind(this);
	this.getCurrentPassword = this.getCurrentPassword.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	getCurrentPassword(event) {
		event.preventDefault();
		this.setState({currentPW: event.target.value});
		// console.log(this.state)
	}	
			 
	getNewPassword(event) {
		event.preventDefault();
		this.setState({newPW: event.target.value});
		// console.log(this.state.newPW)
	}

	handleSubmit(event) {
		event.preventDefault();
		
		let data = [localStorage.getItem('userId'), this.state.currentPW, this.state.newPW] 
		
		fetch('api/update-password', {
			method: 'POST',
			body: JSON.stringify(data)
		})
	
		.then(response => response.json())
		// .then(data => console.log(data))
		.then(data => {
			if ('error' in data) {
				alert("Your current password is not correct. Please try again." )
			} else {
				alert("Your password has been updated.")
			}
		})
	}

	render() {
		console.log(this.state)
		return(
			<div>
				<h4>My Profile</h4>
					<p>Name: {localStorage.getItem('name')}</p>
					<p>Email: {localStorage.getItem('email')}</p>
					<p>Your profile settings are current.</p>
					<p>If you'd like to  change your password, enter the new password below. </p>
				<form id="current-password" onSubmit={this.handleSubmit}>
					<label htmlFor="current-password">
						Current password:
						<input name="current-password" type="text" onChange = {this.getCurrentPassword} ref={this.input} value={this.state.currentPW} />
					</label>
					<label htmlFor="new-password">
						New password:
						<input name="new-password" type="text" onChange = {this.getNewPassword} ref={this.input} value={this.state.newPW} />
					</label>
					<button>Save new</button>
					</form>
				<p></p>
			</div>
		)
	}
}

class TrackNewAccount extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			creditCards: [],
			cardClicked: '',
			isLoggedin: this.props.isLoggedIn
		}
		this.renderCC = this.renderCC.bind(this);
		this.cardClick = this.cardClick.bind(this);
		this.showForm = this.showForm.bind(this);
	}

	componentDidMount() {
		fetch('api/get-cards')
		.then(response => response.json())
		.then(
			(result) => {
				this.setState({
					creditCards: result})
				});
			}

	renderCC() {
		const creditCardsList = []
		console.log(this.state)
		for (let card of this.state.creditCards) 
		{creditCardsList.push(
				<CCImage 
					imagePath={card.cc_img} 
					ccid={card.cc_id} 
					ccname={card.cc_name} 
					loyalty={card.loyalty_program_id} 
					onClick={() => {this.cardClick(card.cc_id)}}  
					/>
			);
		}
		return creditCardsList 
	}

	cardClick(ccid) {
		this.setState({cardClicked: ccid});  // also could use getAttribute() here instead
	console.log(this.state.cardClicked);
	}

	showForm() {
	console.log(this.state.cardClicked);
	if (typeof this.state.cardClicked === 'number') {
		return (
			<div>
				<CCForm cardClicked={this.state.cardClicked}/> 
			</div>
		)}
	}
	
	render() {
		console.log(this.state.cardClicked);
		const creditCards = this.state.creditCards  //a list of dictionaries per card

		if (creditCards.length < 6) {
			return (
			<div>"Credit cards now loading..."</div>)
		} else {
			return (
			<div>
				<h3>To track a credit card and add it to your account, select a specific card below.</h3>

				<div>
					{this.showForm()}	
				</div>
				<br></br>
				<br></br>
				<div>
					{this.renderCC()}
				</div>
			</div>
			)}
		}
	}



class CCImage extends React.Component {
	constructor(props) {
		super(props);
		console.log(props)
	}

	render() {
		return (
				<img width="250" height="167" 
				src={this.props.imagePath} 	
				ccid={this.props.ccid} 
				ccname={this.props.ccname} 
				loyalty={this.props.loyalty}
				onClick={this.props.onClick} />
		)
	}
}

class CCForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			approvalDate: '',
			clientStatus: '',
			last_owned: '',
			cardClicked: this.props.cardClicked
		}
		this.getApprovalDate = this.getApprovalDate.bind(this);
		this.getClientStatus = this.getClientStatus.bind(this);
		this.addCCAcct = this.addCCAcct.bind(this);
		this.previousOwner = this.previousOwner.bind(this);
	}

	getApprovalDate(event) {
		this.setState({approvalDate: event.target.value})
		console.log(this.state)
	}

	getClientStatus(event) {
		this.setState({clientStatus: event.target.value});
		console.log(this.state)
	}

	previousOwner(event) {
		this.setState({last_owned: event.target.value});
		console.log(this.state)
	}

	addCCAcct() {
		const data = {
			date_opened: this.state.approvalDate,
			last_owned: this.state.last_owned,
			credit_card_id: this.state.cardClicked
		};
		
		fetch('/api/add-card', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => alert(data))
	}

	render() {
		if (this.state.clientStatus === "previous owner") {
			return (
				<div>
					<label forHTML="last-owned">When did you last own this card?</label>
					<input type="date" id="last-owned" name="last-owned" onChange={this.previousOwner} value={this.state.last_owned} ref={this.input} />
					<p></p>
					<button id="submit" onClick={this.addCCAcct}> Add card</button>
				</div>
				)
			}

		return (
			<div>
				<h3>Please enter the following information about your new {this.state.ccBank} {this.state.ccName} </h3>
				<form>
					<label htmlFor="approval-date">
						When was your card application approved?
					</label>
					<input type="date" id="approval-date" name="approval-date" onChange={this.getApprovalDate} value={this.state.approvalDate} ref={this.input} />
						<p></p>
					<label htmlFor="client-status">Check here if you have previously owned this card.</label>
						<input type="checkbox" id="client-status" value="previous owner" onChange={this.getClientStatus} checked={this.state.clientStatus} ref={this.input}/>
						<p></p>
					<button id="submit" onClick={this.addCCAcct}> Add card</button>
				</form>
			</div>
		)
	}
}



ReactDOM.render (
	<App />,
	document.getElementById("root")
);
