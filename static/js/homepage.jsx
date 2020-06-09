// import React from "react";
// import ReactDOM from "react-dom";
// // import {
// //   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// const Router = window.ReactRouterDOM.BrowserRouter;
// const Route =  window.ReactRouterDOM.Route;
// const Link =  window.ReactRouterDOM.Link;
// const Prompt =  window.ReactRouterDOM.Prompt;
// const Switch = window.ReactRouterDOM.Switch;
// const Redirect = window.ReactRouterDOM.Redirect;

function HomePage() {
	return (
		<div>
	<Login />
	<Registration />
	</div>
	)
}

class Login extends React.Component {
	constructor() {
		super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target); //Ask mentors what this is doing

		fetch('api/form-submit-url', {
			method: 'POST',
			body: data,
		});
  }

  render() {
    return (
			<div>
      <form onSubmit={this.handleSubmit}>
				<p>Login below.</p>
					<label htmlFor="username">
						Username:
						<input type="text" ref={this.input}/>
					</label>
					<label htmlFor="password">
						Password:
						<input type="text" ref={this.input}/>
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('You are creating an account: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
				<p>New User? Register Here.</p>
				<label htmlFor="first-name">
					First name:
					<input type="text" ref={this.input}/>
				</label>
				<label htmlFor="last-name">
					Last name:
					<input type="text" ref={this.input}/>
				</label>
				<label htmlFor="email">
					Email address:
					<input type="text" ref={this.input}/>
				</label>
				<label htmlFor="username">
					Username:
					<input type="text" ref={this.input}/>
				</label>
				<label htmlFor="password">
					Password:
					<input type="text" ref={this.input}/>
				</label>
				<button>Create my account!</button>
				</form>
      </div>
    )
  }
}


// function LoginUser() {
	
// }


// function Home() {
//   return <h2>Home</h2>;
// }

// function Login() {
//   return <h2>Login</h2>;
// }

// function Registration() {
//   return <h2>Home</h2>;
// }

// function UserHome() {
//   return <h2>Home</h2>;
// }

ReactDOM.render (
	<HomePage />,
	document.getElementById("root")
);