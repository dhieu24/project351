import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn import preprocessing
from sklearn import model_selection
from sklearn.metrics import mean_squared_error
import datetime
import pymongo
from pymongo import MongoClient
import certifi
import sys

client = MongoClient('mongodb+srv://lhn15:Anhminhbin2@cluster0.x2ow1gg.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=certifi.where())
db = client['Stock-Prediction']
col = db['stocks']

#next step would be to load not every single record, spread out loaded data over time period
def predict_from_db(stock_name, minutes = 5, load_limit = 250000):
    print(stock_name)

    if (load_limit > 250000):
        load_limit = 250000

    #load the 'load_limit' most recent records from the mongodb
    client = MongoClient('mongodb+srv://lhn15:Anhminhbin2@cluster0.x2ow1gg.mongodb.net/?retryWrites=true&w=majority', tlsCAFile=certifi.where())
    db = client['Stock-Prediction']
    col = db['stocks']
    x = col.find({'s': stock_name}).sort("t", pymongo.DESCENDING).limit(load_limit)


    #populate lists with prices and times
    data = []
    times = []
    for entry in x:
        data.append(float(entry['p']))
        times.append(float(entry['t']))


    #order the data chronologically
    data.reverse()
    times.reverse()


    #start and end times of the dataset
    start = datetime.datetime.fromtimestamp(min(times) / 1000)
    end = datetime.datetime.fromtimestamp(max(times) / 1000)


    #determine the duration of the dataset in minutes
    seconds = (end - start).total_seconds()
    duration_minutes = seconds / 60 


    #determine the average number of records generated per minute over the dataset 
    records = len(data)+1
    unit = records/duration_minutes


    #limit the usable data to 5 times the length of time that we are trying to predict
    limit = minutes * unit * 5
    #print(limit)
    index_limit = len(data) - int(limit)
    
    if (limit > load_limit):
        print(f'required dataset greater than loaded number of values. prediction may be inaccurate')
        index_limit = 0
    
    data = data[index_limit:]
    times = times[index_limit:]


    A = np.arange(len(data)).reshape(-1, 1)
    standardX = preprocessing.StandardScaler().fit(A).transform(A)

    #train the model and predict price at a given number of minutes in the future
    test = np.arange(max(A), max(A) + (minutes * unit)).reshape(-1, 1)
    model = LinearRegression().fit(A, data).predict(test)

    #plt.plot(A, data, color='blue', label='Original Data')
    #plt.plot(test, model, color='red', label='Linear Regression Model')
    #plt.show()

    #print(model)

    price = model[-1]

    print(price)

    return price
    


predict_from_db(sys.argv[1], 5)




#given a file of data, the method predicts the price of the stock at a time in the future of an input number of minutes 

def predict_from_csv(filename, minutes):

    table = pd.read_csv(filename, engine='python', header=None)

    data = table.loc[1:,1].values
    data = [float(i) for i in data]
    A = np.arange(len(data)).reshape(-1, 1)

    standardX = preprocessing.StandardScaler().fit(A).transform(A)
    
    #determine the duration in seconds over which data was collected
    X = table.loc[1:,3].values
    times = [float(i) for i in X]

    start = datetime.datetime.fromtimestamp(min(times) / 1000)
    end = datetime.datetime.fromtimestamp(max(times) / 1000)

    seconds = (end - start).total_seconds()
    duration_minutes = seconds / 60 


    #determine the number of records generated each minute
    records = len(data)+1
    unit = records/duration_minutes
    

    #train the model and predict price at a given number of minutes in the future
    test = np.arange(max(A), max(A) + (minutes * unit)).reshape(-1, 1)
    model = LinearRegression().fit(A, data).predict(test)


    return model[-1]

    


    

    

