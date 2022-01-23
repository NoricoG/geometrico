from shapes.shape import Triangle
from shapes.coordinates import middle_between_points as middle
from shapes.modifiers import *


class Triangle_4(Triangle):
    def __init__(self):
        # note: middle is rotated 180 degrees
        division_labels = ['top', 'bottom_left', 'middle', 'bottom_right'] # old
        division_labels = ['top', 'bottom_right', 'bottom_left', 'middle']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'standard': [
                lambda vertices: [vertices[0],                      middle(vertices[0], vertices[1]), middle(vertices[0], vertices[2]) ],
                lambda vertices: [middle(vertices[0], vertices[1]), vertices[1],                      middle(vertices[1], vertices[2]) ],
                lambda vertices: [middle(vertices[0], vertices[2]), middle(vertices[1], vertices[2]), vertices[2],                     ],
                lambda vertices: [middle(vertices[1], vertices[2]), middle(vertices[0], vertices[2]), middle(vertices[0], vertices[1]) ],
                
            ]
        }

        options['translate'] = {
            'rotate_120_all': [rotator(1)] * 4,
            'rotate_120_middle': [same, same, same, rotator(1)],
            'rotate_240_all': [rotator(2)] * 4,
            'rotate_240_middle': [same, same, same, rotator(2)],
            'rotate_outside': [same, rotator(1), rotator(2), same],
            'rotate_bottom': [same, rotator(2), rotator(1), same],
            # 'flip_bottom_of_middle': [same, same, same, flipper([(1,2)])],
            # 'flip_bottom_of_outside': [flipper([(1,2)]), flipper([(1,2)]), flipper([(1,2)]), same],
            # 'flip_left_of_middle': [same, same, same, flipper([(0,1)])],
            # 'flip_right_of_middle': [same, same, same, flipper([(0,2)])],
            # 'flip_around_middle': [same, flipper([(0,1)]), flipper([(0,2)]), same],
            # 'flip_outside': [same, flipper([(0,2)]), flipper([(0,1)]), same],
        }

        options['color'] = {
            'checkerboard': [inverse, same, same, inverse],
            'corner': [inverse, same, same, same],
        }

        options['level'] = {
            'full': [decrement, decrement, decrement, decrement],
            'top': [decrement, zero,  decrement, zero],
            'bottom': [zero, decrement, zero, decrement],
            'middle': [zero, zero, decrement, zero],
            'outside': [decrement, decrement, zero, decrement],
            'top_heavy': [decrement, floor_half, decrement, floor_half],
            'bottom_heavy': [floor_half, decrement, floor_half, decrement],
            'middle_heavy': [floor_half, floor_half, decrement, floor_half],
            'outside_heavy': [decrement, decrement, zero, decrement],
        }

        super().__init__(division, options)
