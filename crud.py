"""CRUD operations."""

from model import db, User, Bank, UserBank, CreditCard, CreditCardAccount, LoyaltyProgram, UserLoyaltyProgram, connect_to_db

from fakerdata import *

import json
import random

from faker import Faker
fake = Faker()




def create_user(login_id, first_name, last_name, email, password, credit_score):
   """Create and return a new user."""
   
   user = User(login_id=login_id, first_name=first_name, last_name=last_name, email=email, password=password, credit_score=credit_score)
#    ,cc_account_id=cc_account_id)
   
   db.session.add(user)
   db.session.commit()
   
   return user

# def  create_multiple_users(all_users):
    


def create_bank(bank_name, approval_rule_num_accounts,    approval_rule_time_months, max_accounts):
    """Create and return a new bank."""

    bank = Bank(bank_name=bank_name, approval_rule_num_accounts=approval_rule_num_accounts, approval_rule_time_months=approval_rule_time_months, max_accounts=max_accounts)

    db.session.add(bank)
    db.session.commit()

    return bank


def create_userbank(user_id, bank_id):
    """Create userbank instance."""

    userbank = UserBank(user_id=user_id, bank_id=bank_id)

    db.session.add(userbank)
    db.session.commit()

    return userbank



def create_credit_card(credit_card_name, processor, signup_bonus, required_spending, spending_timeframe_months, annual_fee, bonus_value_dollars):#, bank_id, loyalty_program_id):
    """Create and return a new credit card."""

    credit_card = CreditCard(credit_card_name=credit_card_name, processor=processor,signup_bonus=signup_bonus, required_spending=required_spending, spending_timeframe_months=spending_timeframe_months, annual_fee=annual_fee, bonus_value_dollars=bonus_value_dollars)
    # ,  bank_id=bank_id, loyalty_program_id=loyalty_program_id)

    db.session.add(credit_card)
    db.session.commit()

    return credit_card


def create_cc_account(cc_account_name, bonus_received,date_opened, last_owned, is_active):#, user_id, credit_card_id):
    """Create and return a new credit card account."""

    cc_account = CreditCardAccount(cc_account_name=cc_account_name, bonus_received=bonus_received, date_opened=date_opened, last_owned=last_owned, is_active=is_active)
    #  user_id=user_id, credit_card_id=credit_card_id)

    db.session.add(cc_account)
    db.session.commit()

    return cc_account


def create_loyalty_program(loyalty_program_name, points_valuation_cents, points_portal, points_expire):
    # , credit_card_id):
    """Create and return a new loyalty program."""

    loyalty_program = LoyaltyProgram(loyalty_program_name=loyalty_program_name, points_valuation_cents=points_valuation_cents, points_portal=points_portal, points_expire=points_expire)
    # , credit_card_id=credit_card_id)

    db.session.add(loyalty_program)
    db.session.commit()

    return loyalty_program


def create_userloyaltyprogram(user_id, loyalty_program_id):
    """Create a userloyaltyprogram instance."""

    userloyaltyprogram = UserLoyaltyProgram(user_id=user_id, loyalty_program_id=loyalty_program_id)

    db.session.add(userloyaltyprogram)
    db.session.commit()

    return userloyaltyprogram





if __name__ == '__main__':
    from server import app
    connect_to_db(app)