
import json

from uber_rides.session import Session
from uber_rides.client import UberRidesClient

from config import UBER_SERVER_TOKEN


start_latitude = 37.77
start_longitude = -122.41


def get_uber_eta(long, lat):
    session = Session(server_token=UBER_SERVER_TOKEN)
    client = UberRidesClient(session)

    response = client.get_pickup_time_estimates(start_latitude=lat,
                                                start_longitude=long)

    return response.json['times']


'''
response = client.get_products(37.77, -122.41)

products = response.json.get('products')

estimate = client.estimate_ride(
            product_id=PRODUCT_ID,
            start_latitude=START_LAT,
            start_longitude=START_LNG,
            end_latitude=END_LAT,
            end_longitude=END_LNG,
        )
'''


