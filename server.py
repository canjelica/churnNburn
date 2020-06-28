"""Server for Hackbright Project app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "dev"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def show_app(path):
	return render_template('index.html')

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
		return jsonify({'error': 'You are not registered in our system. Please sign up for an account.'})

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
		clear_session()
		status = "You have created your account. Please log in."

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
	
	cc_acct_data = crud.get_cc_accounts(user_id) #list of dicts
	
	if cc_acct_data:
		session['cc_acct_names'] = []
		session['cc_ids'] = []
		cc_ids = []
		cc_accts = []

		for acct in cc_acct_data:
			cc_acct_info = {'cc_acct_name': acct.cc_account_name, 'approval_date': acct.date_opened, 'cc_id': acct.credit_card_id}

			cc_ids.append(cc_acct_info['cc_id'])
			cc_accts.append(cc_acct_info)

			session['cc_acct_names'].append(acct.cc_account_name) 
			session['cc_ids'].append(acct.credit_card_id)

		return jsonify(cc_accts) #list of dicts
	
	else:
		return jsonify("You do not have any cards associated with this account. You can add a credit card by clicking 'Track a New Card'")

@app.route('/api/cc-info', methods=['POST'])
def get_credit_card():
	"""Returns specific credit card attributes."""

	user_id = session['user_logged_in']	
	cc_acct_names = session['cc_acct_names']  #dict has method called .get() that gets the value at a key or return , if you don't provide it, get None) this returns a list of account names
	cc_ids = session['cc_ids'] #list of ids
	
	card_attributes = []

	for cc_id in cc_ids:
		cc_data = crud.get_credit_card(cc_id)
		cc_info = {'cc_name': cc_data.credit_card_name,
			'req_spending': cc_data.required_spending,
			'spend_timeframe': cc_data.spending_timeframe_months,
			'annual_fee': cc_data.annual_fee,
			'bank_id': cc_data.bank_id,
			'loyalty_program': cc_data.loyalty_program_id,
			'cc_img': cc_data.credit_card_image}
		
		card_attributes.append(cc_info)
		print(card_attributes, '8'*800)

	return jsonify(card_attributes)

@app.route('/api/update-password', methods=['POST'])
def update_password():
	"""Updates a user's password."""

	data = request.get_json(force=True) #returns list [userid, current pw, new pw]
	user_id = data[0]
	old_pw = data[1]
	new_pw = data[2]

	user_info = crud.get_user_by_id(user_id)
	user_pw = user_info.password
	
	if str(session['user_logged_in']) == str(user_id) and old_pw == user_pw:
		updated_pw = crud.update_password(user_id, new_pw) #returns None
		print(user_id)
		return jsonify({'updated': 'yes'})
	else:
		return jsonify({'error': 'Your current password is not correct.'})

@app.route('/api/get-cards')
def get_cards():
	"""Returns array of credit card attributes."""

	cc_dicts = crud.get_all_credit_cards()
	all_ccs = []
	
	for item in cc_dicts:
		item_dict = {'cc_img': item.credit_card_image,
		'cc_name': item.credit_card_name,
		'cc_id': item.credit_card_id,
		'loyalty_program_id': item.loyalty_program_id
		}
		all_ccs.append(item_dict)

	return jsonify(all_ccs)

@app.route('/api/add-card', methods=['POST'])
def add_new_card():
	"""Adds a user's card to the database."""

	data = request.get_json(force=True)  #returns list [date_approved, last_owned: date last owned, credit card id]
	user_id = session['user_logged_in']
	user_id = user_id
	date_opened = data['date_opened']
	last_owned = data['last_owned']
	credit_card_id = data['credit_card_id']

	is_active = True
	credit_cards = crud.get_all_credit_cards()
	cc_account_name = credit_cards[credit_card_id - 1].credit_card_name

	if not last_owned:
		last_owned = "null"

	added_card = crud.add_credit_card(cc_account_name, date_opened, last_owned, is_active,user_id, credit_card_id)

	return jsonify("Your card has been added to your account.")

@app.route('/api/loyalty-info', methods=['POST'])
def get_loyalty_info():
	"""Gets loyalty program information."""

	loyalty_dicts = crud.get_loyalty_info()  #list of dictionaries
	all_lps = []

	for item in loyalty_dicts:
		lp_dict = {'program_name': item.loyalty_program_name, 'points_portal': item.points_portal}
		all_lps.append(lp_dict)

	return jsonify(all_lps)


	
















		



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
