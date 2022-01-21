import random

class NamedFunction:
    def __init__(self, f, name):
        self.f = f
        self.name = name

    def __call__(self, *args, **kwargs):
        return self.f(*args, **kwargs)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name


def _get_random_color():
    return tuple(random.choices(range(256), k=3))


get_random_color = NamedFunction(_get_random_color, 'random')


class Coloring:
    def __init__(self, name, background, mapping):
        self.name = name
        self.background = background
        self.mapping = mapping

many_colorings = [
    Coloring('gbw', 'grey', {0: 'black', 1: 'white'}),
    Coloring('b_w', 'black', {0: None, 1: 'white'}),
    Coloring('w_b', 'white', {0: None, 1: 'black'}),
    Coloring('b_*', 'black', {0: None, 1: get_random_color()}),
    Coloring('w_*', 'white', {0: None, 1: get_random_color()}),
    Coloring('b*w', 'black', {0: get_random_color(), 1: 'white'}),
    Coloring('w*b', 'white', {0: get_random_color(), 1: 'black'}),
    Coloring('b**', 'black', {0: get_random_color(), 1: get_random_color()}),
    Coloring('w**', 'white', {0: get_random_color(), 1: get_random_color()}),
    Coloring('***', get_random_color(), {0: get_random_color(), 1: get_random_color()}),
    ] + 3 * [Coloring('b$w', 'black', {0: get_random_color, 1: 'white'})
    ] + 3 * [Coloring('w$b', 'white', {0: get_random_color, 1: 'black'})
]
