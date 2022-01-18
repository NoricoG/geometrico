from draw import draw
from shape import NestedShape, Point
        
corners = [Point(0, 0), Point(1, 1)]

# TODO: generalize for other shapes, and organize in some way
def square_sub_corners(corners):
    half_x = (corners[0].x + corners[1].x) / 2
    half_y = (corners[0].y + corners[1].y) / 2

    return [
        # top left
        (Point(corners[0].x, corners[0].y),
            Point(half_x, half_y)),
        # top right
        (Point(half_x, corners[0].y),
            Point(corners[1].x, half_y)),
        # bottom left
        (Point(corners[0].x, half_y),
            Point(half_x, corners[1].y)),
        # bottom right
        (Point(half_x, half_y),
            Point(corners[1].x, corners[1].y)),
    ]

nestings = {
    'full': [True, True, True, True],
    'diagonal': [True, False, False, True],
    'corner': [True, False, False, False],
    'not_corner': [False, True, True, True],
}

invert = lambda x: 1 - x
same = lambda x: x

colorings = {
    'checkerboard': [invert, same, same, invert],
    'corner': [invert, same, same, same],
}

for levels in [9, 10, 11]:
# for nesting in nestings:
# levels = 4
    nesting = 'not_corner'
    coloring = 'checkerboard'
    square = NestedShape(corners, 1, levels, nestings[nesting], colorings[coloring], square_sub_corners)

    square.divide()
    flattened = square.flatten()
    print(f'{levels} levels nested {nesting} -> {len(flattened)} shapes')

    draw(flattened, 'gray', {0: 'black', 1: 'white'})


