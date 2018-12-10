# coding: utf-8

# In[1]:

from db import engine, Movies
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func, extract


# In[2]:


Session = sessionmaker(bind=engine)


def get_movies():
    return Session().query(Movies.Budget, Movies.Gross, Movies.Name, Movies.Runtime, Movies.Year).all()


# In[1]:


from sqlalchemy import create_engine, Table, ForeignKey, Column, Boolean, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.pool import StaticPool


# In[2]:


engine = create_engine('sqlite:///movies.sqlite', connect_args={'check_same_thread':False}, poolclass=StaticPool)
Base = declarative_base()



class Movies(Base):
    __tablename__ = 'Movies'
    
    Id = Column(Integer, primary_key=True)
    Budget = Column(Integer)
    Genre = Column(String(20))
    Gross = Column(Integer)
    Name = Column(String(100))
    Runtime = Column(Integer)
    Year = Column(Integer)
    
# In[9]:


Base.metadata.create_all(engine)

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
