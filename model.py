"""Models for hackbright project app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    """ A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, 
                        autoincrement=True, 
                        primary_key=True,
                        )
    login_id = db.Column(db.String)                    
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String,
                        unique=True,
                        )
    password = db.Column(db.String,
                        ) 
    num_accounts = db.Column(db.Integer)
    over_period = db.Column(db.Integer)
    credit_score = db.Column(db.Integer)

    
class Bank(db.Model):
    """ A bank. """

    __tablename__ = 'banks'

    bank_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        )
    bank_name = db.Column(db.String)
    approval_rule_num_accounts = db.Column(db.Integer)
    approval_rule_time_period = db.Column(db.Integer)
    



    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'