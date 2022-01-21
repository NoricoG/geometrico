import math
from PIL import Image, ImageDraw


UPSCALING = 8
WIDTH = 3000
# slightly taller, to make sides of triangle equal
HEIGHT = int(math.sqrt(WIDTH ** 2 - ((WIDTH / 2) ** 2)))


class Canvas:
    def __init__(self, background):
        self.upscaling = UPSCALING
        self.width = WIDTH * self.upscaling
        self.height = HEIGHT * self.upscaling

        if callable(background):
            background = background()
        self.im = Image.new('RGB', (self.width, self.height), background)
        self.im_draw = ImageDraw.Draw(self.im)

    def change_coloring(self, coloring):
        self.coloring = coloring

    def draw(self, polygon, color):
        fill = self.coloring.mapping[color]

        # if fill is None, polygon is transparent, so don't draw
        if not fill:
            return

        # generate a color, can be random each time
        if callable(fill):
            fill = fill()

        vertices = [(vertex[0] * self.width, vertex[1] * self.height) for vertex in polygon]

        if len(polygon) == 2:
            self.im_draw.rectangle(vertices, fill=fill)
        else:
            self.im_draw.polygon(vertices, fill=fill)

    def show(self):
        # downscale for smooth edges
        self.im = self.im.resize((int(self.width / self.upscaling), int(self.height / self.upscaling)), Image.HAMMING)
        self.im.show()
