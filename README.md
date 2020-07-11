
![Churn & Burn Logo](https://github.com/canjelica/churnNburn/blob/master/static/img/logo-combo-small.gif)

# Churn & Burn
Churn & Burn is a simple tool for travelhackers who primarily use credit card churning as a way of accruing travel points. The webapp allows users to add credit cards upon application approval, tracking active cards during promotional spending periods to calculate how much they have to spend by what deadline in order to secure sign-up bonuses. Users can choose cards from a list of currently available products to add to their accounts, view current cards, and update their user profiles. 



## Tech Stack
**Back end:** Python, Flask, PostgreSQL, SQLAlchemy, Faker
**Front end:** React, JavaScript, Fetch, Bootstrap, HTML 5, CSS 3


## Features
Churn & Burn has a very simple, intuitive interface. On the landing page, users can register for an account, and log in to access their dashboard.


![Landing Page with Registration and Login](https://github.com/canjelica/churnNburn/blob/master/static/img/readme-login.gif)

The app is a one-page app, with three pageviews rendered in one place on the Dashboard. Users can navigate using the page cards, or from the Navbar above.


**My Cards** shows the currently active cards linked to a users account. A spending calculator allows them to input their current spending, and the calculator compares this against the credit card’s requirements, returning how much they need to spend by what date in order to unlock their sign-up bonus. 

![My Cards Pageview](https://github.com/canjelica/churnNburn/blob/master/static/img/readme-my-cards.gif)


**Add a New Card** lets users select a credit card from currently offered products to add to their account. Churn & Burn's database updates credit card offerings with their current bank's promotional restrictions.

![Add a New Card Pageview](https://github.com/canjelica/churnNburn/blob/master/static/img/readme-add-new%20card.gif)              


**My Profiles** displays the user's name and password, allowing users to change their current password.

![My Profile Pageview](https://github.com/canjelica/churnNburn/blob/master/static/img/readme-my-profile.gif)	


## Setup/Installation
**To run Churn & Burn:**

Installation requires Python3 and PostgreSQL (Mac OSX)

**Clone or fork this repo:**

```sh
$ git clone https://github.com/canjelica/churnNburn.git
```
 
**Create and activate a virtual environment inside your Churn&Burn directory:**

```sh
$ virtualenv
$ source env/bin/activate
```
 
**Install the dependencies:**

```sh
$ pip3 install -r requirements.txt
```
 
***
```sh
$ createdb webapp
$ python3 seeddatabase.py
```
 
**Start your server**
```sh
$ python3 server.py
```

**Run the app:**
 
You can now navigate to 'localhost:5000/' in any web browser to access Churn & Burn.



## WIP/Version 2.0
Current upgrades in progress include email/text notifications for approaching deadlines for spending, annual fees, and unlocked bonuses; integration of open banking APIs to automatically update user spending; and use loyalty program APIs to display user points and points valuation in dollars.

## About the Developer
Churn&Burn was created by Cassandra Sutton. Learn more about the developer on [LinkedIn](https://www.linkedin.com/in/cassandra-sutton-51822638/).
