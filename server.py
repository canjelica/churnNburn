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
	print(request)
	print("*"*200)
	email = data['email']
	password = data['password']
	
	print(email)
	print("*"*200)

	user = crud.get_user_email(email)
	print(user)

	if not user:
		status = "You have not registered an account."
	else:
		status = "You are logged in."

	return jsonify(status)


	
	#look up in database, see if exists, if/else
	#if exists, respond with success
	#else respond with error





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
