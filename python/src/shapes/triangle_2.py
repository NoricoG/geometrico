from shapes.shape import Triangle
from shapes.coordinates import middle_between_points as between
from shapes.modifiers import *


class Triangle_2(Triangle):
    def __init__(self):
        division_labels = ['left', 'right']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'standard': [
                lambda vertices: [between(vertices[1], vertices[2]), vertices[1], vertices[0]],
                lambda vertices: [between(vertices[1], vertices[2]), vertices[0], vertices[2]],
            ]
        }

        options['translate'] = {
            'rotate_90_both': [rotator(1)] * 2,
            'rotate_90_left': [rotator(1), same],
            'rotate_180_both': [rotator(2)] * 2,
            'rotate_180_left': [rotator(2), same],
            'flip_bottom_of_left': [flipper([(1,2)]), same],
            'flip_left_of_left': [flipper([(0,1)]), same],
            'flip_right_of_left': [flipper([(0,2)]), same],
        }

        options['color'] = {
            'right_same': [inverse, same],
            'left_same': [same, inverse],
        }

        options['level'] = {
            'full': [decrement, decrement],
            'mix': [decrement, floor_half],
            'right': [zero, decrement],
            'left': [decrement, zero],
        }

        super().__init__(division, options)
