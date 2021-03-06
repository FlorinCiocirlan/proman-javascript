from flask import Flask, render_template, url_for, request, redirect,session
from util import json_response
import queries
import hashing
import data_handler

app = Flask(__name__)
app.secret_key = 'ALJDBIYVIG'

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    return queries.get_boards()


@app.route('/get-statuses/<board_id>')
@json_response
def get_statuses_for_board(board_id):
    return queries.get_statuses(board_id)


@app.route("/get-cards/<board_id>/<status_id>")
@json_response
def get_cards_for_board(board_id, status_id):
    return queries.get_cards_for_bords(board_id,status_id)

@app.route('/add-new-board', methods=['POST'])
def add_new_board():
    if request.method == "POST":
        board_title = request.json
        # print(board_title)
        queries.add_new_board(board_title)
        return render_template('index.html')


@app.route('/delete-board/<board_id>', methods=['POST'])
def delete_board(board_id):
    print(board_id)
    queries.delete_board(board_id)
    return render_template('index.html')

@app.route('/update-title-name/<board_id>', methods=['POST'])
def update_title_name(board_id):
    newTitle = request.json['newTitle']
    queries.update_title_board(board_id, newTitle)
    return render_template('index.html')

@app.route('/register', methods=['GET','POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    elif request.method == 'POST':
        username = request.form['username']
        password = hashing.hash_password(request.form['password'])
        queries.insert_user(username,password)
        return redirect(url_for('login'))

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        inserted_password = request.form['password']
        inserted_username = request.form['username']
        table_password = queries.get_password(inserted_username)
        if table_password:
            if hashing.verify_password(inserted_password,table_password):
                session['username'] = inserted_username
                return redirect(url_for('index'))
            else:
                return redirect(url_for('login'))
        else:
            return redirect(url_for('login'))


@app.route('/logout')
def logout():
     session.pop('username')
     return redirect(url_for('index'))









def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
