"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

from faker import Faker
fake = Faker()

import crud
import model
from fakerdata import *
import server

os.system('dropdb webapp')
os.system('createdb webapp')

model.connect_to_db(server.app)
model.db.create_all()



#Load bank data from JSON file
with open('data/banks.json') as f:
    bank_data = json.loads(f.read())
#Create banks, store them in list
banks_in_db = []
for bank in bank_data:
    bank_name = bank['bank_name']
    approval_rule_num_accounts = bank['approval_rule_num_accounts']
    approval_rule_time_months = bank['approval_rule_num_accounts']
    max_accounts = bank['max_accounts']
    # user_id = bank['user_id']
                   
    db_bank = crud.create_bank(bank_name, approval_rule_num_accounts, approval_rule_time_months, max_accounts)

    banks_in_db.append(db_bank)

# Load credit card data from JSON file
with open('data/creditcards.json') as f:
    cc_data = json.loads(f.read())
#Create banks, store them in list
cc_in_db = []
for cc in cc_data:
    credit_card_name = cc['credit_card_name']
    processor = cc['processor']
    signup_bonus = cc['signup_bonus']
    required_spending = cc['required_spending']
    spending_timeframe_months = cc['spending_timeframe_months']
    annual_fee = cc['annual_fee']
    bonus_value_dollars = cc['bonus_value_dollars']
    # bank_id = cc['bank_id']
    # loyalty_program_id = cc['loyalty_program_id']
                   
    db_credit_card = crud.create_credit_card(credit_card_name, processor, signup_bonus, required_spending, spending_timeframe_months, annual_fee, bonus_value_dollars)
    # , bank_id, loyalty_program_id)

    cc_in_db.append(db_credit_card)


#Load loyalty program data from JSON file
with open('data/loyaltyprograms.json') as f:
    lp_data = json.loads(f.read())
#Create banks, store them in list
lp_in_db = []
for lp in lp_data:
    loyalty_program_name = lp['loyalty_program_name']
    points_valuation_cents = lp['points_valuation_cents']
    points_portal = lp['points_portal']
    points_expire = lp['points_expire']
    # credit_card_id = lp['credit_card_id']
                   
    db_loyalty_program = crud.create_loyalty_program(loyalty_program_name, points_valuation_cents, points_portal, points_expire)
    # , credit_card_id)

    lp_in_db.append(db_loyalty_program)

#--------------------------------------------#

#call functions from fakerdata to create list of user dictionaries
user_in_db = []

test_users = make_user_list()
test_dicts = make_user_dictionaries(test_users) 

for user in test_dicts:
    db_user = crud.create_user(user['login_id'], user['first_name'], user['last_name'], user['email'], user['password'], user['credit_score'])
    user_in_db.append(db_user)


# #call functions from fakerdata to create list of credit card account dictionaries 

cc_accounts_in_db = []

test_cc_accts = make_acct_list()
test_acct_dicts = make_acct_dictionaries(test_cc_accts)

for acct in test_acct_dicts:
    db_cc_acct = crud.create_cc_account(acct['cc_account_name'], acct['bonus_received'], acct['date_opened'], acct['last_owned'], acct['is_active'])
    cc_accounts_in_db.append(db_cc_acct)



