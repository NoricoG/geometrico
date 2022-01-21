from shapes.shape import Shape
from shapes.coordinates import middle_between_points as between
from shapes.modifiers import *


class Triangle_2(Shape):
    def __init__(self):
        division_labels = ['left', 'right']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'standard': [
                lambda vertices: [between(vertices[1], vertices[2]), vertices[0], vertices[1]],
                lambda vertices: [between(vertices[1], vertices[2]), vertices[2], vertices[0]],
            ]
        }

        options['color'] = {
            'a': [inverse, same],
            'b': [same, inverse],
        }

        options['level'] = {
            'full': [decrement, decrement],
            'mix': [decrement, floor_half],
            'a': [zero, decrement],
            'b': [decrement, zero],
        }

        super().__init__(division, options)
