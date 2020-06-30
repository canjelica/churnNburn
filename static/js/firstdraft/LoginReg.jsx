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


class Overview extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					sections: []
			};
	}

	componentDidMount() {
			sessionStorage.removeItem('role');
			fetch('/api/get_sections', {
					credentials: 'same-origin'
			})
					.then(res => res.json())
					.then(data => {
							this.setState({ sections: data })
					})
	}

	render() {
			const teacherSections = [];
			const studentSections = [];
			for (const section of this.state.sections) {
					if (section.role === 'teacher') {
							teacherSections.push(
									<SectionButton
											section={section}
											key={section['section_id']}
									/>
							);
					} else {
							studentSections.push(
									<SectionButton
											section={section}
											key={section['section_id']}
									/>
							);
					}
			}

			return (
					<div id='overview'>
							<h2>Your classes</h2>
							<h3>Teacher</h3>
							<div id='container'>{teacherSections}</div>
							<h3>Student</h3>
							<div id='container'>{studentSections}</div>
					</div>
			)
	}
}


class SectionButton extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					clicked: false
			};
			this.handleClick = this.handleClick.bind(this);
	}

	handleClick(evt) {
			evt.preventDefault();
			sessionStorage.setItem('role', this.props.section['role'])
			this.setState({ clicked: true })
	}

	render() {
			if (this.state.clicked) {
					console.log("sectionbutton");
					return (
							<Redirect
									to={`/classes/${this.props.section['section_id']}`}
							/>
					)
			} else {
					return (
							<div className='section_button_holder'>
									<button type='section_button'
											id={this.props.section['section_id']}
											className={this.props.section['role']}
											onClick={this.handleClick}>
											{this.props.section['name']}
									</button>
							</div>
					)
			}
	}
}


export default Login;