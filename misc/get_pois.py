import json

import googlemaps

gmaps = googlemaps.Client(key='')
warsaw = {'lat': 52.2302300802915, 'lng': 21.0045444802915}
five_km_radius = []
next_page = ''


def normalize(z):
    geo = z['geometry']['location']
    return {
        'latitude': geo['lat'],
        'longitude': geo['lng'],
    }


for _ in xrange(20):
    result = gmaps.places('Zabka', location=warsaw, radius=5000, page_token='')
    five_km_radius.extend(normalize(z) for z in result['results'])
    next_page = result['next_page_token']

with open('zabkas.txt', 'w') as f:
    json.dump(five_km_radius, f, indent=2)
