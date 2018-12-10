import pandas as pd
import data_retrieval as dr

from flask import Flask, jsonify, render_template, request

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

@app.route('/budget')
def budget():
    return render_template('budget.html')

@app.route('/movies')
def movies():
    movies = dr.get_movies()
    result = []
    for i,movie in enumerate(movies):
        if i == 0:
            continue
        result.append({
            'budget': movie[0],
            'revenue': movie[1],
            'name': movie[2],
            'runtime': movie[3],
            'year': movie[4]
        })
    return jsonify(result)

if __name__ == "__main__":
    app.run()
