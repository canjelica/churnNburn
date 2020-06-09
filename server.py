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
	email = request.form.get("femail")
	username = request.form.get("username")
	password = request.form.get("password")

	return "Account created."

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
