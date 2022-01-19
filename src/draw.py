from PIL import Image, ImageDraw

class Drawer:
    def __init__(self, width, height, color_mapping, background):
        self.width = width
        self.height = height
        self.color_mapping = color_mapping

        self.im = Image.new('RGB', (self.width, self.height), background)
        self.im_draw = ImageDraw.Draw(self.im)

    # TODO: maybe move width and height out of here and into a setting or the properties of the outermost figure
    def draw(self, shape, color):
        if len(shape) == 2:
            self.im_draw.rectangle(
                [(shape[0][0] * self.width, shape[0][1] * self.height),
                 (shape[1][0] * self.width, shape[1][1] * self.height)],
                fill=self.color_mapping[color]
            )
        else:
            raise NotImplementedError('Still have to implement drawing of polygon')

    def show(self):
        self.im.show()