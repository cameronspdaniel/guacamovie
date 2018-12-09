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

conn = "mongodb://localhost:41108"
client = pymongo.MongoClient(conn)

# connect to mongo db and collection
db = client.heroku_xwwjj6bv
collection = db.KaggleMovies

@app.route("/movie")
def movie():
    # write a statement that finds all the items in the db and sets it to a variable
    films = list(db.collection.find())
    print(films)

    # render an index.html template and pass it the data you retrieved from the database
    return render_template("movie.html", films=films)

if __name__ == "__main__":
    app.run()
