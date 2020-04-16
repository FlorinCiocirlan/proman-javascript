import connection

def get_boards():
    query = 'select * from board order by id desc;'
    return connection.execute_select(query)

def get_statuses():
    query = "select * from status"
    return connection.execute_select(query)

# def get_statuses(boardId):
#     query = "select distinct status.title , status.id as status_id, board.id as board_id from status " \
#             "join card on status.id = card.status_id " \
#             "join board on card.board_id = board.id " \
#             "where board_id = '{boardId}' "\
#             "order by status_id asc; ".format(boardId=boardId)
#     return connection.execute_select(query)

def get_cards_for_bords(board_id, status_id):
    query ="SELECT card.* from card WHERE card.status_id = '{status_id}' and card.board_id ='{board_id}' order by " \
        "position asc".format(status_id=status_id, board_id=board_id)
    return connection.execute_select(query)


def add_new_board(board_title):
    try:
        query = "insert into board (id, title) values (DEFAULT, '{board_title}');".format(board_title=board_title)
        connection.execute_select(query)
    except:
        return True


def add_new_status(status_title):
    try:
        query = "insert into status (id, title) values (DEFAULT, '{status_title}');".format(status_title=status_title)
        connection.execute_select(query)
    except:
        return True

def add_new_card(board_id):
    try:
        query = "insert into card (id, board_id, title, status_id, position) values (default,'{board_id}', 'New Card', " \
                "0, 0);".format(board_id=board_id)
        connection.execute_select(query)
    except:
        return True


def delete_board(board_id):
    try:
        query = "delete from board where id = '{board_id}'".format(board_id=board_id)
        connection.execute_select(query)
    except:
        return True


def update_title_board(board_id, new_title):
    try:
        query = "update board set title = '{new_title}' where id = '{board_id}';".format(new_title=new_title, board_id=board_id)
        connection.execute_select(query)
    except:
        return True


def update_status_title(new_title, status_id):
    try:
        query = "update status set title = '{new_title}' where id = '{status_id}';".format(new_title=new_title, status_id=status_id)
        connection.execute_select(query)
    except:
        return True

