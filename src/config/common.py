import math
from draw import Drawer

max_polygon_count = 2 * 10 ** 6

width = 2560
# height = 1600
height = int(math.sqrt(width ** 2 - ((width / 2) ** 2)))
upscaling = 8

drawer = Drawer(width, height, upscaling)