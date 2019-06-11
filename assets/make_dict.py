import os
import json

filenames = []
for filename in os.listdir("imagenet_dogs"):
	filenames.append(filename)

with open("imagenet_dogs_dict.js", "w") as file:
	json.dump(filenames, file)