from flask import Flask, render_template, url_for
from util import json_response
import queries

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """

    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()

# @app.route('/get-board/<id>')
# @json_response
# def get_board(id):
#
#     return queries.


@app.route("/get-cards/<board_id>")
@json_response
def get_cards_for_board(board_id):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards(board_id)


@app.route('/get-statuses')
@json_response
def get_statuses_for_board():
    return queries.get_statuses()


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
