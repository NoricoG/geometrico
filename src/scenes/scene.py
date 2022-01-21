from canvas import Canvas


class Scene:
    def __init__(self, background, figures):
        self.canvas = Canvas(background)
        self.figures = figures

    def render(self):
        for figure in self.figures:
            self.canvas.change_coloring(figure.props.coloring)
            figure.canvas = self.canvas
            figure.draw()
    
    def show(self):
        print('Showtime')
        self.canvas.show()
        print()
