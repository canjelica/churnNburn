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
    login_id = db.Column(db.String,
                        unique=True)                    
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String,
                        unique=True,
                        )
    password = db.Column(db.String,
                        ) 
    credit_score = db.Column(db.Integer)
    # num_accounts = db.Column(db.Integer)
    # over_period = db.Column(db.Integer)
    


    banks = db.relationship("Bank",
                            secondary="userbanks",
                            backref="users")


    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email} name = {self.first_name} {self.last_name}>'


    
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

    credit_card = db.relationship('CreditCard')
    # backref relationship to Users uses the same secondary argument 
    # for the reverse relationship


    def __repr__(self):
        return f'<Bank bank_id={self.bank_id} Name bank_name={self.bank_name}>'



class UserBank(db.Model):
    """User's bank."""

    __tablename__ = "userbanks"

    userbank_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    bank_id = db.Column(db.Integer,
                        db.ForeignKey('banks.bank_id'),
                        nullable=False)



class CreditCard(db.Model):
    """ A credit card. """

    __tablename__ = 'credit_cards'

    credit_card_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        )
    credit_card_name = db.Column(db.String)
    
    signup_bonus = db.Column(db.Integer)
    required_spending = db.Column(db.Integer)
    spending_timeframe_months = db.Column(db.Integer)
    has_annual_fee = db.Column(db.Boolean)

    bank_id = db.Column(db.Integer,
                        db.ForeignKey('banks.bank_id'),
                        )

    loyalty_program_id = db.Column(db.Integer,
                                    db.ForeignKey('loyalty_programs.loyalty_program_id'),
                                    )

    bank = db.relationship('Bank')
    loyalty_program = db.relationship('LoyaltyProgram')

    def __repr__(self):
        return f'<Credit Card credit_card_id={self.credit_card_id} Name credit_card_name={self.credit_card_name}>'




class CreditCardAccount(db.Model):
    """ A user's credit card account. """

    __tablename__ = 'credit_card_accounts'

    cc_account_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        )
    cc_account_name = db.Column(db.String)
    bonus_received = db.Column(db.Integer)
    date_opened = db.Column(db.DateTime)
    points_expiration_timeframe_months = db.Column(db.Integer)
    last_owned = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean)
    
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        )
    credit_card_id = db.Column(db.Integer,
                        db.ForeignKey('credit_cards.credit_card_id'),
                        )


    user = db.relationship('User', backref='cc_accounts')
    credit_card = db.relationship('CreditCard', backref='cc_accounts')
    

    def __repr__(self):
        return f'<Credit Card cc_account_id={self.cc_account_id} Name cc_account_name={self.cc_account_name}>'



class Transaction(db.Model):
    """A transaction."""

    __tablename__ = 'transactions'

    transaction_id = db.Column(db.Integer,
                                autoincrement=True,
                                primary_key=True,
                                )
    transaction_amt = db.Column(db.Integer)
    transaction_date = db.Column(db.DateTime)

    cc_account_id = db.Column(db.Integer,
                                db.ForeignKey('cc_accounts.cc_account_id'),
                                )
    
    cc_account = db.relationship('CreditCardAccount', backref='transactions')



class LoyaltyProgram(db.Model):
    """ A loyalty program. """

    __tablename__ = 'loyalty_programs'

    loyalty_program_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        )
    loyalty_program_name = db.Column(db.String)
    points_valuation = db.Column(db.Integer)
    points_portal = db.Column(db.String)
    points_expiration = db.Column(db.Boolean)
    credit_card_id = db.column(db.Integer,
                                db.ForeignKey('credit_card_accounts.cc_account_id'),      
                                )

    credit_card = db.relationship('CreditCard')
    
    
    
    
    

    def __repr__(self):
        return f'<Loyalty Program loyalty_program_id={self.loyalty_program_id} Name loyalty_program_name={self.loyalty_program_name}>'



class UserLoyaltyProgram(db.Model):
    """User's loyalty program."""

    __tablename__ = "user_loyalty_program"

    user_loyalty_program_id = db.Column(db.Integer,
                                        primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.user_id'),
                        nullable=False)
    loyalty_program_id = db.Column(db.Integer,
                        db.ForeignKey('loyalty_programs.loyalty_program_id'),
                        nullable=False)


class Bonus(db.Model):
    """A bonus."""

    __tablename__ = "bonuses"

    bonus_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True,
                        )
    signup_bonus = db.Column(db.Integer)
    annual_bonus = db.Column(db.Integer)
    category_spending_bonus = db.Column(db.Integer)

    credit_card_id = db.Column(db.Integer,
                        db.ForeignKey('loyalty_programs.loyalty_program_id'),
                        )

    





def connect_to_db(flask_app, db_uri='postgresql:///webapp', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    # flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)