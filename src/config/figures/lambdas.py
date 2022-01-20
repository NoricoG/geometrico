from math import floor
import random

decrement      = lambda x: x - 1
decrement_slow = lambda x: x - 0.5
half           = lambda x: x / 2
floor_half     = lambda x: floor(x / 2)
inverse        = lambda x: 1 - x
same           = lambda x: x
zero           = lambda _: 0
one_or_zero    = lambda _: random.choice([0, 1])