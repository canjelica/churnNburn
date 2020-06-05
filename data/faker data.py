"""Functions for creating fake data for Users and Credit Card Account data tables."""

import json
import random

from faker import Faker
fake = Faker()



class User:
    def __init__(self, login_id, first_name, last_name, email, password, credit_score):
        self.login_id = login_id
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.credit_score = credit_score
        # self.num_accounts = num_accounts
        # self.over_period = over_period
    
    def get_user_attributes(self):
         user_attributes = [self.login_id, self.first_name, self.last_name, self.email, self.password, self.credit_score]

         return user_attributes
    
    def __repr__(self):
        return f'{self.login_id}, {self.first_name}, {self.last_name}, {self.email}, {self.password}, {self.credit_score}'



def make_user_list():
    """Returns a list of users."""

    user_list = []

    for i in range(10):
        user = User(fake.user_name(), fake.first_name(), fake.last_name(), fake.email(), fake.password(length=10, special_chars=True, upper_case=True, lower_case=True), fake.random_int(min=580, max=850))

        user = user.get_user_attributes()
        user_list.append(user)
    
    return user_list
 

def make_user_dictionary(user_list):
    """Returns a dictionary of users by attribute."""
    
    all_users = []
        
    for user in user_list:
        user_dict = {}
        user_dict['login_id'] = user[0]
        user_dict['first_name'] = user[1]
        user_dict['last_name'] = user[2]
        user_dict['email'] = user[3]
        user_dict['password'] = user[4]
        user_dict['credit_score'] = user[5]
        all_users.append(user_dict)

    return all_users
   

#-----------------------------------------------------------------
#-----------------------------------------------------------------

class CreditCardAccount:
    def __init__(self, cc_account_name, bonus_received, date_opened, last_owned, is_active):
        self.cc_account_name = cc_account_name
        self.bonus_received = bonus_received
        self.date_opened = date_opened
        self.last_owned = last_owned
        self.is_active = is_active

    
    def get_acct_attributes(self):
         cc_account_attributes = [self.cc_account_name, self.bonus_received, self.date_opened, self.last_owned, self.is_active]

         return cc_account_attributes
    
    def __repr__(self):
        return f'{self.cc_account_name}, {self.bonus_received}, {self.date_opened}, {self.last_owned}, {self.is_active}'


def make_acct_list():
    """Returns a list of credit card accounts."""

    cc_names = ["Sapphire Preferred", "Sapphire Reserve", "The Platinum Card","The Gold Card", "British Airways Visa Signature","Marriott Bonvoy Brilliant"]
    ##this is hardcoded, how do I get randomly from cc JSON file
    # file = json.load(open("credit-cards.json"))
    # #parse in to python dict, open, llop over json, get ou cc name
    
    cc_account_list = []

    for i in range(20):
        cc_account = CreditCardAccount(random.choice(cc_names), fake.random_int(min=0, max=150000), fake.date(), fake.date_between(), True)

        cc_account = cc_account.get_acct_attributes()
        cc_account_list.append(cc_account)
    
    return cc_account_list


def make_acct_dictionary(account_list):
    """Returns a dictionary of credit card accounts."""

    all_accts = []

    for acct in account_list:
        acct_dict = {}
        acct_dict['cc_account_name'] = acct[0]
        acct_dict['bonus_received'] = acct[1]
        acct_dict['date_opened'] = acct[2]
        acct_dict['last_owned'] = acct[3]
        acct_dict['is_active'] = acct[4]
        all_accts.append(acct_dict)
    
    return all_accts
   
