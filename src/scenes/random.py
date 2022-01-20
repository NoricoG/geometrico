import random

from config.figures.rectangle_4 import rectangle_4
from config.figures.triangle_4 import triangle_4
from config.figures.triangle_3 import triangle_3
from config.figures.triangle_2 import triangle_2
from scenes.scene import Scene, Layer

# TODO: create own one instead
from config.common import drawer

safe_level = 8
number_of_scenes = 5

random_colors = [
    True,
    False,
]

colors = [
    0,
    1,
]

# TODO: dynamic color mapping
color_mappings = [
    {'bg': 'grey', 0: 'black', 1: 'white'},
    {'bg': 'black', 0: None, 1: 'white'},
]

levels = [7, 9, 10, 11, 12, 13, 14]

# TODO: different outer polygons in a nice way, separate of ConfigOptions
polygon_rectangle = [[0, 0], [1, 1]]
polygon_triangle = [[0.5, 0], [0, 1], [1,1]] 

figure_options = [
    # (rectangle_4, polygon_rectangle),
    (triangle_4, polygon_triangle),
    # (triangle_3, polygon_triangle),
    # (triangle_2, polygon_triangle),
]


def get_random_scene():
    color = random.choice(colors)
    random_color = random.choice(random_colors)
    color_mapping = random.choice(color_mappings)
    level = random.choice(levels)
    figure_option, polygon = random.choice(figure_options)
    config = figure_option.choose_randomly(polygon)
    layer = Layer(drawer, color_mapping, random_color, config, color, level)
    return Scene(drawer, [layer])

for _ in range(number_of_scenes):
    scene = get_random_scene()
    try:
        scene.show()
    except ValueError:
        print('Trying again with a lower level')
        for layer in scene.layers:
            layer.level = min(safe_level, layer.level)
        scene.show()