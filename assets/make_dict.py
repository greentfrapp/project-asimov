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

if __name__ == "__main__":
	minify()