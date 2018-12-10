import pandas as pd
import genre_retrieval as dr

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/genre')
def index():
    return render_template('genre.html')

@app.route('/movies')
def movies():
    movies = dr.get_movies()
    result = []
    for i,movie in enumerate(movies):
        if i == 0:
            continue
        result.append({
            'gross': movie[0],
            'year': movie[1],
            'genre': movie[2]
        })
    return jsonify(result)   

if __name__ == '__main__':
    app.run(debug=True)
