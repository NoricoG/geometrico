import random

from figure_props import FigureProps
from shapes.rectangle_4 import Rectangle_4
from shapes.triangle_4 import Triangle_4
from shapes.triangle_3 import Triangle_3
from shapes.triangle_2 import Triangle_2
from scenes.scene import Scene
from figure import Figure
from color import get_random_color

max_polygon_count = 2 * 10 ** 6
safe_level = 10
number_of_scenes = 5

colors = [
    0,
    1,
]

# TODO: dynamic color mapping
color_mappings = [
    {'bg': 'grey', 0: 'black', 1: 'white'},
    {'bg': 'black', 0: None, 1: 'white'},
    {'bg': 'white', 0: None, 1: 'black'},
    {'bg': 'black', 0: None, 1: 'white'},
    {'bg': 'black', 0: get_random_color(), 1: 'white'},
    {'bg': 'white', 0: get_random_color(), 1: 'black'},
    {'bg': 'black', 0: get_random_color(), 1: get_random_color()},
    {'bg': 'white', 0: get_random_color(), 1: get_random_color()},
    {'bg': get_random_color(), 0: get_random_color(), 1: get_random_color()},
    {'bg': get_random_color(), 0: get_random_color(), 1: get_random_color()},  # twice because nice
    {'bg': 'black', 0: get_random_color, 1: 'white'},
    {'bg': 'white', 0: get_random_color, 1: 'black'},
]

color_changes = [(True, True), (True, False), (False, True)]

levels = [7, 9, 10, 11, 12, 13, 14]

polygon_rectangle = [[0, 0], [1, 1]]
polygon_triangle = [[0.5, 0], [0, 1], [1, 1]]

shapes = [
    # (Rectangle_4(), polygon_rectangle),
    # (Triangle_4(), polygon_triangle),
    (Triangle_3(), polygon_triangle),
    # (Triangle_2(), polygon_triangle),
]

class RandomScene(Scene):
    def __init__(self):
        color = random.choice(colors)
        color_mapping = random.choice(color_mappings)
        change_intermediate_color, change_final_color = random.choice(color_changes)
        background = color_mapping['bg']
        level = random.choice(levels)
        shape, polygon = random.choice(shapes)
        props = shape.get_random_props(color_mapping, change_intermediate_color, change_final_color)
        print(props)
        print(props.get_short_summary())

        if props.estimate_polygon_count(level) > max_polygon_count:
            print(f'This combination of level value and level calculation can result in more than {max_polygon_count:,} polygons')
            print(f'Changing level from {level} to {safe_level}')
            level = safe_level

        figure = Figure(polygon, color, level, props)

        super().__init__(background, [figure])


if __name__ == '__main__':
    for _ in range(number_of_scenes):
        scene = RandomScene()
        scene.render()
        scene.show()
