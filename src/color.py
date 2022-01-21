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