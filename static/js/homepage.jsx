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
	}

	render() {
		const userId = sessionStorage.getItem('userId');
		if (userId) {
			return(
			<div>

				<Dashboard userLoggedIn={this.props.userLoggedIn} />

				<Router>
					<Switch>
						<Route exact path="/dashboard">
							<Dashboard exact path="/dashboard"/>
						</Route>
						<Route exact path="/add-new">
							<TrackNewAccount exact path="/add-new"/>
						</Route>
						<Route exact path="/myprofile">
							<UserProfile exact path="/myprofile" />
						</Route>
						<Route exact path="/mycards">
							<CCAccount exact path="/mycards" />
						</Route>
					</Switch>
				</Router>

			</div>
			)
		} else {
			return (
				<div>
					<Router>
						<Switch>
							<Route exact path="/">
								<Homepage exact path="/" />
								<Login exact path="/" userLoggedIn = {this.userLoggedIn} />
							</Route>
							<Route exact path="/register">
								<Registration exact path="/register"/> 
							</Route>
						</Switch>
					</Router>
				</div>
				)
			};
		}
	}


class Homepage extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<div className="container-fluid">
					<span>
						<img className="img-fluid rounded mx-auto d-block" id="homepage-logo" src="../static/img/Logo-text.gif" />
					</span>
					<p id="headline" >Welcome travelhacker! </p>
					<p id="paragraph">
						C&B is simple tool which tracks your credit cards in their promotional spending period. It calculates how much spending is required by the promotional deadline so you never have to miss out on a points bonus again.
					</p>
					<div className="byline">
						Churn it. Burn it. Move on.
					</div>
				</div>
			</div>
		)
	}

}	


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: sessionStorage.getItem('userId'),
			name: '',
		}
	}

	componentDidMount() {
		this.setState({name: sessionStorage.getItem('name')});
		console.log(this.state)
	}

	render() {
		
		const userId = this.state.isLoggedIn;
		sessionStorage.setItem('userId', userId)
		if (userId) {
			return (
				<div>
					<NavBar />
					<p id="welcome">Welcome, {this.state.name}!</p>
					<div className="container-fluid">
					<div className="card-deck">
					<div className="card card-heading">
						<img src="https://cdn.pixabay.com/photo/2015/08/26/14/30/wallet-908569_960_720.jpg" className="card-img-top" />
						<div className="card-body">
							<p className="card-title">My Credit Cards</p>
							<p className="dash-text">See a list of your credit cards and calculate time left in your promotional spending period. </p>
							<a href="/mycards" className="btn btn-primary" id="dash-button">Show Cards</a>
						</div>
					</div>

					<div className="card card-heading">
						<img src="https://cdn.pixabay.com/photo/2017/08/02/11/09/electronic-payments-2570939_960_720.jpg" className="card-img-top" />
						<div className="card-body">
							<p className="card-title">Add a New Card</p>
							<p className="dash-text">Add new accounts and begin tracking your progress towards that travelpoints windfall.</p>
							<a href="/add-new" className="btn btn-primary" id="dash-button">Add Card</a>
						</div>
					</div>

					<div className="card card-heading">
						<img src="https://cdn.pixabay.com/photo/2017/09/10/14/26/shopping-2735735_960_720.jpg" className="card-img-top" alt="..." />
						<div className="card-body">
							<p className="card-title">My Profile</p>
							<p className="dash-text">View your profile, verify account information and make changes to your password.</p>
							<a href="/myprofile" className="btn btn-primary" id="dash-button">See Profile</a>
						</div>
					</div>
					</div>
					</div>
				</div>
			)
		}
	}
}


class NavBar extends React.Component {
	constructor(props) {
		super(props);
	}
			
	render() {
		const userId = sessionStorage.getItem('userId')
		if (userId) {
		return (
			<div>

				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<img className="mini-logo" src="../static/img/logo-combo-small.gif" width="175" height="auto"></img>
					<a className="byline" href="/">DASHBOARD</a>

					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<a className="nav-link" href="/mycards">My Credit Cards<span className="sr-only">(current)</span></a>
							</li>
							<li className="nav-item active">
								<a className="nav-link" href="/add-new">Add a New Card</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link" href="/myprofile">My Profile</a>
							</li>
						</ul>
						<LogoutButton/>

					</div>
				</nav>
			</div>)}}}


class LogoutButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedOut: false
		}

		sessionStorage.removeItem('user_id');
		this.clearSession = this.clearSession.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);
	}

	clearSession() {
		event.preventDefault();
		fetch("api/clear-session", {
		method: 'POST'
		})
		.then(response => response.json())
		.then(sessionStorage.clear())
		.then(this.setState({isLoggedOut: true}));
	}

	renderRedirect(){
		if (this.state.isLoggedOut === true) {
			return <Redirect to="/" />
		}
	}

	render() {
		return (
			<div>
				{this.renderRedirect()}
				<button
					className="btn btn-primary"
					id="logout-button" 
					type="submit" 
					name="logout" 
					onClick={this.clearSession}>
					Log out
					</button>
			</div>
		)
	}
}

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
				sessionStorage.setItem('userId', data[0]);
				sessionStorage.setItem('name', data[1]);
				sessionStorage.setItem('email', data[2]);
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
					<h3 id="dash-text">Welcome {this.state.name}!</h3>
				</div>
			)
		}

		return (
			<div className="row">
				<div className="card mw-100 h-100" id="login-card">
					<div className="card-body">
						<Link className="card-text" id="link" to="/register"> Sign up for an account </Link>
						<p></p>
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label htmlFor="email">
										Email:
										<br></br>
										<input className="form-control" name="email" type="email" onChange = {this.getEmail} ref={this.input} value={this.state.email} />
										<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
									</label>
								</div>
								<div className="form-group">
									<label htmlFor="password">
										Password:
										<br></br>
										<input className="form-control" name="password" type="password" onChange = {this.getPassword} ref={this.input} value={this.state.password}/>
									</label>
								</div>
								<button className="btn btn-primary" id="button" type="submit">Login!</button>
							</form>
					</div>
				</div>
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
		.then(data => alert(data));												
		}

	getFName(event) {
		event.preventDefault();
		this.setState({firstname: event.target.value});
		console.log(event.target.value)
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
				<Homepage/>
				<div className="row" id="scrolling-card">
					<div className="card mw-100 h-100">
						<div className="card-body">
							<Link id="link" to="/">Back to Login</Link>
							<p></p>
						<form onSubmit={this.handleSubmit}>
							<p>New User? Register Here.</p>
								<div className="form-group"> 
									<label htmlFor="firstname">
										First name:
										<br></br>
										<input className="form-control" name="firstname" type="text" ref={this.input} onChange = {this.getFName} value={this.state.firstname}/>
									</label>
								</div>
								<div className="form-group">
									<label htmlFor="lastname">
										Last name:
										<br></br>
										<input className="form-control" name="lastname" type="text" ref={this.input} onChange={this.getLName} value={this.state.lastname}/>
									</label>
								</div>
								<div className="form-group">
									<label htmlFor="email">
										Email address:
										<br></br>
										<input className="form-control" name="email" type="text" ref={this.input} onChange={this.getEmail} value={this.state.email}/>
									</label>
								</div>
								<div className="form-group">
									<label htmlFor="password">
										Password:
										<br></br>
											<input className="form-control" name="password" type="text" ref={this.input} onChange={this.getPassword} value={this.state.value}/>
									</label>
								</div>
									<button className="btn btn-primary" id="button" type="submit">Register My Account!</button>
								</form>
						</div>
					</div>
				</div>	
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
			isLoggedin: sessionStorage.getItem('userId'),
			ccAcctInfo: [],
			ccInfo: [],
			spentAmt: '',
		}
		this.showCardInfo = this. showCardInfo.bind(this);
		}

	componentDidMount() {

		const acctData = this.props.isLoggedIn;
		fetch('/api/cc-accounts', {
			method: 'POST',
			body: JSON.stringify(acctData)
			}
		)
		.then(response => response.json())
		.then(data => {
			if (typeof data == 'string') {
				alert(data)
			} else {
				this.setState({ccAcctInfo: data});
				console.log(this.state.ccAcctInfo)
			}
		})
		.then( () => fetch('api/cc-info', {method: 'POST'}))
		.then(response => response.json())
		.then(data => {
			this.setState({ccInfo: data});
			console.log(this.state.ccInfo);
			console.log(this.state.ccAcctInfo);
		})
	}

	showCardInfo() {
		const allCards = []
		if (this.state.ccInfo && this.state.ccAcctInfo) {
			for (let i = 0; i < this.state.ccAcctInfo.length; i++) {
				let cardInfo = this.state.ccInfo[i]
				let acctInfo = this.state.ccAcctInfo[i]
				console.log(acctInfo);
				console.log(cardInfo);
				allCards.push(
					<div className="row row-cols-1 row-cols-md-3">
					<div className="col mb-4">
					<div className="card" id="credit-card-account">
				
						<CCInfo
							imagePath={cardInfo.cc_img}
							name={cardInfo.cc_name}
							bankId={cardInfo.bank_id}
							loyalty={cardInfo.loyalty_program_id}
							spendTimeframe={cardInfo.spend_timeframe}
							reqdSpend={cardInfo.req_spending}
							acct={acctInfo}
						/>
						<SpendingForm approvalDate={acctInfo.approval_date} card={cardInfo}/> 
					</div>
					</div>
					</div>
				)
			}
		}
		return allCards
	}

	render() {
			const ccInfo = this.state.ccInfo
			if (ccInfo.length < 1) {
				return (
					<div>Loading credit cards ...</div>
				)
			} else {
			return (
				<div className="container-fluid">
				<div className="card-deck mx-auto">
					{this.showCardInfo()}
				</div>
				</div>
			)
		}
	}
}

class CCInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount(){
		if (this.props.bankId == 1) {
			this.setState({bank: "Chase Bank"});
		} else {
			this.setState({bank: "American Express"})
		}
	}

	getRandomNumber(min=1111, max=9999) {
		return Math.floor(Math.random() * (max-min)) + min;
	}

	render() {
		return (
	
			<div>
				<h4 className="card-heading">
					{this.state.bank} {this.props.name} ending in *{this.getRandomNumber()}
				</h4>
				<span className="br-small"></span>
				<img className="card-img" id="credit-card-image" 
				src={this.props.imagePath}
				onClick={this.props.onClick}/>
			</div>
			
		)
	}
}

class SpendingForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			spentAmt: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getAmt = this.getAmt.bind(this);
		this.calculateSpending = this.calculateSpending.bind(this);
	}

	getAmt(event) {
		this.setState({spentAmt: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log(this.state.spentAmt)
		let reqdSpend = this.props.card.req_spending;
		let remainingSpend = reqdSpend - this.state.spentAmt;
		this.setState({toSpend: remainingSpend})
		console.log(remainingSpend)
	} //access info through props directly, not state

	calculateSpending() {
		const months = [ "January", "February", "March", "April", "May", "June", 
		"July", "August", "September", "October", "November", "December", "January", "February", "March", "April" ]

		// for(let card of this.state.ccAcctInfo)
		// {
		let deadline;
		let timeframe = this.props.card.spend_timeframe
		console.log(timeframe)
		let date = new Date(this.props.approvalDate) //instantiates Date object
		console.log(date)
		let month = date.getMonth() //gets month of date
		console.log(month)
		
		let newDate = timeframe + month  //gets month for spending deadline
		console.log(newDate)
		deadline = (months[newDate] + " " + date.getDate() + ", " + 2020) //date.getFullYear());
		console.log(deadline)
		this.setState({ccDeadline: deadline});
		console.log(this.state.ccDeadline)
		}

render() {
	console.log(this.props)  //not put on state, bc undefined on first render, the rerender 
	return (
		<div>
			<div >
				<form id="SpendingForm" onSubmit={this.handleSubmit}>
					<label htmlFor="spendingAmount">
					How much have you spent on this card to date?  
					<span className="br-small"></span>
					$ &nbsp;
					<input name="spending-form" type="text" onChange={this.getAmt} value={this.state.spentAmt} />
					<span className="br-small"></span>
					<button id="button" className="btn btn-primary" name="submit" onClick={this.calculateSpending}>Submit</button>
					</label>
				</form>
				<span className="br-small"></span>
				To get your credit card spending bonus, you must spend <strong>${this.state.toSpend}</strong> by <strong>{this.state.ccDeadline}</strong>.
			</div>
		</div>

	)
}
}

class LoyaltyPortal extends React.Component {
	constructor(props) {
		console.log(props)
		super(props);
	}

	render() {
		return (
			<div>
				<br></br>
				<a href={this.props.loyalty_program}>
					Visit British Airways Avios portal
				</a> 
			</div>
		)
	}
}

class UserProfile extends React.Component {
constructor(props) {
	super(props)
	this.state = {
		currentPW: '',
		newPW: '',
		isLoggedIn: this.props.isLoggedIn
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
		
		let data = [sessionStorage.getItem('userId'), this.state.currentPW, this.state.newPW] 
		
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
		return(
			<div className="row">
				<div className="card w-75 h-75" id="profile-card">

					<h4 className="card-heading card-title">My Profile</h4>
						<p></p>
						<div id="profile-form"><b>Name:</b> {sessionStorage.getItem('name')}
						<span className="br-small"></span>
						<b>Email:</b> {sessionStorage.getItem('email')}
						<p></p>
						Your profile settings are current.
						<span className="br-small"></span>
						If you'd like to  change your password, enter a new password below. </div>
						<p></p>					
					<div className="form-group" id="profile-form">	
					<form id="current-password" onSubmit={this.handleSubmit}>
						<label htmlFor="current-password">
							<b>Current password:</b>
								<br></br>
							<input className="form-control" name="current-password" type="text" onChange = {this.getCurrentPassword} ref={this.input} value={this.state.currentPW} />
						</label>
							<p></p>
						<label htmlFor="new-password">
							<b>New password:</b>
							<br></br>
							<input className="form-control" name="new-password" type="text" onChange = {this.getNewPassword} ref={this.input} value={this.state.newPW} />
						</label>
						<p></p>
						<button className="btn btn-primary" id="button">Save new</button>
						</form>
					</div>
				</div>
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
			<div className="row row-cols-1 row-cols-md-3">
				<div className="col mb-4">
				<div className="card" id="credit-card-solo">
					<CCImage 
						imagePath={card.cc_img} 
						ccid={card.cc_id} 
						ccname={card.cc_name} 
						loyalty={card.loyalty_program_id} 
						onClick={() => {this.cardClick(card.cc_id)}}  
						/>
				</div>
			</div>
			</div>
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
			<div id="headline">
				<h3 className="card-heading">To track a credit card and add it to your account, select a specific card below.</h3>

				<div className="container-fluid">
				<div className="card-deck mx-auto">
					{this.showForm()}	
				<br></br>
				<br></br>
					{this.renderCC()}
				</div>
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
					<div className="container-fluid">
					<div className="card w-75 h-75" id="new-card">
						<label id="new-card-text" forHTML="last-owned">When did you last own this card?</label>
						<input type="date" id="last-owned" name="last-owned" onChange={this.previousOwner} value={this.state.last_owned} ref={this.input} />
						<p></p>
						<button id="button" className="btn btn-primary" onClick={this.addCCAcct}> Add card</button>
				</div>
				</div>
				</div>
				)
			}

		return (
			<div>
				<div className="container-fluid">
					<div className="card w-75 h-75 mx-auto" id="new-card">
							<p id="new-card-text">Please enter the following information about your new <b>{this.state.ccBank}</b> <b>{this.state.ccName} </b>
							</p>
						<form>
						<label htmlFor="approval-date" id="new-card-text">
							When was your card application approved?
						</label>
							<input type="date" id="approval-date" name="approval-date" onChange={this.getApprovalDate} value={this.state.approvalDate} ref={this.input} />
					
							<div class="form-check">
								<input type="checkbox" className="form-check-input" id="client-status" value="previous owner" onChange={this.getClientStatus} checked={this.state.clientStatus} ref={this.input}/>
								<label class="form-check-label" id="new-card-text" htmlFor="client-status">Check here if you have previously owned this card.
								</label>
								</div>
								<button id="button" className="btn btn-primary" onClick={this.addCCAcct}> Add card</button>
							</form>		
						
					</div>
				</div>
			</div>
		)
	}
}



ReactDOM.render (
		<App />,
	document.getElementById("root")
);
