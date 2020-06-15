"""Server for Hackbright Project app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
import crud


app = Flask(__name__)
app.secret_key = "dev"



@app.route('/')
def homepage():
  return render_template('index.html')



@app.route('/api/login', methods=['POST'])
def log_in_user():
	"""Logs in a user."""
	
	data = request.get_json(force=True)	
	email = data['email']
	password = data['password']
	
	user = crud.get_user_email(email)
	# user_pw = crud.get_user_pw(password)

	if not user:
		status = "You have not registered an account."
	else:
		name = f'{user.first_name} {user.last_name}'
		session['user_logged_in'] = user.user_id
		# session['user_name'] = name
		# session['user_pw'] = user.password
	
		status = [user.user_id, name] #user_pw]
	return jsonify(status)


@app.route('/api/registration', methods=['POST'])
def register_user():
	"""Registers a new user."""
	
	data = request.get_json(force=True)	
	first_name = data['firstname']
	last_name = data['lastname']
	email = data['email']
	password = data['password']
	print(data)
	user = crud.add_user(first_name, last_name, email, password)
	print(user)
	if user:
		status = "You have created your account."

	return jsonify(status)

@app.route('/api/dashboard', methods=['POST'])
def show_user_dashboard():
	"""Shows logged-in user their dashboard."""

	user_id = session['user_logged_in']
	logged_in_user = crud.get_user_id(user_id)
	logged_in_user = logged_in_user.user_id
	logged_in = True

	if user_id == logged_in_user:
		return jsonify(logged_in_user)

@app.route('/api/cc-accounts', methods=['GET'])
def get_cc_info():
	"""Returns specific account attributes."""
	
	user_id = session['user_logged_in']	
	cc_acct_info = crud.get_cc_account(user_id)
	cc_info = crud.get_credit_card(user_id)
	
	print('*'*200, cc_acct_info)
	return (user_id)


		




# new approute to catch fetch api from dashboard,
# fetch, pass in session over, if user exists, change is Logged IN data, render whatever needed, click 
# user_id: session[user_id],
# isloggedin will always be true when there is a user id session to throw back
# log out, is logged in, change the flag




if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
