from canvas import StandardCanvas, GfxCanvas

class Image:
    def __init__(self, background, figures, summary, width, height):
        self.canvas = GfxCanvas(width, height, background)
        self.figures = figures
        self.summary = summary

    def render(self):
        for figure in self.figures:
            self.canvas.change_coloring(figure.props.coloring)
            figure.canvas = self.canvas
            figure.render()

