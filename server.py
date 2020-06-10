"""Server for Hackbright Project app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "dev"



#Homepage/index route

@app.route('/')
def homepage():
    return render_template('index.html')


@app.route('/newuser', methods=['POST'])
def add_user():
	"""Add a user to our database."""

	first_name = request.form.get("first-name")
	last_name = request.form.get("last-name")
	email = request.form.get("email")
	password = request.form.get("password")

	#ccreate iterable, throw in database

	return "Account created."

@app.route('/login', methods=['POST'])
def user_login():
	"""Log in a user."""
	
	#look up in database, see if exists, if/else
	#if exists, respond with success
	#else respond with error





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
