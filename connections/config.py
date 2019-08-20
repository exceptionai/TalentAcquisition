from main import app
from flask_mysqldb import MySQL

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Voip_Nexus1'
app.config['MYSQL_DB'] = 'bayerchallenge'

mysql = MySQL(app)
