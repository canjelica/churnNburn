"""Server for Hackbright Project app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect)
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

	first_name = request.args.get("first-name")
	last_name = request.args.get("last-name")
	email = request.args.get("email")
	password = request.args.get("password")

	

@app.route('/api/all-cc-accounts', methods=['POST'])
def show_cc_accounts():
	"""Returns all cc accounts in database."""
	
	accounts = crud.get_cc_accounts()

	return jsonify(accounts)


	
	#look up in database, see if exists, if/else
	#if exists, respond with success
	#else respond with error





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
