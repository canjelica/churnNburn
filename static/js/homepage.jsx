
class App extends React.Component {
	render() {
		return (
			<div>
				<LoginStatus />
				<Login />
				<Registration />
			</div>
		)
	}
}

class Login extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target); //Ask mentors what this is doing
		console.log(data.get("email"));
		console.log(data.get("password"));
		
		fetch('/login', {
			method: 'POST',
			body: data.json(),
		});
  }		
	//Need a fetch method to gather form input and send to database

	render() {
		return (
			<div>
			<form onSubmit={this.handleSubmit}>
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
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.input = React.createRef();
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.target); //Ask mentors what this is doing
		console.log(data.get("email"), data.get("password"), data.get("first-name"), data.get("last-name"));
	}
	
	render() {
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


ReactDOM.render (
	<App />,
	document.getElementById("root")
);