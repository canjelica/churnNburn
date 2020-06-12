"""Server for Hackbright Project app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db
import crud


app = Flask(__name__)
app.secret_key = "dev"



@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/api/newuser', methods=['POST'])
def add_user():
	"""Add a user to our database."""
	

@app.route('/api/login', methods=['POST'])
def log_in_user():
	"""Logs in a user."""
	
	data = request.get_json(force=True)	
	email = data['email']
	password = data['password']
	
	user = crud.get_user_email(email)

	if not user:
		status = "You have not registered an account."
	else:
		status = "You are logged in."

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
#Not actually adding to database why? Look into crud function to insert into database
	return jsonify(status)







if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
