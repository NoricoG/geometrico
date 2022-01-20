from figure import Figure
from config.common import max_polygon_count

class Scene:
    def __init__(self, drawer, layers):
        self.drawer = drawer
        self.layers = layers

    def show(self):
        self.drawer.new(background=self.layers[0].color_mapping['bg'])
        for layer in self.layers:
            layer.draw()      
        print('Showtime')
        self.drawer.show()

class Layer:
    def __init__(self, drawer, color_mapping, random_color, config, color, level):
        self.drawer = drawer
        self.color_mapping = color_mapping
        self.random_color = random_color
        self.config = config
        self.color = color
        self.level = level

    def draw(self):
        self.config.estimate_polygon_count(self.level, max_polygon_count)
        self.drawer.setup(self.color_mapping, self.random_color)
        Figure(self.config, self.drawer, self.config.outer_polygon, self.color, self.level)