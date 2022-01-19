class Config:
    def __init__(self, division, shapes, colors, levels, max_shape_count):
        self.division = division
        self.shapes = shapes
        self.colors = colors
        self.levels = levels
        self.max_shape_count = max_shape_count

    def shape(self, i, shape):
        return self.shapes[i](shape)

    def color(self, i, color):
        return self.colors[i](color)

    def level(self, i, level):
        return self.levels[i](level)

    def estimate_shape_count(self, level):
        base = sum([self.level(i, 2) for i in range(self.division)])
        shape_count = base ** level
        print(f'Number of shapes could reach {base}^{level} = {shape_count:,}')
        if shape_count > self.max_shape_count:
            raise ValueError(f'This combination of level value and level calculation can result in more than {self.max_shape_count:,} shapes')