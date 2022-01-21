x = 0
y = 1


def middle_between_points(point_a, point_b):
    return [(point_a[x] + point_b[x]) / 2, (point_a[y] + point_b[y]) / 2]


def middle_of_bounds(vertices, dim):
    min_value = min([vertex[dim] for vertex in vertices])
    max_value = max([vertex[dim] for vertex in vertices])
    return (min_value + max_value) / 2


def middle_of_bounding_box(vertices):
    return [middle_of_bounds(vertices, x), middle_of_bounds(vertices, y)]
