import sys
import json

libraries_json_path = sys.argv[1]

libraries_list = ""
with open(libraries_json_path, 'r') as json_data:
  d = json.load(json_data)
  json_data.close()
  for key, value in d.items():
    library_github_url = value["repo"]["url"]
    libraries_list += library_github_url + " "

print(libraries_list)