from flask import Flask, request, jsonify

from safetynet.profiles import create_profile, get_profiles

app = Flask(__name__)


@app.route("/api/profiles", methods=["GET", "POST"])
def profiles():
    if request.method == "POST":
        profile = create_profile(request.json)
        return jsonify(profile.to_dict())
    elif request.method == "GET":
        return jsonify([p.to_dict() for p in get_profiles()])


@app.route("/")
def index():
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run(debug=True)
