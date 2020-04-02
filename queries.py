import connection

def get_boards():
    query = 'select * from board;'
    return connection.execute_select(query)
