import connection

def get_boards():
    query = 'select * from board;'
    return connection.execute_select(query)

def get_statuses(boardId):
    query = "select distinct status.title , status.id as status_id, board.id as board_id from status " \
            "join card on status.id = card.status_id " \
            "join board on card.board_id = board.id " \
            "where board_id = '{boardId}' "\
            "order by status_id asc; ".format(boardId=boardId)
    return connection.execute_select(query)

def get_cards_for_bords(board_id, status_id):
    query = "SELECT card.* from card WHERE card.status_id = '{status_id}' and card.board_id ='{board_id}'order by position asc".format(status_id=status_id, board_id=board_id)
    return connection.execute_select(query)






