from peewee import Model, CharField, FloatField, TextField, ForeignKeyField

from .database import db


class Profile(Model):
    name = CharField()
    latitude = FloatField()
    longitude = FloatField()
    status = TextField(null=True)
    phone_number = CharField(null=True)

    class Meta:
        database = db

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "status": self.status,
            "phone_number": self.phone_number,
        }

    def token(self):
        pt = ProfileToken.get(ProfileToken.profile == self)
        return str(pt.token)


class ProfileToken(Model):
    profile = ForeignKeyField(Profile)
    token = CharField()

    class Meta:
        database = db


db.create_tables([Profile, ProfileToken])
