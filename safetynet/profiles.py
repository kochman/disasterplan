from .models import Profile
from math import sqrt


def create_profile(data):
    profile = Profile(
        name=data["name"],
        latitude=data["latitude"],
        longitude=data["longitude"],
        status=data["status"],
    )
    profile.save()
    return profile


def update_profile(data, profile_id):
    profile = Profile.get(profile_id)
    for key, value in data.items():
        setattr(profile, key, value)
    profile.save()
    return profile


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
