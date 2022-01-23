import random

from figure_props import FigureProps
from shapes.modifiers import rotator, flipper, flipper_rect_horizontal, flipper_rect_vertical


class Shape:
    def __init__(self, placings, division, options):
        # how many subfigures there are
        self.division = division
        # options for several static and dynamic figure properties
        self.options = options
        self.options['placing'] = placings

    def get_props(self, generic_props, choices):
        if len(choices) != len(self.options):
            raise ValueError(f'Number of choices {len(choices)} is different from number of options {len(self.options)}')

        next = {}
        for parameter, choice in choices.items():
            next[parameter] = self.options[parameter][choice]
        
        shape_name = type(self).__name__
        return FigureProps(next, self.division, generic_props, shape_name, choices)

    def get_random_props(self, generic_props):
        choices = {
            parameter: random.choice(list(parameter_options.keys()))
            for parameter, parameter_options in self.options.items()
        }
        return self.get_props(generic_props, choices)


class Rectangle(Shape):
    def __init__(self, *args):
        # top_left, top_right, bottom_right, bottom_left
        placings = {
            'full': [[[0, 0], [1, 0], [1, 1], [0, 1]]],
            # 'diamond': [[[0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5]]],  # TODO: fix rendering
        }
        # placings['diamond_mirror'] = [
        #         placings['diamond'][0],
        #         flipper_rect_vertical([[x, y - 1] for x, y in placings['diamond'][0]]),
        #         flipper_rect_horizontal([[x + 1, y] for x, y in placings['diamond'][0]]),
        #         flipper_rect_vertical([[x, y + 1] for x, y in placings['diamond'][0]]),
        #         flipper_rect_horizontal([[x - 1, y] for x, y in placings['diamond'][0]]),    
        #     ]

        super().__init__(placings, *args)


class Triangle(Shape):
    def __init__(self, *args):
        # top, bottom_left, bottom_right
        placings = {
            'double_with_bottom':  [
                [[0, 1], [1, 1], [0, 0]],
                [[1, 0], [0, 0], [1, 1]]
            ],
            # TODO
            # 'double_with_bottom__mirror': [
            #     [[0, 1], [1, 1], [0, 0]],
            #     [[1, 0], [0, 0], [1, 1]]
            # ],
            # 'double_with_side_mirror':  [
            #     [[0, 1], [1, 1], [0, 0]],
            #     [[1, 0], [0, 0], [1, 1]]
            # ],
            'tripple': [
                [[0.5, 0], [ 1,   1], [0,   1]], # middle pointing up
                [[0,   1], [-0.5, 0], [0.5, 0]], # left pointing down
                [[1,   1], [ 0.5, 0], [1.5, 0]], # right pointing down
            ],
            'quadruple': [
                [[0.5, 0.5], [1, 0], [0, 0]],
                [[0.5, 0.5], [0, 0], [0, 1]],
                [[0.5, 0.5], [1, 1], [1, 0]],
                [[0.5, 0.5], [0, 1], [1, 1]],
            ],
            # TODO
            # 'quadruple_mirror': [
            #     [[0.5, 0.5], [1, 0], [0, 0]],
            #     [[0.5, 0.5], [0, 0], [0, 1]],
            #     [[0.5, 0.5], [1, 1], [1, 0]],
            #     [[0.5, 0.5], [0, 1], [1, 1]],
            # ],
        }

        super().__init__(placings, *args)
