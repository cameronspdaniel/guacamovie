# coding: utf-8

# In[1]:

from db import engine, Movies
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func, extract


# In[2]:


Session = sessionmaker(bind=engine)


def get_movies():
    return Session().query(Movies.Budget, Movies.Gross, Movies.Name, Movies.Runtime, Movies.Year).all()