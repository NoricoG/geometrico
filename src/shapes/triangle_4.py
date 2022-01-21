from shapes.shape import Shape
from shapes.coordinates import middle_between_points as middle
from shapes.modifiers import *


class Triangle_4(Shape):
    def __init__(self):
        # note: middle is rotated 180 degrees
        division_labels = ['top', 'bottom_left', 'middle', 'bottom_right']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'standard': [
                lambda vertices: [vertices[0],                      middle(vertices[0], vertices[1]), middle(vertices[0], vertices[2])],
                lambda vertices: [middle(vertices[0], vertices[1]), vertices[1],                      middle(vertices[1], vertices[2])],
                lambda vertices: [middle(vertices[1], vertices[2]), middle(vertices[0], vertices[2]), middle(vertices[0], vertices[1])],
                lambda vertices: [middle(vertices[0], vertices[2]), middle(vertices[1], vertices[2]), vertices[2]],
            ]
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
