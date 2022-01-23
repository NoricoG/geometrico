from shapes.shape import Rectangle
from shapes.coordinates import x, y, middle_x, middle_y, middle_xy as middle
from shapes.modifiers import *


class Rectangle_4(Rectangle):
    def __init__(self):
        division_labels = ['top_left', 'top_right', 'bottom_left', 'bottom_right']
        division = len(division_labels)

        options = {}

        options['polygon'] = {
            'straight': [
                lambda vertices: [ vertices[0],                         [middle_x(vertices), y(vertices[0])], middle(vertices),                     [x(vertices[0]), middle_y(vertices)] ],
                lambda vertices: [ [middle_x(vertices), y(vertices[1])], vertices[1],                         [x(vertices[1]), middle_y(vertices)], middle(vertices) ],
                lambda vertices: [ middle(vertices),                    [x(vertices[2]), middle_y(vertices)], vertices[2],                          [middle_x(vertices), y(vertices[2])] ],
                lambda vertices: [ [x(vertices[3]), middle_y(vertices)], middle(vertices),                    [middle_x(vertices), y(vertices[3])], vertices[3] ],
            ],
        }

        options['translate'] = {
            'rotate_90_all': [rotator(1)] * 4,
            'rotate_180_all': [rotator(2)] * 4,
            'rotate_270_all': [rotator(3)] * 4,
            'rotate_90_diagional': [rotator(1), same, rotator(1), same],
            'rotate_180_diagonal': [rotator(1), same, rotator(2), same],
            'mirror_vertical': [same, same, flipper_rect_vertical, flipper_rect_vertical],
            'mirror_horizontal': [same, flipper_rect_horizontal, flipper_rect_horizontal, same],
            'rotate_to_center': [rotator(2), rotator(3), same, rotator(1)],
            'from_center': [same, rotator(1), rotator(2), rotator(3)],
        }

        options['color'] = {
            'checkerboard': [inverse, same, inverse, same],
            'corner': [inverse, same, same, same],
            'not_corner': [same, inverse, inverse, inverse],
            'random_completely': [one_or_zero, one_or_zero, one_or_zero, one_or_zero],
            'random_diagonal': [one_or_zero, inverse, one_or_zero, inverse],
            'random_corner_inverse': [one_or_zero, inverse, inverse, inverse],
            'random_corner_same': [one_or_zero, same, same, same],
        }

        options['level'] = {
            'full': [decrement, decrement, decrement, decrement],
            'mix': [floor_half, decrement, floor_half, decrement],
            'diagonal': [decrement, zero, decrement, zero],
            'corner0': [decrement, zero, zero, zero],
            # 'corner1': [zero, decrement, zero, zero],
            # 'corner2': [zero, zero, decrement, zero],
            # 'corner3': [zero, zero, zero, decrement],
            'not_corner': [zero, decrement, decrement, decrement],
        }

        super().__init__(division, options)
