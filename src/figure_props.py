import math

def extra_round(n, precision):
        digits = math.ceil(math.log10(n))
        if digits <= precision:
            return n
        divide_by = 10 ** (digits - precision)
        rounded = round(n / divide_by) * divide_by
        return rounded

class FigureProps:
    def __init__(self, next, division, generic_props, shape_name, choices):
        # dynamic properties
        self.next = next

        # static properties
        self.division = division
        self.coloring = generic_props.coloring
        self.change_intermediate_color = generic_props.change_intermediate_color
        self.change_final_color = generic_props.change_final_color

        # metadata
        self.shape_name = shape_name
        self.choices = choices
        self.polygon_summary = ''

    def __str__(self):
        parts = []
        parts.append(f'{self.shape_name[0]}{self.shape_name[-1]}')
        parts.append(self.choices['polygon'])
        parts.append(self.choices['level'])
        parts.append('  ▬  ')
        parts.append(self.polygon_summary)
        parts.append('  ▬  ')
        parts.append(self.coloring.name)
        parts.append(self.choices['color'])
        if self.change_intermediate_color:
            parts.append('int')
        if self.change_final_color:
            parts.append('fin')
        return ' '.join(parts)

    # get the value of a dynamic property
    # parameter can be polygon, color or level
    def get_next(self, parameter, i, current):
        return self.next[parameter][i](current)

    # rough estimate of amount of recursion, used to avoid long runtimes
    # not accurate at low numbers, but that isn't important
    def estimate_polygons(self, start_level):
        depths = []
        for i in range(self.division):
            depth = 0
            level = start_level
            while level > 0:
                level = self.get_next('level', i, level)
                depth += 1
            depths.append(depth)
        # print(depths)

        max_depth = max(depths)
        total_weighted_depths = sum(x / max_depth for x in depths)
        polygon_count = int(total_weighted_depths ** max_depth)
        print(f'{total_weighted_depths:.2f}^{max_depth} = {polygon_count:,} polygons')
        self.set_polygon_summary(total_weighted_depths, max_depth, polygon_count)
        return polygon_count

    def set_polygon_summary(self, base, depth, count):
        count = extra_round(count, 2)
        self.polygon_summary = f'{base:.1f}^{depth}={count:,}'

