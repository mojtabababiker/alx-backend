#!/usr/bin/env python3
"""
Flask app with babel support
"""
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """Basic configuration class for the flask application"""
    LANGUAGES = ["en", "fr"]
    default_locale = "en"
    default_timezone = "UTC"


app = Flask(__name__)
babel = Babel(app)


app.config.from_object(Config)


@babel.localeselector
def get_locale() -> str:
    """
    get the current user default local
    """
    locale = request.args.get("locale", None)
    if locale is None:
        locale = request.accept_languages.best_match(Config.LANGUAGES)
    return locale


@app.route("/", strict_slashes=False)
def home():
    """
    Test route fot the application
    """
    return render_template("4-index.html")


if __name__ == "__main__":
    app.run("0.0.0.0", port=5500, debug=True)
