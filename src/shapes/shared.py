decrement   = lambda x: x - 1
half        = lambda x: x / 2
inverse     = lambda x: 1 - x
same        = lambda x: x
zero        = lambda _: 0

class Shape():
    def __init__(self, division, shapes, colors_options, levels_options):
        self.division = division
        self.shapes = shapes
        self.colors_options = colors_options
        self.levels_options = levels_options

    def choose(self):
        raise NotImplementedError

    def choose_randomly(self):
        raise NotImplementedError
