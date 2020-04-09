from flask import Flask, render_template, url_for
from util import json_response
import queries

import data_handler

app = Flask(__name__)


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





def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
