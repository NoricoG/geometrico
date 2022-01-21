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

    def __str__(self):
        return f'{self.shape_name} {self.choices} {self.coloring.name} int={self.change_intermediate_color} final={self.change_final_color}'

    def get_short_summary(self):
        short_choices = ''
        for prop, choice in self.choices.items():
            short_prop = prop[0]
            short_choice = ''.join(str(part)[0] for part in choice.split('_'))
            short_choices = f'{short_choices} {short_prop}={short_choice}'
        color_changes = f'i={int(self.change_intermediate_color)} f={int(self.change_final_color)}'
        return f'{self.shape_name[0]}{self.shape_name[-1]} {short_choices} {self.coloring.name} {color_changes}'

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
        print(f'Number of polygons in the order of {total_weighted_depths:.2f}^{max_depth} = {polygon_count:,}')
        return polygon_count
