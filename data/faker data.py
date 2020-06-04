
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
    
    def get_user_attributes(self):
         user_attributes = [self.login_id, self.first_name, self.last_name, self.email, self.password, self.credit_score]

         return user_attributes
    
    def __repr__(self):
        return f'{self.login_id}, {self.first_name}, {self.last_name}, {self.email}, {self.password}, {self.credit_score}'



def make_user_list():
    """Returns a list of users."""

    user_list = []

    for i in range(20):
            user = User(fake.user_name(), fake.first_name(), fake.last_name(), fake.email(), fake.password(length=10, special_chars=True, upper_case=True, lower_case=True), fake.random_int(min=580, max=850))
            user = user.get_user_attributes()
            user_list.append(user)
    
    return user_list
 

def make_user_dictionary(user_list):
    """Returns a dictionary of users by attribute."""

   
    key_values = ['login_id', 'first_name', 'last_name', 'email', 'password', 'credit_score']

    user_dict = dict.fromkeys(key_values)
    all_users = {}

    for user in user_list:
        user_dict['login_id'] = user[0]
        user_dict['first_name'] = user[1]
        user_dict['last_name'] = user[2]
        user_dict['email'] = user[3]
        user_dict['password'] = user[4]
        user_dict['credit_score'] = user[5]
        all_users.update(user_dict)
    print(all_users)



# for i in userlist:
#     print(i, '\n')