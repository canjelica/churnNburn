"""Server for Hackbright Project app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "dev"



@app.route('/')
def homepage():
  return render_template('index.html')

@app.route('/api/clear-session', methods=['POST'])
def clear_session():
	session.clear()
	return jsonify("session cleared")

@app.route('/api/login', methods=['POST'])
def log_in_user():
	"""Logs in a user."""

	data = request.get_json(force=True)	
	email = data['email']
	password = data['password']
	
	user = crud.get_user_by_email(email)

	if user:
		name = user.first_name + user.last_name
		name = f'{user.first_name} {user.last_name}'
		session['user_logged_in'] = user.user_id
		session['user_name'] = name
		
		if email == user.email and password == user.password:
			return jsonify([user.user_id, name, user.email])
		
		elif email == user.email and password != user.password:
			return jsonify({'error': 'Your password is incorrect.'})
	
	else:
		return jsonify({'error': 'You have not registered an account.'})


# @app.route('/login', methods=['POST'])
# # def log_in_user():
# 	"""Logs in a user."""
	
# 	data = request.get_json()
# 	user = crud.get_user_by_email(data['email'])

# 	name = user.first_name + user.last_name

# 	if user:
# 		if user.password == data['password'] and user.email == data['email']:
# 			session['user_id'] = user.user_id
# 			return jsonify({'userId': user.user_id, 'name': name, 'email': user.email})

# 		else:
# 			return jsonify({'error': 'Your email or password is incorrect.'})

# 	else:
# 		return jsonify({'error':'Email is not registered in our system. Please register.'})


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
	logged_in_user = crud.get_user_by_id(user_id)
	logged_in_user = logged_in_user.user_id
	logged_in = True

	if user_id == logged_in_user:
		return jsonify(logged_in_user)

@app.route('/api/cc-accounts', methods=['POST'])
def get_cc_acct_info():
	"""Returns specific account attributes."""
	
	user_id = session['user_logged_in']	
	
	cc_acct_data = crud.get_cc_accounts(user_id)
	
	cc_acct_info = {'cc_acct_name':cc_acct_data.cc_account_name,
									'approval_date': cc_acct_data.date_opened,
									'cc_id': cc_acct_data.credit_card_id}

	cc_id = cc_acct_info['cc_id']
	session['cc_acct_name'] = cc_acct_data.cc_account_name
	session['cc_id'] = cc_id

	return jsonify(cc_acct_info)

@app.route('/api/cc-info', methods=['POST'])
def get_credit_card():
	"""Returns specific credit card attributes."""

	user_id = session['user_logged_in']	
	cc_acct_name = session['cc_acct_name']
	cc_id = session['cc_id']

	cc_data = crud.get_credit_card(cc_id)
	
	cc_info = {'cc_name': cc_data.credit_card_name,
		'req_spending': cc_data.required_spending,
		'spend_timeframe': cc_data.spending_timeframe_months,
		'annual_fee': cc_data.annual_fee,
		'bank_id': cc_data.bank_id,
		'loyalty_program': cc_data.loyalty_program_id,
		'cc_img': cc_data.credit_card_image}
	
	return jsonify(cc_info)

@app.route('/api/update-password', methods=['POST'])
def update_password(new_password):
	"""Updates a user's password."""

	data = request.get_json(force=True) #returns list [userid, current pw, new pw]
	print(data)
	user_id = data[0]
	old_pw = data[1]
	new_pw = data[2]

	current_pw = crud.get_user_by_id(user_id)

	if session['user_logged_in'] == user_id and old_pw == current_pw.password: 
		updated_pw = crud.update_password(user_id, new_pw)
		return jsonify(updated_pw)
	else:
		return jsonify("Your current password is not correct.")







		



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
