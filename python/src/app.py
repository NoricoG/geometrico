import sys
import random
import pygame
import math
import threading
from queue import Queue, Empty
from images.random import RandomImage

UPSCALING = 4
WIDTH = 1000
# slightly taller, to make sides of triangle equal
HEIGHT = int(math.sqrt(WIDTH ** 2 - ((WIDTH / 2) ** 2)))

# no need to check for input often
FPS = 30



MINIMAL_BUFFER = 5
DESIRED_BUFFER = 20
RENDERING_LIMIT = 2

DEBUG = True
if DEBUG:
    DESIRED_BUFFER = 10
    RENDERING_LIMIT = 1


def _add_to_buffer(buffer, rendering, errors, width, height):
    try:
        rendering.put(1)
        pygame.init()
        fast = buffer.qsize() < MINIMAL_BUFFER
        image = RandomImage(fast, width, height)
        image.render() 
        buffer.put(image)
        rendering.get()
    except Exception as e:
        errors.put(e)
        raise

class App:
    def __init__(self):
        pygame.init()
        self.width = WIDTH
        self.height = HEIGHT
        self.upscaling = UPSCALING
        self.scaled_width = self.width * self.upscaling
        self.scaled_height = self.height * self.upscaling
        self.had_initial_resize = False
        self.had_initial_image = False
        self.waiting_for_buffer = False
        self.set_screen_mode()
        self.clock = pygame.time.Clock()

        self.buffer = Queue()
        self.rendering = Queue()
        self.errors = Queue()

        self.current_image = None
        self.previous_image = None

        self.caption = 'RENDERING FIRST IMAGE'
        self.update_caption()

        self.add_to_buffer()

    def set_screen_mode(self):
        self.screen = pygame.display.set_mode((self.width, self.height), pygame.RESIZABLE)

    def update_caption(self, message=None):
        if message:
            self.caption = message
        ready = self.buffer.qsize()
        rendering = self.rendering.qsize()
        pygame.display.set_caption(f'{self.caption}   ▬   {ready} ready   ▬   {rendering} rendering')

    def add_to_buffer(self):
        thread = threading.Thread(
            target=_add_to_buffer,
            args=(self.buffer, self.rendering, self.errors, self.scaled_width, self.scaled_height)
        )
        thread.setDaemon(True)
        thread.start()

    def show(self, image):
        scaled = pygame.transform.smoothscale(image.canvas.surface, (self.width, self.height))
        self.screen.blit(scaled, (0, 0))
        pygame.display.flip()
        self.update_caption(image.summary)

    def show_from_buffer(self):
        try:
            image = self.buffer.get(block=False)
            self.previous_image = self.current_image
            self.current_image = image
            self.show(self.current_image)
            self.waiting_for_buffer = False
        except Empty:
            self.waiting_for_buffer = True
            self.update_caption('NEXT IMAGE WILL BE SHOWN SOON')
        
    def show_previous(self):
        self.show(self.previous_image)
        # swap previous and current
        temp = self.previous_image
        self.previous_image = self.current_image
        self.current_image = temp

    def handle_resize(self, event):
        if self.had_initial_resize:
            print(event)
            self.width = event.x
            self.height = event.y
            self.scaled_width = self.width * self.upscaling
            self.scaled_height = self.height * self.upscaling
            self.set_screen_mode()
            self.show(self.current_image)
        else:
            self.had_initial_resize = True

    def check_for_errors(self):
        if not self.errors.empty():
            raise Exception('Multiple Exceptions')

    def start(self):
        while True:
            self.check_for_errors()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    sys.exit()
                elif event.type == pygame.WINDOWSIZECHANGED:
                    self.handle_resize(event)
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE or event.key == pygame.K_RIGHT:
                        self.show_from_buffer()
                    elif event.key == pygame.K_LEFT:
                        self.show_previous()
                    if event.key == pygame.K_q:
                        print('Exiting because Q was pressed')
                        sys.exit()
            
            if not self.had_initial_image and not self.buffer.empty():
                self.show_from_buffer()
                self.had_initial_image = True

            if self.waiting_for_buffer and not self.buffer.empty():
                self.show_from_buffer()

            rendering = self.rendering.qsize()
            if self.buffer.qsize() + rendering < DESIRED_BUFFER and rendering < RENDERING_LIMIT:
                self.add_to_buffer()
            
            self.update_caption()
            self.clock.tick(FPS)
            

if __name__ == '__main__':
    App().start()
