class FigureProps:
    def __init__(self, next, division, color_mapping, change_intermediate_color, change_final_color, shape_name, choices):
        # dynamic properties
        self.next = next

        # static properties
        self.division = division
        self.color_mapping = color_mapping
        self.change_intermediate_color = change_intermediate_color
        self.change_final_color = change_final_color

        # metadata
        self.shape_name = shape_name
        self.choices = choices

    def __str__(self):
        return f'{self.shape_name} {self.choices} {self.color_mapping} int={self.change_intermediate_color} final={self.change_final_color}'

    def get_short_summary(self):
        short_choices = ''
        for prop, choice in self.choices.items():
            short_prop = prop[0]
            short_choice = ''.join(str(part)[0] for part in choice.split('_'))
            short_choices = f'{short_choices} {short_prop}={short_choice}'
        # TODO: color_mapping
        color_changes = f'i={int(self.change_intermediate_color)} f={int(self.change_final_color)}'
        return f'{self.shape_name[0]}{self.shape_name[-1]} {short_choices} {color_changes}'

    # get the value of a dynamic property
    # parameter can be polygon, color or level
    def get_next(self, parameter, i, current):
        return self.next[parameter][i](current)

    def estimate_polygon_count(self, level):
        base = sum([self.get_next('level', i, 2) for i in range(self.division)])
        polygon_count = base ** level
        print(f'Number of polygons could reach {base}^{level} = {polygon_count:,}')
        return polygon_count
