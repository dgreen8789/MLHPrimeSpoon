from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import google_calls
import ast
import json

app = Flask(__name__)
api = Api(app)

#adds the arguments we need parsed for later calls
parser = reqparse.RequestParser()
parser.add_argument('lat')
parser.add_argument('lng')
parser.add_argument('radius', type=int)
parser.add_argument('next_page_token')

#This is for testing
@app.route('/')
def api_root():
return 'welcome'

#This does most of the work
class RestuarantList(Resource):
	def get(self):
		args = parser.parse_args()
		#parsing the coordinates this way was approximately 10000x easier
		#than attempting to pass in a properly escaped dictionary
		lat = args['lat']
		lng = args['lng']
		loc = {"lat":lat,"lng":lng}

	#support for extending page results to get more cards
	if args['next_page_token']:
	result = google_calls.get_next_page(loc, args['next_page_token'])
	else:
	result = google_calls.get_restaurants(loc)
	return result

#code to start application execution
if __name__ == '__main__':
    app.run()

#make sure we can access the list
api.add_resource(RestuarantList, '/restaurants')
