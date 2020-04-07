import connection

def get_boards():
    query = 'select * from board;'
    return connection.execute_select(query)

def get_statuses():
    query = 'select * from status;'
    return connection.execute_select(query)






