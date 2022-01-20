from config.figure import FigureConfigOptions
from config.figures.lambdas import *

def get_polygon_dividers():
    x = 0
    y = 1

    def middle_between(point_a, point_b):
        return [(point_a[x] + point_b[x]) / 2, (point_a[y] + point_b[y]) / 2]
    
    def top(polygon):
        return [polygon[0], middle_between(polygon[0], polygon[1]), middle_between(polygon[0], polygon[2])]

    def bottom_left(polygon):
        return [middle_between(polygon[0], polygon[1]), polygon[1], middle_between(polygon[1], polygon[2])]

    # note: rotated 180 degrees
    def middle(polygon):
        return [middle_between(polygon[1], polygon[2]), middle_between(polygon[0], polygon[2]), middle_between(polygon[0], polygon[1])]

    def bottom_right(polygon):
        return [middle_between(polygon[0], polygon[2]), middle_between(polygon[1], polygon[2]), polygon[2]]

    return [top, bottom_left, middle, bottom_right]

options = {}

options['color'] = {
    'checkerboard': [inverse, same, same, inverse],
    'corner': [inverse, same, same, same],
}

options['level'] = {
    'full': [decrement, decrement, decrement, decrement],
    'top': [decrement, zero,  decrement, zero],
    'bottom': [zero, decrement, zero, decrement],
    'middle': [zero, zero, decrement, zero],
    'outside': [decrement, decrement, zero, decrement],
    'top_heavy': [decrement, floor_half,  decrement, floor_half],
    'bottom_heavy': [floor_half, decrement, floor_half, decrement],
    'middle_heavy': [floor_half, floor_half, decrement, floor_half],
    'outside_heavy': [decrement, decrement, zero, decrement],
}

triangle_4 = FigureConfigOptions(4, get_polygon_dividers(), options)