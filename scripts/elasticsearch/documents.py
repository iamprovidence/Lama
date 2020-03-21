import json
import requests

index_name = input("Enter index name: ")
url = f'http://localhost:9200/{index_name}/_search'
response = requests.get(url)

parsed = json.loads(response.content)
pretty_json = json.dumps(parsed, indent=4)
print(pretty_json)