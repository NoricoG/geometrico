from config.figure import FigureConfigOptions
from config.figures.lambdas import *

def get_polygon_dividers():
    x = 0
    y = 1

    def center_of(polygon):
        def middle_of(polygon, dim):
            min_value = min([point[dim] for point in polygon])
            max_value = max([point[dim] for point in polygon])
            return (min_value + max_value) / 2
        return [middle_of(polygon, x), middle_of(polygon, y)]

    def top_left(polygon):
        return [center_of(polygon), polygon[0], polygon[1]]

    def top_right(polygon):
        return [center_of(polygon), polygon[2], polygon[0]]

    def bottom(polygon):
        return [center_of(polygon), polygon[1], polygon[2]]

    return [top_left, top_right, bottom]

options = {}

options['color'] = {
    'a': [inverse, same, same],
    'b': [same, inverse, same],
}

options['level'] = {
    # 'full': [decrement, decrement, decrement],
    'mix': [floor_half, decrement, decrement],
    # 'a': [zero, zero, decrement],
    # 'b': [decrement, decrement, zero],
}

triangle_3 = FigureConfigOptions(3, get_polygon_dividers(), options)