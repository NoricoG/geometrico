from shapes.shape import Triangle
from shapes.coordinates import middle_xy as middle
from shapes.modifiers import *


class Triangle_3(Triangle):
    def __init__(self):
        division_labels = ['top_left', 'top_right', 'bottom']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'standard': [
                lambda vertices: [middle(vertices), vertices[1], vertices[0]],
                lambda vertices: [middle(vertices), vertices[0], vertices[2]],
                lambda vertices: [middle(vertices), vertices[2], vertices[1]],
            ]
        }

        options['translate'] = {
            'rotate_90_all': [rotator(1)] * 3,
            'rotate_90_bottom': [same, same, rotator(1)],
            'rotate_90_top': [rotator(1), rotator(1), same],
            'rotate_180_all': [rotator(2)] * 3,
            'rotate_180_bottom': [same, same, rotator(2)],
            'rotate_180_top': [rotator(2), rotator(2), same],
            'flip_bottom_of_top': [flipper([(1,2)]), flipper([(1,2)]), same],
            'flip_left_of_top': [flipper([(0,2)]), flipper([(0,2)]), same],
            'flip_right_of_top': [flipper([(0,1)]), flipper([(0,1)]), same],
            'flip_bottom_of_bottom': [same, same, flipper([(1,2)])],
            'flip_left_of_bottom': [same, same, flipper([(0,2)])],
            'flip_right_of_bottom': [same, same, flipper([(0,1)])],
        }

        options['color'] = {
            'top_inverse': [inverse, inverse, same],
            'top_same': [same, same, inverse],
            'bottom_inverse': [same, same, inverse],
            'bottom_same': [inverse, inverse, same],
        }

        options['level'] = {
            'full': [decrement, decrement, decrement],
            'bottom': [zero, zero, decrement],
            'top': [decrement, decrement, zero],
            'bottom_heavy': [floor_half, floor_half, decrement],
            'top_heavy': [decrement, decrement, floor_half],
            'left_heavy': [floor_half, decrement, decrement],
        }

        super().__init__(division, options)
