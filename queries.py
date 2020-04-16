import connection

def get_boards():
    query = 'select * from board order by id desc;'
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


def add_new_board(board_title):
    try:
        query = "insert into board (id, title) values (DEFAULT, '{board_title}');".format(board_title=board_title)
        connection.execute_select(query)
    except:
        print('true')


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

def insert_user(username, password):
    try :
        ids = connection.execute_select('SELECT id FROM users ')
        id_list =[x['id'] for x in ids]
        if len(id_list) < 1:
            user_id = 1
        else:
            user_id =max(id_list) + 1
        query = "INSERT INTO users VALUES('{user_id}','{username}', '{password}')".format(user_id = user_id, username = username, password =password)
        connection.execute_select(query)
    except:
        print('wtf')

def get_password(username):
    query = "SELECT password FROM users WHERE username = '{user}'".format(user=username)

    password = connection.execute_select(query)
    if password:
        return password[0]['password']
    else:
        return False

def get_userid(username):
    return connection.execute_select("SELECT id FROM users WHERE username = '{user}'".format(user=username))[0]

