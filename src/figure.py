class Figure:
    def __init__(self, config, drawer, shape, color, level):
        self.config = config
        self.drawer = drawer
        self.shape = shape
        self.color = color
        self.level = level

        # on creation, immediately draw the complete figure, including its subfigures
        if self.level == 0:
            self.draw()
        else:
            self.divide()

    def draw(self):
        self.drawer.draw(self.shape, self.color)

    def divide(self):
        # depth-first traversal
        for i in range(self.config.division):
            # get the properties of the subfigure
            shape = self.config.shape(i, self.shape)
            color = self.config.color(i, self.color)
            level = self.config.level(i, self.level)
            # create the subfigure and implicitly draw it
            Figure(self.config, self.drawer, shape, color, level)