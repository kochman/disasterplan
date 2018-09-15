from .models import Profile


def create_profile(data):
    profile = Profile(
        name=data["name"],
        latitude=data["latitude"],
        longitude=data["longitude"],
        status=data["status"],
    )
    profile.save()
    return profile


def get_profiles():
    return [p for p in Profile.select()]
    return [
        {
            "name": "Safetynet User",
            "location": {"latitude": 42.733011, "longitude": -73.667795},
            "status": "A freeform text field for users to provide information...",
        }
    ]
