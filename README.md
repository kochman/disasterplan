# safetynet

## Requirements

Ensure these are installed before continuing.

- [Python 3.7](https://www.python.org) or Python 3.6
- [Pipenv](https://docs.pipenv.org)

## Getting started

safetynet is written in Python. To run safetynet for development:

### Installing

```
git clone git@github.com:kochman/safetynet.git
cd safetynet
pipenv install --three
```

### Running

```
pipenv shell
python app.py
```

## API endpoints

- GET `/api/profiles`:

    Returns a JSON list of profiles that safetynet thinks this user is interested in. Right now, that's every profile, but eventually will be location-based.

- POST `/api/profiles`:

    Create a new profile. The body should be a JSON object similar to the following:

    ```
    {
        name: "Safetynet User",
        location: {
            latitude: 42.733011,
            longitude: -73.667795
        },
        status: "A freeform text field for users to provide information..."
    }
    ```
