import pandas as pd
import json

from lyft_api import get_lyft_eta
from uber_api import get_uber_eta


long = -122.4167
lat = 37.7833

# get lyft eta estimates
estimates = get_lyft_eta(long, lat)
for d in estimates:
    d['company'] = 'lyft'

# get uber eta estimates
uber_estimates = get_uber_eta(long, lat)

# make uber data the same format as lyft data
for d in uber_estimates:
    d['display_name'] = d.pop('localized_display_name')
    d['eta_seconds'] = d.pop('estimate')
    d['company'] = 'uber'
    del d['product_id']


estimates.extend(uber_estimates)


print pd.read_json(json.dumps(estimates), orient='records')

import ipdb; ipdb.set_trace()