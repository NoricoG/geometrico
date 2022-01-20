import random
from PIL import Image, ImageDraw

class Drawer:
    def __init__(self, width, height, upscaling):
        self.width = width * upscaling
        self.height = height * upscaling
        self.upscaling = upscaling

    # TODO: maybe create new objects instead
    def new(self, background):
        self.im = Image.new('RGB', (self.width, self.height), background)
        self.im_draw = ImageDraw.Draw(self.im)

    def setup(self, color_mapping, random_color):
            self.color_mapping = color_mapping
            self.random_colors = random_color

    def draw(self, polygon, color):
        fill = self.color_mapping[color]
        # if fill is None, polygon is transparent
        if fill:
            if self.random_colors:
                fill = tuple(random.choices(range(256), k=3))

            vertices = [(vertex[0] * self.width, vertex[1] * self.height) for vertex in polygon]

            if len(polygon) == 2:
                self.im_draw.rectangle(vertices, fill=fill)
            else:
                self.im_draw.polygon(vertices, fill=fill)

    def show(self):
        self.im = self.im.resize((int(self.width / self.upscaling), int(self.height / self.upscaling)), Image.HAMMING)
        self.im.show()