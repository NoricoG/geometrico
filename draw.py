from PIL import Image, ImageDraw

width = 1920 * 4
height = 1080 * 4

def draw(shapes, background, color_mapping, show=True):
    im = Image.new('RGB', (width, height), background)
    draw = ImageDraw.Draw(im)

    for shape in shapes:
        # print(shape)
        if len(shape.corners) == 2:
            draw.rectangle(
                [(shape.corners[0].x * width, shape.corners[0].y * height),
                 (shape.corners[1].x * width, shape.corners[1].y * height)],
                fill=color_mapping[shape.color]
            )
        elif len(shape.corners) == 3:
            # TODO: draw
            print(f'Drawing triangle of {shape.color} at {shape.corners[0]} {shape.corners[1]} {shape.corners[1]}')
        else:
            raise ValueError('Shape with {len(shape)} corners is not supported by the draw function')
    if show:
        im.show()