import random

from figure_props import FigureProps


class Shape:
    def __init__(self, division, options):
        # how many subfigures there are
        self.division = division
        # options for several static and dynamic figure properties
        self.options = options

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
