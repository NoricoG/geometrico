import random

from figure_props import FigureProps
from shapes.rectangle_4 import Rectangle_4
from shapes.rectangle_2 import Rectangle_2
from shapes.triangle_4 import Triangle_4
from shapes.triangle_3 import Triangle_3
from shapes.triangle_2 import Triangle_2
from images.image import Image
from figure import Figure
from coloring import many_colorings
from generic_props import GenericProps

max_polygon_count = 2 * 10 ** 6
safe_level = 10

colors = [
    0,
    1,
]

color_changes = [(True, True), (True, False), (False, True)]

levels = [9, 10, 11, 12, 13, 14, 15, 20]
levels_fast = [5, 7, 9]

polygon_rectangle = [[0, 0], [1, 1]]
polygon_triangle = [[0.5, 0], [0, 1], [1, 1]]

shapes = [
    (Rectangle_4(), polygon_rectangle),
    (Triangle_4(), polygon_triangle),
    (Triangle_3(), polygon_triangle),
    (Triangle_2(), polygon_triangle),
]

class RandomImage(Image):
    def __init__(self, fast, *args):
        color = random.choice(colors)
        if fast:
            level = random.choice(levels_fast)
        else:
            level = random.choice(levels)
        shape, polygon = random.choice(shapes)

        coloring = random.choice(many_colorings)
        change_intermediate_color, change_final_color = random.choice(color_changes)        
        generic_props = GenericProps(coloring, change_intermediate_color, change_final_color)

        props = shape.get_random_props(generic_props)
        
        estimate_polygons = props.estimate_polygons(level)
        # estimate_polygons = max([props.estimate_polygons(level) for _ in range(5)])  # with a risky random level function
        if estimate_polygons > max_polygon_count:
            print(f'This combination of level value and level calculation can result in more than {max_polygon_count:,} polygons')
            print(f'Changing level from {level} to {safe_level}')
            level = safe_level
            props.estimate_polygons(level)
        summary = str(props)

        figure = Figure(polygon, color, level, props)

        super().__init__(coloring.background, [figure], summary, *args)