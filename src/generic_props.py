# Properties that each shape can have
class GenericProps:
    def __init__(self, coloring, change_intermediate_color, change_final_color):
        self.coloring = coloring
        self.change_intermediate_color = change_intermediate_color
        self.change_final_color = change_final_color