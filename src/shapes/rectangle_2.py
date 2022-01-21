from shapes.shape import Shape
from shapes.coordinates import x, y, middle_of_bounds as middle_dim, middle_of_bounding_box as middle
from shapes.modifiers import *

# almost the same as Rectangle_4 with certain properties
# needs more tweaking to be interesting
# runtime random colors sometimes work
class Rectangle_2(Shape):
    def __init__(self):
        division_labels = ['top', 'bottom']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            # 'straight': [  # boring
            #     lambda vertices: [ vertices[0],                               [vertices[1][x], middle_dim(vertices, y)] ],
            #     lambda vertices: [ [vertices[0][x], middle_dim(vertices, y)], vertices[1] ],
            # ],
            # 'top_to_center': [  # ugly
            #     lambda vertices: [ [middle_dim(vertices, x), vertices[1][y]], vertices[0] ],
            #     lambda vertices: [ [middle_dim(vertices, y), vertices[0][x]], vertices[1] ],
            # ],
            # 'straigh_rotated_90': [  # doesn't rotate for some reason
            #     lambda vertices: [ [vertices[1][x], vertices[0][y]],          [middle_dim(vertices, x), vertices[1][y]] ],
            #     lambda vertices: [ [middle_dim(vertices, x), vertices[0][y]], [vertices[0][x], vertices[1][y]] ],
            # ],
            'bottom_rotated': [  # doesn't rotate for some reason
                lambda vertices: [ vertices[0],                               [vertices[1][x], middle_dim(vertices, y)] ],
                lambda vertices: [ [vertices[1][x], middle_dim(vertices, y)], [vertices[0][x], vertices[1][y]] ],
            ]
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
