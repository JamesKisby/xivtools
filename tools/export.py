import config
import os
import ast
import sys
import re
import psycopg2
from psycopg2.extras import execute_values

'''
    run export.py [Table]
    gets table from exports
'''

def arrReturn(col, item, name):
    #formating data
    item = item.replace('{','').replace('}','')
    if name in config.edit:
        for e in config.edit[name]:
            if re.search(e,item):
                return item[len(e)+1:]
    if name in config.lists:
        for l in config.lists[name]:
            if col == l:
                return '{' + item + '}'

    if item == '':
        return None
    if item == 'True':
        return True
    if item == 'False':
        return False
    return item




def exportData(filename):

    file = os.path.join(os.path.expanduser('~'), 'Documents/exports', filename)

    with open(file) as f:
        data = f.readlines()

    table = filename.lower()
    cols = config.get[filename]
    cols = data[1]
    data = ast.literal_eval(data[2])
    res = []

    for i in range(0,len(data[cols[0]])):
        r = [arrReturn(a,data[a][i],filename) for a in cols]
        res.append(r)



    if cols[0] == '#': cols[0] = 'id'
    print(cols)
    vals = ",".join(cols).lower()


    print(vals)

    try:
        connection = psycopg2.connect(user = "brownstone",
                                password = "Brownst0ne!",
                                host = "127.0.0.1",
                                database = "ffxiv")

        cursor = connection.cursor()
        sql = "INSERT INTO " + table + " (" + vals + ") VALUES %s"
        execute_values(cursor, sql, res)
        connection.commit()
    except(Exception, psycopg2.Error) as error:
        print("Error connectiong to psql",error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            print("Psql closed")



filename = str(sys.argv[1])
exportData(filename)
