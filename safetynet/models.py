from peewee import Model, CharField, FloatField, TextField

from .database import db


class Profile(Model):
    name = CharField()
    latitude = FloatField()
    longitude = FloatField()
    status = TextField()

    class Meta:
        database = db

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": {"latitude": self.latitude, "longitude": self.longitude},
            "status": self.status,
        }


db.create_tables([Profile])
