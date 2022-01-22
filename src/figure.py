class Figure:
    def __init__(self, polygon, color, level, props, canvas=None):
        # specific for this figure
        self.polygon = polygon
        self.color = color
        self.level = level
        # shared with parent figures and child figures
        self.props = props
        self.canvas = canvas

    def render(self):
        if self.level <= 0:
            self.canvas.draw(self.polygon, self.color)
        else:
            self.divide()

    def divide(self):
        # depth-first traversal
        for i in range(self.props.division):
            # get the properties of the subfigure
            next_polygon = self.props.get_next('polygon', i, self.polygon)
            next_level = self.props.get_next('level', i, self.level)

            next_color = self.color
            if next_level != 0 and self.props.change_intermediate_color:
                next_color = self.props.get_next('color', i, self.color)
            if next_level == 0 and self.props.change_final_color:
                next_color = self.props.get_next('color', i, self.color)

            # create the subfigure and render it
            Figure(next_polygon, next_color, next_level, self.props, self.canvas).render()
