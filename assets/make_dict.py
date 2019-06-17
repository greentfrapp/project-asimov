import os
import json
from PIL import Image

def make_dict():
	filenames = []
	for filename in os.listdir("imagenet_dogs"):
		filenames.append(filename)

	with open("imagenet_dogs_dict.js", "w") as file:
		json.dump(filenames, file)

def minify():
	size = [100, 100]
	folder = "imagenet_dogs/"
	newfolder = "small_dogs/"
	for filename in os.listdir(folder):
		im = Image.open(folder + filename)
		s = im.size
		scale = max(s) / min(s)
		newsize = [scale * dim for dim in size]
		im.thumbnail(newsize, Image.BICUBIC)
		im.save(newfolder + filename, "JPEG")

def all_subp():
	subprinciples = {}
	with open("principles.json", "r") as file:
		data = json.load(file)
	for p in data:
		if p["report"] not in subprinciples:
			subprinciples[p["report"]] = {}
		if p["content"] not in subprinciples[p["report"]]:
			subprinciples[p["report"]][p["content"]] = ""
	with open("subPrinciplesText.json", "w") as file:
		json.dump(subprinciples, file)

if __name__ == "__main__":
	all_subp()
