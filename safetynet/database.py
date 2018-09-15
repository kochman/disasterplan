from peewee import SqliteDatabase

db = SqliteDatabase("safetynet.db")

db.connect()
