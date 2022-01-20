from config.figure import FigureConfigOptions
from config.figures.lambdas import *

def get_polygon_dividers():
    x = 0
    y = 1

    def middle_between(point_a, point_b):
        return [(point_a[x] + point_b[x]) / 2, (point_a[y] + point_b[y]) / 2]

    def left(polygon):
        return [middle_between(polygon[1], polygon[2]), polygon[0], polygon[1]]

    def right(polygon):
        return [middle_between(polygon[1], polygon[2]), polygon[2], polygon[0]]

    return [left, right]

options = {}

options['color'] = {
    'a': [inverse, same],
    'b': [same, inverse],
}

options['level'] = {
    # 'full': [decrement, decrement],
    'mix': [decrement, floor_half],
    # 'a': [zero, decrement],
    # 'b': [decrement, zero],
}

triangle_2 = FigureConfigOptions(2, get_polygon_dividers(), options)