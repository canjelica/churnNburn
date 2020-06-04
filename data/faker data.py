
from faker import Faker
fake = Faker()

#secondary faker data
# faker-credit-score


#create fake profile

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
    
    def __repr__(self):
        return f'{self.login_id}, {self.first_name}, {self.last_name}, {self.email}, {self.password}, {self.credit_score}'



def make_user_list():
    """Returns a list of users."""

    user_list = []

    for i in range(20):
        user_list.append([User(fake.user_name(), fake.first_name(), fake.last_name(), fake.email(), fake.password(length=10, special_chars=True, upper_case=True, lower_case=True), fake.random_int(min=580, max=850))])
       
    
    return user_list


def make_user_dictionary(user_list):
    """Returns a dictionary of users by attribute."""

    user_values = {}

    for user in user_list:
        print(user)
        # login_id, first_name, last_name, email, password, credit_score
        # print(login_id, first_name, last_name,email)


# for i in userlist:
#     print(i, '\n')