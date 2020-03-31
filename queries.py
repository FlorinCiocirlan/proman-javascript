import connection

def get_status():
    return connection.execute_select("SELECT * FROM status;")
