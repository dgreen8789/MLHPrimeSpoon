from googleplaces import GooglePlaces, types, lang
from math import radians, cos, sin, asin, sqrt
import pprint
import json
import six

pp = pprint.PrettyPrinter()


API_KEY = 'Dontexposethatkey'

google_places = GooglePlaces(API_KEY)

#helper function because JSON doesn't like decimals... at all 
def loc_with_float(location):
	loc = {}
	for k,v in location.items():
		loc[k] = float(v)
	return loc

#assembles the results of the query into a client-readable form
#requires client location to compute distance 
def build_list(loc, query_result):
	#pp.pprint(query_result.raw_response)
	restaurant_list = {'restaurants': [], 'next_page_token': query_result.raw_response['next_page_token']}
	v = 0
	for place in query_result.places:
		place.get_details() #request additional info	
		photo = place.photos[0].get(maxheight=1000)
		restaurant_list['restaurants'].append( 
		{'id':v, 'name': place.name, 'distance': str(haversine(float(place.geo_location['lng']), float(place.geo_location['lat']), float(loc['lng']), float(loc['lat'])))[:4] , 'address':place.formatted_address,'photo_url': place.photos[0].url, 'phone':place.local_phone_number})
		v = v + 1
	return restaurant_list

def get_restaurants(location):
	#Get restaurants list from places given arguments
	#Future versions could have more dynamic values
	query_result = google_places.nearby_search(
		lat_lng=location, radius=1620, types=[types.TYPE_FOOD])
	return build_list(location, query_result)

#support for page extension
def get_next_page(loc, token):
	query_result = google_places
	return build_list(loc, query_result)

#shamelessly copied from SO, but we could totally derive this
def haversine(lon1, lat1, lon2, lat2):
#Calculate the great circle distance between two points
#on the earth (specified in decimal degrees)
# convert decimal degrees to radians
	lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
# haversine formula
	dlon = lon2 - lon1
	dlat = lat2 - lat1
	a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
	c = 2 * asin(sqrt(a))
	km = 6367 * c
#to miles
	return km / 1.60934
