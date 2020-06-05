"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

from faker import Faker
fake = Faker()

import crud
import model
import fakerdata
import server

os.system('dropdb webapp')
os.system('createdb webapp')

model.connect_to_db(server.app)
model.db.create_all()

