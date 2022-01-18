class Point():
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f'({self.x}, {self.y})'

    def __repr__(self):
        return self.__str__()

class Shape:
    def __init__(self, corners, color):
        self.corners = corners
        self.color = color

    def __str__(self):
        return f'{self.color} @ {self.corners}'

    def __repr__(self):
        return self.__str__()

class NestedShape(Shape):
    def __init__(self, corners, color, levels, nesting, coloring, get_sub_corners):
        self.levels = levels
        self.nesting = nesting
        self.coloring = coloring
        self.get_sub_corners = get_sub_corners
        
        self.subshapes = []
        super().__init__(corners, color)

        # after super init because it needs self.corners
        if levels > 0:
            self.sub_corners = self.get_sub_corners(self.corners)
        else:
            # return Shape(corners, color)
            raise ValueError('NestedShape with levels 0 should not be created, use regular Shape instead')

    def __str__(self):
        return f'{self.color} containing {self.subshapes}'

    def flatten(self):
        if self.subshapes:
            flattened_subshapes = [
                x.flatten() if isinstance(x, NestedShape)
                else [x]
                for x in self.subshapes
            ]
            # turn list of lists of items into list of items
            flat = [item for sublist in flattened_subshapes for item in sublist]
            return flat
        else:
            return [self]

    # TODO: think about better way to deal with last 3 or 1 arguments
    # TODO: test more colorings
    def divide(self):
        for i in range(len(self.sub_corners)):
            if self.nesting[i] and self.levels > 1:
                self.subshapes.append(NestedShape(
                    self.sub_corners[i],
                    self.color,  # self.coloring[i](self.color),
                    self.levels - 1,
                    self.nesting,
                    self.coloring,
                    self.get_sub_corners
                ))
                self.subshapes[i].divide()
            else:
                self.subshapes.append(Shape(
                    self.sub_corners[i],
                    self.coloring[i](self.color)
                ))