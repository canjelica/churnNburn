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
    bank_id = cc['bank_id']
	credit_card_image = cc['credit_card_image']
    # loyalty_program_id = cc['loyalty_program_id']
                   
    db_credit_card = crud.create_credit_card(credit_card_name, processor, signup_bonus, required_spending, spending_timeframe_months, annual_fee, bonus_value_dollars, bank_id, credit_card_image)#, loyalty_program_id)

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
                   
    db_loyalty_program = crud.create_loyalty_program(loyalty_program_name, points_valuation_cents, points_portal, points_expire)

    lp_in_db.append(db_loyalty_program)
#--------------------------------------------#

#call functions from fakerdata to create list of user dictionaries
user_in_db = []

test_users = make_user_list()
test_dicts = make_user_dictionaries(test_users) 

for user in test_dicts:
    db_user = crud.create_user(user['first_name'], user['last_name'], user['email'], user['password'], user['credit_score'])
    user_in_db.append(db_user)


# #call functions from fakerdata to create list of credit card account dictionaries 
cc_accounts_in_db = []
test_cc_accts = make_acct_list()
test_acct_dicts = make_acct_dictionaries(test_cc_accts)

for acct in test_acct_dicts:
    db_cc_acct = crud.create_cc_account(acct['cc_account_name'], acct['bonus_received'], acct['date_opened'], acct['last_owned'], acct['is_active'])
    cc_accounts_in_db.append(db_cc_acct)


    # if acct['cc_account_name'] == "Sapphire Preferred" or "Sapphire Reserve" or "British Airways Visa Signature":
    #     acct['credit_card_id'] = 1
    # else:
    #     acct['credit_card_id'] = 2, 
    # i = 1
    # acct['user_id'] = i
    # i = i + 1
   


# add in random assigned id to empty fields in tables######REVISIT LATER TO GET FROM CRUD########

userbank_in_db = []
test_userbanks = make_userbank_list()
for userbank in test_userbanks:
    db_userbank = crud.create_userbank(userbank[0], userbank[1])
    userbank_in_db.append(db_userbank)

# add in random assigned id to empty fields in tables######REVISIT LATER TO GET FROM CRUD########

user_loyalty_in_db = []
test_user_loyalty = make_user_loyalty_list()
for user_loyalty in test_user_loyalty:
    db_user_loyalty = crud.create_user_loyalty(user_loyalty[0], user_loyalty[1])
    user_loyalty_in_db.append(db_user_loyalty)


#Add ids to credit cards