from flask import Flask, render_template

import pymongo

app = Flask(__name__)


@app.route("/")
def index():
   # """Return the homepage."""
    return render_template("index.html")

@app.route("/moviemap")
def moviemap():
    return render_template("moviemap.html")

@app.route("/boxoffice")
def boxoffice():
    return render_template("boxoffice.html")

if __name__ == "__main__":
    app.run()
