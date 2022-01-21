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



