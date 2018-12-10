# coding: utf-8

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