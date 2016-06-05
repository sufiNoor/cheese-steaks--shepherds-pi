import pandas as pd
import json
import googlemaps

from config import GOOGLE_MAPS_API_KEY
from lyft_api import get_lyft_eta
from uber_api import get_uber_eta


def get_lat_long(address):
    gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)
    geocode_result = gmaps.geocode(address)[0]
    lat = geocode_result['geometry']['location']['lat']
    lng = geocode_result['geometry']['location']['lng']
    return lat, lng


def get_etas(address):
    lat, lng = get_lat_long(address)

    # get lyft eta estimates
    estimates = get_lyft_eta(lng, lat)
    for d in estimates:
        d['company'] = 'lyft'
        del d['ride_type']

    # get uber eta estimates
    uber_estimates = get_uber_eta(lng, lat)

    # make uber data the same format as lyft data
    for d in uber_estimates:
        d['display_name'] = d.pop('localized_display_name')
        d['eta_seconds'] = d.pop('estimate')
        d['company'] = 'uber'
        del d['product_id']

    estimates.extend(uber_estimates)
    return estimates

