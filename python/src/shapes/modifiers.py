from math import floor
import random

# functions to modify a dynamic property of a figure

# safe to use for level
decrement      = lambda x: x - 1
decrement_slow = lambda x: x - 0.5
floor_half     = lambda x: floor(x / 2)
inverse        = lambda x: 1 - x
zero           = lambda _: 0

# possibly unsafe for level
one_or_zero    = lambda _: random.choice([1, 0])
one_x2_or_zero = lambda _: random.choice([1, 1, 0])  
one_x3_or_zero = lambda _: random.choice([1, 1, 1, 0])
maybe_one      = lambda y: lambda _: random.choice([0] + [1] * y)

# unsafe for level
same           = lambda x: x
half           = lambda x: x / 2

def rotator(times):
    def rotate(vertices):
        count = len(vertices)
        rotated = [None] * count
        for i, vertex in enumerate(vertices):
            new_i = (i + times) % count
            rotated[new_i] = vertex
        return rotated
    return rotate

def flipper(swaps):
    def flip(vertices):
        for (a, b) in swaps:
            temp = vertices[a]
            vertices[a] = vertices[b]
            vertices[b] = temp
        return vertices
    return flip

flipper_rect_horizontal = flipper([(0, 1), (3, 2)])
flipper_rect_vertical = flipper([(0, 3), (1, 2)])
