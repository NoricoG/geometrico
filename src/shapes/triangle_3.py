from shapes.shape import Shape
from shapes.coordinates import middle_of_bounding_box as middle
from shapes.modifiers import *


class Triangle_3(Shape):
    def __init__(self):
        division_labels = ['top_left', 'top_right', 'bottom']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'standard': [
                lambda vertices: [middle(vertices), vertices[0], vertices[1]],
                lambda vertices: [middle(vertices), vertices[2], vertices[0]],
                lambda vertices: [middle(vertices), vertices[1], vertices[2]],
            ]
        }

        options['color'] = {
            'tl_inverse': [inverse, same, same],
            'tl_same': [same, inverse, same],
            'bottom_inverse': [same, same, inverse],
            'bottom_same': [inverse, inverse, same],
        }

        options['level'] = {
            'full': [decrement, decrement, decrement],
            'right_heavy': [floor_half, decrement, decrement],
            'bottom': [zero, zero, decrement],
            'top': [decrement, decrement, zero],
            'bottom_heavy': [floor_half, floor_half, decrement],
            'top_heavy': [decrement, decrement, floor_half],
        }

        super().__init__(division, options)
