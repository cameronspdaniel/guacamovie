from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
   # """Return the homepage."""
    return render_template("index.html")

def moviemap():
    return render_template("moviemap.html")

def boxoffice():
    return render_template("boxoffice.html")


# Add any other routes here


if __name__ == "__main__":
    app.run()
