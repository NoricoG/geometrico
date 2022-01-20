import random

# parameters = ['polygon', 'color', 'level']

class FigureConfig:
    def __init__(self, division, outer_polygon, next):
        self.division = division
        self.outer_polygon = outer_polygon
        self.next = next

    def get_next(self, parameter, i, current):
        return self.next[parameter][i](current)

    def estimate_polygon_count(self, level, max_polygon_count):
        base = sum([self.get_next('level', i, 2) for i in range(self.division)])
        polygon_count = base ** level
        print(f'Number of polygons could reach {base}^{level} = {polygon_count:,}')
        if polygon_count > max_polygon_count:
            message = f'This combination of level value and level calculation can result in more than {max_polygon_count:,} polygons'
            raise ValueError(message)

class FigureConfigOptions:
    def __init__(self, division, next_polygon, options):
        self.division = division
        self.next_polygon = next_polygon
        self.options = options

    def choose(self, outer_polygon, choices):
        if len(choices) != len(self.options):
            raise ValueError(f'Number of choices {len(choices)} is different from number of options {len(self.options)}')
        next = {}
        for parameter, choice in choices.items():
            next[parameter] = self.options[parameter][choice]
        next['polygon'] = self.next_polygon
        return FigureConfig(self.division, outer_polygon, next)

    def choose_randomly(self, outer_polygon):
        next = {}
        for parameter in self.options:
            next[parameter] = random.choice(list(self.options[parameter].values()))
        next['polygon'] = self.next_polygon
        return FigureConfig(self.division, outer_polygon, next)