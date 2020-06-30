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
			userId: localStorage.getItem('userId'),
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
		localStorage.setItem('userId', userId);
		localStorage.setItem('name', name);
	}
	
	render() {
		const userId = localStorage.getItem('userId');
		return(

			<Router>
				{localStorage.getItem('userId')} ?
				<Dashboard /> :
				<span></span>
			<Link to="/register"> Register your account </Link>	
			<Switch>
				<Route path='/login'>
					<Login />
				</Route>
			</Switch>
			</Router>
		)
	}
}

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: this.props.isLoggedIn,
			name: this.props.name,
			email: this.props.email,
			userId: this.props.userId
		}
	}
} 

	
// class Login extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			email: '',
// 			userId: '',
// 			name: '',
// 			isLoggedIn: false
// 		};

// 		this.handleSubmit = this.handleSubmit.bind(this);
// 		this.getEmail = this.getEmail.bind(this);
// 		this.getPassword = this.getPassword.bind(this);
// 	}

// 	handleSubmit(event) {
// 		event.preventDefault();
// 		const data = {
// 			email: this.state.email,
// 			password: this.state.password
// 		};
		
// 			fetch('/api/login', {
// 			method: 'POST',
// 			body: JSON.stringify(data),
// 		})
// 		.then(response => response.json())
// 		.then(data => console.log(data))
// 		.then(data => {
// 			if ('error' in data) {
// 				alert(data['error']);
// 				console.log(data)
// 			} else {
// 				this.setState({
// 					userId: data[0],
// 					name: data[1],
// 					email: data[2],
// 					isLoggedIn: true
// 				});
// 				localStorage.setItem('userId', data[0]);
// 				localStorage.setItem('name', data[1]);
// 				localStorage.setItem('email', data[2]);
// 				console.log(this.state);
// 				this.props.userLoggedIn(data[0], data [1], data[2])}
// 			})
// 		}
		
// 	getEmail(event) {
// 		event.preventDefault();
// 		this.setState({email: event.target.value});
// 	}
	
// 	getPassword(event) {
// 		event.preventDefault();
// 		this.setState({password: event.target.value});
// 	}

// 	render() {
// 		if(this.state.name) {
// 			return (
// 				<div>
// 					<h3>Welcome {this.state.name}!</h3>
// 				</div>
// 			)
// 		}

// 		return (
// 			<div>
// 			<form id="LoginForm" onSubmit={this.handleSubmit}>
// 				<p>Login below.</p>
// 					<label htmlFor="email">
// 						Email:
// 						<input name="email" type="text" onChange = {this.getEmail} ref={this.input} value={this.state.email} />
// 					</label>
// 					<label htmlFor="password">
// 						Password:
// 						<input name="password" type="text" onChange = {this.getPassword} ref={this.input} value={this.state.password}/>
// 					</label>
// 					<button type="submit">Login!</button>
// 			</form>
// 		</div>
// 				)
// 			}
// 		}










ReactDOM.render (
	<App />,
	document.getElementById("root")
);