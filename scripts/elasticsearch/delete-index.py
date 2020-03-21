import requests

index_name = input("Enter index name: ")
url = f'http://localhost:9200/{index_name}'
requests.delete(url)
