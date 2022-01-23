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
        self.placing = self.next['placing']

        # metadata
        self.shape_name = shape_name
        self.choices = choices
        self.polygon_summary = ''

    def __str__(self):
        parts = []
        parts.append(f'{self.shape_name[0]}{self.shape_name[-1]}')
        parts.append(self.choices['polygon'])
        parts.append(self.choices['placing'])
        if 'translate' in self.choices:
            parts.append(self.choices['translate'])
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
    def estimate_polygons(self, start_level, repeat=1):
        polygon_count = max([self.estimate_polygons_once(start_level) for _ in range(repeat)])
        # TODO: put max in summary when repeat > 1
        return polygon_count

    def estimate_polygons_once(self, start_level):
        depths = self.get_depths(start_level)
        max_depth = max(depths)
        total_weighted_depths = sum(x / max_depth for x in depths)
        polygon_count = int(total_weighted_depths ** max_depth)

        alternative = False
        alternative_count = round(total_weighted_depths * max_depth)
        if alternative_count > polygon_count:
            polygon_count = alternative_count
            alternative = True

        repetition = 1
        if 'translate' in self.choices:
            repetition = len(self.placing)
        polygon_count = repetition * polygon_count

        self.set_polygon_summary(repetition, total_weighted_depths, max_depth, polygon_count, start_level, alternative)
        print(self.polygon_summary)
        return polygon_count

    def get_depths(self, start_level):
        depths = []
        for i in range(self.division):
            depth = 0
            level = start_level
            while level > 0:
                level = self.get_next('level', i, level)
                depth += 1
            depths.append(depth)
        # print(depths)
        return depths


    def set_polygon_summary(self, repetition, base, depth, count, start_level, alternative):
        count = extra_round(count, 2)
        operation = '*' if alternative else '^'
        self.polygon_summary = f'{base:.1f}{operation}{depth}={count:,}'
        if repetition != 1:
            self.polygon_summary = f'{repetition}*{self.polygon_summary}'
        if start_level != depth:
            self.polygon_summary = f'{self.polygon_summary} ({start_level})'


# Properties that each shape can have
class GenericProps:
    def __init__(self, coloring, change_intermediate_color, change_final_color):
        self.coloring = coloring
        self.change_intermediate_color = change_intermediate_color
        self.change_final_color = change_final_color