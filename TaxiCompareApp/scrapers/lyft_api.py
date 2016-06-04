import requests
import requests.auth

from config import LYFT_CLIENT_ID, LYFT_CLIENT_SECRET


def get_token():
    client_auth = requests.auth.HTTPBasicAuth(LYFT_CLIENT_ID, LYFT_CLIENT_SECRET)
    post_data = {"Content-Type": "application/json",
                 "grant_type": "client_credentials",
                 "scope": "public"}

    response = requests.post("https://api.lyft.com/oauth/token",
                             auth=client_auth,
                             data=post_data)
    token_json = response.json()
    return token_json["access_token"]


def get_lyft_eta(long, lat):
    access_token = get_token()
    headers = {"Authorization": "bearer " + access_token}
    url = "https://api.lyft.com/v1/eta?lat={lat}&lng={lng}".format(lat=lat, lng=long)
    response = requests.get(url,
                            headers=headers)
    eta_estimates = response.json()['eta_estimates']
    return eta_estimates