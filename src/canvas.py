import pygame
from pygame import gfxdraw

class Canvas:
    def __init__(self, width, height, background):
        self.width = width
        self.height = height
        self.surface = pygame.Surface((self.width, self.height))

        if callable(background):
            background = background()
        self.surface.fill(background)

    def change_coloring(self, coloring):
        self.coloring = coloring

    def draw(self, polygon, color_value):
        color = self.coloring.mapping[color_value]

        # if color is None, polygon is transparent, so don't draw
        if not color:
            return

        # generate a color, can be random each time
        if callable(color):
            color = color()

        vertices = [(vertex[0] * self.width, vertex[1] * self.height) for vertex in polygon]

        if len(polygon) == 2:
            self.draw_square(color, vertices)
        else:
            self.draw_polygon(color, vertices)

    def draw_square(self, color, vertices):
        # TODO: is vertex 0 ever smaller than vertex 1?
        left = vertices[0][0]
        top = vertices[0][1]
        width = vertices[1][0] - vertices[0][0]
        height = vertices[1][1] - vertices[0][1]
        rect = pygame.Rect(left, top, width, height)
        self.surface.fill(color, rect)

    def draw_polygon(self, color, vertices):
        raise NotImplementedError

class StandardCanvas(Canvas):
    def draw_polygon(self, color, vertices):
        pygame.draw.polygon(self.surface, color, vertices)

class GfxCanvas(Canvas):
    def draw_polygon(self, color, vertices):
        pygame.gfxdraw.aapolygon(self.surface, vertices, color)
        pygame.gfxdraw.filled_polygon(self.surface, vertices, color)