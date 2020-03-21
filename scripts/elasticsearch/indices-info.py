import json
import requests

def to_short_data(index_data):
    return {
        "index": index_data['index'],
        "docs.count": index_data['docs.count']
    }

url = 'http://localhost:9200/_cat/indices?v'
response = requests.get(url, headers={'Accept': 'application/json'})

parsed = json.loads(response.content)
short_index_data = list(map(to_short_data, parsed))

pretty_json = json.dumps(short_index_data, indent=4)
print(pretty_json)
