from config.figure import FigureConfigOptions
from config.figures.lambdas import *

def get_polygon_dividers():
    x = 0
    y = 1

    # find half x or y of rectangle
    def half(polygon, component):
        return (polygon[0][component] + polygon[1][component]) / 2
    
    def top_left(polygon):
        return [polygon[0], [half(polygon, x), half(polygon, y)]]

    def top_right(polygon):
        return [[half(polygon, x), polygon[0][y]], [polygon[1][x], half(polygon, y)]]

    def bottom_left(polygon):
        return [[polygon[0][x], half(polygon, y)], [half(polygon, x), polygon[1][y]]]

    def bottom_right(polygon):
        return [[half(polygon, x), half(polygon, y)], polygon[1]]

    return [top_left, top_right, bottom_left, bottom_right]

options = {}

options['color'] = {
    'checkerboard': [inverse, same, same, inverse],
    'corner': [inverse, same, same, same],
    'not_corner': [same, inverse, inverse, inverse],
    'random': [one_or_zero, one_or_zero, one_or_zero, one_or_zero],
    'random_diagonal': [one_or_zero, inverse, inverse, one_or_zero]
}

options['level'] = {
    'full': [decrement, decrement, decrement, decrement],
    'mix': [floor_half, decrement, decrement, floor_half],
    'diagonal': [decrement, zero, zero, decrement],
    'corner': [decrement, zero, zero, zero],
    'not_corner': [zero, decrement, decrement, decrement],
}

rectangle_4 = FigureConfigOptions(4, get_polygon_dividers(), options)

class Foo:
    def __init__(self):
        self.ok = True