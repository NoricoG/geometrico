from draw import Drawer
from config import Config
from figure import Figure
from shapes.square_4 import square

# draw settings
width = 1920 * 4
height = 1080 * 4
color_mapping = {0: 'black', 1: 'white'}
background = 'grey'

# shape settings
# TODO: make changing choice easier
shapes = square.shapes
colors = square.colors_options['corner']
levels = square.levels_options['not_corner']

# other settings
max_shape_count = 10 ** 7

# properties of outermost figure
shape = [[0, 0], [1, 1]]
color = 1
level = 9

drawer = Drawer(width, height, color_mapping, background)
config = Config(4, shapes, colors, levels, max_shape_count)
config.estimate_shape_count(level)

# TODO: time these functions
Figure(config, drawer, shape, color, level)
drawer.show()