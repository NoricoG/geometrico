from shapes.shape import Shape
from shapes.coordinates import x, y, middle_of_bounds as middle_dim, middle_of_bounding_box as middle
from shapes.modifiers import *


class Rectangle_4(Shape):
    def __init__(self):
        division_labels = ['top_left', 'top_right', 'bottom_left', 'bottom_right']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'straight': [
                lambda vertices: [vertices[0],                               middle(vertices)],
                lambda vertices: [[middle_dim(vertices, x), vertices[0][y]], [vertices[1][x], middle_dim(vertices, y)]],
                lambda vertices: [[vertices[0][x], middle_dim(vertices, y)], [middle_dim(vertices, x), vertices[1][y]]],
                lambda vertices: [middle(vertices),                          vertices[1]],
            ],
            'to_center': [
                lambda vertices: [middle(vertices), vertices[0]],
                lambda vertices: [middle(vertices), [vertices[1][x], vertices[0][y]]],
                lambda vertices: [middle(vertices), [vertices[0][x], vertices[1][y]]],
                lambda vertices: [middle(vertices), vertices[1]],
            ]
            # rotate_90, rotate_180, rotate_270
        }

        options['color'] = {
            'checkerboard': [inverse, same, same, inverse],
            'corner': [inverse, same, same, same],
            'not_corner': [same, inverse, inverse, inverse],
            'random': [one_or_zero, one_or_zero, one_or_zero, one_or_zero],
            'random_diagonal': [one_or_zero, inverse, inverse, one_or_zero],
        }

        options['level'] = {
            'full': [decrement, decrement, decrement, decrement],
            'mix': [floor_half, decrement, decrement, floor_half],
            'diagonal': [decrement, zero, zero, decrement],
            'corner': [decrement, zero, zero, zero],
            'not_corner': [zero, decrement, decrement, decrement],
        }

        super().__init__(division, options)
