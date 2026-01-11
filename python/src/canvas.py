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
        self.draw_polygon(color, vertices)

    def draw_polygon(self, color, vertices):
        pygame.draw.aalines(self.surface, color, True, vertices)
        pygame.draw.polygon(self.surface, color, vertices)
