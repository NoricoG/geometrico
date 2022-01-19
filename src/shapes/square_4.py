from shapes.shared import *

# inspiration for dynamic subshapes?
# subshapes = [half, half, half, half]

def get_square_shape():
    x = 0
    y = 1

    def half(shape, component):
        return (shape[0][component] + shape[1][component]) / 2
    
    def top_left(shape):
        return [[shape[0][x], shape[0][y]], [half(shape, x), half(shape, y)]]

    def top_right(shape):
        return [[half(shape, x), shape[0][y]], [shape[1][x], half(shape, y)]]

    def bottom_left(shape):
        return [[shape[0][x], half(shape, y)], [half(shape, x), shape[1][y]]]

    def bottom_right(shape):
        return [[half(shape, x), half(shape, y)], [shape[1][x], shape[1][y]]]

    return [top_left, top_right, bottom_left, bottom_right]

colors_options = {
    'checkerboard': [inverse, same, same, inverse],
    'corner': [inverse, same, same, same],
}

levels_options = {
    'full': [decrement, decrement, decrement, decrement],
    'diagonal': [decrement, zero, zero, decrement],
    'corner': [decrement, zero, zero, zero],
    'not_corner': [zero, decrement, decrement, decrement],
}

square = Shape(4, get_square_shape(), colors_options, levels_options)