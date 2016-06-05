from flask import Flask, request, abort, send_from_directory, render_template, request, redirect
from pymongo import MongoClient
import pandas as pd

app = Flask(__name__)

db = MongoClient().nobel_prize

@app.route('/')
def root():
    return send_from_directory('.', 'index.html')


@app.route("/api", methods=['POST'])
def get_country_data():
    import json
    from scrapers.get_data import get_etas
    address = json.loads(request.data)['address']
    estimates = get_etas(address)

    if len(estimates) > 0 :
        return json.dumps(estimates)

    abort(404) # resource not found


if __name__ == "__main__":
    app.run(port=8000, debug=True)