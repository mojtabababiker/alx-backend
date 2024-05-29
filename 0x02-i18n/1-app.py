#!/usr/bin/env python3
"""
Flask app with basic babel sopport
"""
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """Basic configuration class for the flask application"""
    LANGUAGES = ["en", "fr"]
    default_locale = "en"
    default_timezone = "UTC"


app = Flask(__name__)
babel = Babel(app)

app.config.from_object(Config)


@app.route('/', strict_slashes=False)
def home() -> str:
    """
    Test route for the flask app
    """
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500, debug=True)
