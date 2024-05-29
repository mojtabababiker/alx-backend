#!/usr/bin/env python3
"""
Flask app with advance support for babel
"""
from datetime import datetime, timezone as tz
from typing import Mapping, Union
from flask import Flask, render_template, request, g
from flask_babel import Babel, format_datetime
import pytz


class Config:
    """Basic flask configeration class"""
    LANGUAGES = ["en", "fr"]
    defualt_locale = "en"
    defualt_timezone = "UTC"


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "EAT"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


app = Flask(__name__)
babel = Babel(app)

app.config.from_object(Config)


def get_user(user_id: int) -> Union[Mapping, None]:
    """
    get the user from users where the key = user_id
    parameters:
    -----------
    user_id: int, represent the key of the required id

    returns:
    -----------
    user: Dict|None
    """
    return users.get(user_id, None)


@app.before_request
def before_request():
    """
    get the user from the  users based on the login_as URL parameter
    """
    user_id = request.args.get("login_as", None)
    if user_id:
        g.user = get_user(int(user_id))
    else:
        g.user = None


@babel.localeselector
def get_locale() -> str:
    """
    get the current user default local
    """
    locale = request.args.get("locale", None)
    if locale is None and g.user:
        locale = g.user["locale"]
    if locale is None:
        locale = request.accept_languages.best_match(Config.LANGUAGES)

    return locale


@babel.timezoneselector
def get_timezone() -> str:
    """
    get user time zone
    """
    zone = request.args.get("timezone", None)
    if zone is None and g.user:
        zone = g.user["timezone"]
    try:
        pytz.timezone(zone)
    except pytz.exceptions.UnknownTimeZoneError:
        return None

    return zone


@app.route("/", strict_slashes=False)
def home():
    """
    Test route fot the application
    """
    # zone = g.user[
    current_time = format_datetime(datetime.now(tz.utc))
    return render_template("index.html", current_time=current_time)


if __name__ == "__main__":
    app.run("0.0.0.0", port=5500, debug=True)
