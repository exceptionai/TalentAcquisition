from flask import Flask, render_template

app = Flask(__name__)

@app.route('/cadastrar/curriculo')
def start():
    return render_template('formulario.html')

app.run()
