_x = 0
_y = 1

def x(vertex):
    return vertex[_x]

def y(vertex):
    return vertex[_y]

def middle_x(vertices):
    return middle_of_bounds(x, vertices)

def middle_y(vertices):
    return middle_of_bounds(y, vertices)

def middle_of_bounds(dim, vertices):
    min_value = min([vertex[dim] for vertex in vertices])
    max_value = max([vertex[dim] for vertex in vertices])
    return (min_value + max_value) / 2

def middle_xy(vertices):
    return [middle_x(vertices), middle_y(vertices)]

def middle_between_points(point_a, point_b):
    return [(point_a[_x] + point_b[_x]) / 2, (point_a[_y] + point_b[_y]) / 2]
