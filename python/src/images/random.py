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
from figure_props import GenericProps

min_polygon_count = 15
max_polygon_count = 0.9 * 10 ** 6
max_level = 20

colors = [
    0,
    1,
]

color_changes = [(True, True), (True, False), (False, True)]

levels = [7, 8, 9, 10]
levels_fast = [5, 6]

shapes = [
    Rectangle_2,
    Rectangle_4,
    Triangle_4,
    Triangle_3,
    Triangle_2,
]

class RandomImage(Image):
    def __init__(self, fast, *args):
        color = random.choice(colors)
        if fast:
            level = random.choice(levels_fast)
        else:
            level = random.choice(levels)
        shape = random.choice(shapes)

        coloring = random.choice(many_colorings)
        change_intermediate_color, change_final_color = random.choice(color_changes)        
        generic_props = GenericProps(coloring, change_intermediate_color, change_final_color)

        props = shape().get_random_props(generic_props)
        
        estimate_polygons = props.estimate_polygons(level)
        while estimate_polygons < min_polygon_count and level < max_level:
            print(f'Too few polygons, changing level from {level} to {level + 1}')
            level = level + 1
            estimate_polygons = props.estimate_polygons(level)
        while estimate_polygons > max_polygon_count:
            print(f'Too many polygons, changing level from {level} to {level - 1}')
            level = level - 1
            estimate_polygons = props.estimate_polygons(level)
        summary = str(props)

        figures = [Figure(polygon, color, level, props) for polygon in props.placing]
        super().__init__(coloring.background, figures, summary, *args)