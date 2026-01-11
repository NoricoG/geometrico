from shapes.shape import Rectangle
from shapes.coordinates import x, y, middle_x, middle_y, middle_xy as middle
from shapes.modifiers import *

# almost the same as Rectangle_4 with certain properties
# needs more tweaking to be interesting
# runtime random colors sometimes work
# rotate 90 and 270 are broken in nice ways
class Rectangle_2(Rectangle):
    def __init__(self):
        division_labels = ['top', 'bottom']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'straight': [
                lambda vertices: [ vertices[0],                          vertices[1],                          [x(vertices[2]), middle_y(vertices)], [x(vertices[3]), middle_y(vertices)] ],
                lambda vertices: [ [x(vertices[0]), middle_y(vertices)], [x(vertices[1]), middle_y(vertices)], vertices[2],                          vertices[3] ],
            ],
        }

        options['translate'] = {
            'rotate_90_all': [rotator(1)] * 2,
            'rotate_270_all': [rotator(3)] * 2,
            'rotate_90_top': [rotator(1), same],
            # TODO: combination with flip?
        }

        options['color'] = {
            'top': [inverse, same],
            # 'random_top': [one_or_zero, same],
        }

        options['level'] = {
            'full': [decrement, decrement],
            'top_heavy': [decrement, decrement_slow],
            'top_heavy_/': [decrement, floor_half],
            'top_random_5': [maybe_one(5), decrement],
            'top_random_10': [maybe_one(10), decrement],
        }

        super().__init__(division, options)
