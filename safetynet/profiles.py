from math import sqrt
from random import getrandbits

from .models import Profile, ProfileToken
from .database import db


def create_profile(data):
    with db.atomic():
        profile = Profile(
            name=data["name"],
            latitude=data["latitude"],
            longitude=data["longitude"],
            status=data["status"],
        )
        profile.save()

        pt = ProfileToken(profile=profile, token=getrandbits(256))
        pt.save()
    return profile


def update_profile(data, profile_id):
    with db.atomic():
        profile = Profile.get_by_id(profile_id)
        for key, value in data.items():
            setattr(profile, key, value)
        profile.save()
    return profile


def get_profile(profile_id):
    return Profile.get_by_id(profile_id)


def get_profiles():
    return (p for p in Profile.select())


# take lat and long to return nearby profiles within a certain limit
def get_nearby_profiles(lat, lon):
    profiles = []
    limit = 10
    for p in Profile.select():
        if (sqrt((p.latitude - lat) ** 2 + (p.longitude - lon) ** 2)) < limit:
            profiles.append(p)
    return profiles
