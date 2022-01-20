class Figure:
    def __init__(self, config, drawer, polygon, color, level):
        self.config = config
        self.drawer = drawer
        self.polygon = polygon
        self.color = color
        self.level = level

        # TODO: move to config
        self.change_intermediate_color = False
        self.change_final_color = True

        # on creation, immediately draw the complete figure, including its subfigures
        if self.level == 0:
            self.draw()
        else:
            self.divide()

    def draw(self):
        self.drawer.draw(self.polygon, self.color)

    def divide(self):
        # depth-first traversal
        for i in range(self.config.division):
            # get the properties of the subfigure
            next_polygon = self.config.get_next('polygon', i, self.polygon)
            next_level = self.config.get_next('level', i, self.level)

            next_color = self.color
            if next_level != 0 and self.change_intermediate_color:
                next_color = self.config.get_next('color', i, self.color)
            if next_level == 0 and self.change_final_color:
                next_color = self.config.get_next('color', i, self.color)
            
            # create the subfigure and implicitly draw it
            Figure(self.config, self.drawer, next_polygon, next_color, next_level)