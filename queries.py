import connection

def get_boards():
    query = 'select * from board;'
    return connection.execute_select(query)

def get_statuses():
    query = 'select * from status;'
    return connection.execute_select(query)

def get_cards_for_bords(id):
    query = "select status.id, card.id, card.board_id, card.title, card.status_id, card.position, board.id from status " \
            "join  card on status.id = card.status_id " \
            "join board on card.board_id = board.id " \
            "where board.id = '{id}';".format(id=id)

    return connection.execute_select(query)






