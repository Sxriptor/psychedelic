#!/usr/bin/env python3
"""
RGB Pattern Image Generator
Creates images where each pixel has a different RGB color based on various patterns.
"""

import numpy as np
from PIL import Image
import argparse
import random
import math

def parse_resolution(resolution_str):
    """Parse resolution string like '1920x1080' into width and height."""
    try:
        width, height = map(int, resolution_str.split('x'))
        return width, height
    except ValueError:
        raise ValueError("Resolution must be in format 'WIDTHxHEIGHT' (e.g., '1920x1080')")

def generate_gradient_horizontal(width, height):
    """Generate horizontal RGB gradient."""
    img_array = np.zeros((height, width, 3), dtype=np.uint8)
    
    for x in range(width):
        # Create smooth RGB transitions across width
        r = int((x / width) * 255)
        g = int(((x * 2) % width) / width * 255)
        b = int(((x * 3) % width) / width * 255)
        img_array[:, x] = [r, g, b]
    
    return img_array

def generate_gradient_diagonal(width, height):
    """Generate diagonal RGB gradient."""
    img_array = np.zeros((height, width, 3), dtype=np.uint8)
    
    max_distance = math.sqrt(width**2 + height**2)
    
    for y in range(height):
        for x in range(width):
            distance = math.sqrt(x**2 + y**2)
            r = int((distance / max_distance) * 255)
            g = int(((x + y) / (width + height)) * 255)
            b = int(((x * y) / (width * height)) * 255)
            img_array[y, x] = [r, g, b]
    
    return img_array

def generate_radial_gradient(width, height):
    """Generate radial RGB gradient from center."""
    img_array = np.zeros((height, width, 3), dtype=np.uint8)
    
    center_x, center_y = width // 2, height // 2
    max_distance = math.sqrt(center_x**2 + center_y**2)
    
    for y in range(height):
        for x in range(width):
            distance = math.sqrt((x - center_x)**2 + (y - center_y)**2)
            angle = math.atan2(y - center_y, x - center_x) + math.pi
            
            r = int((distance / max_distance) * 255)
            g = int((angle / (2 * math.pi)) * 255)
            b = int(((distance / max_distance) * (angle / (2 * math.pi))) * 255)
            
            img_array[y, x] = [r, g, b]
    
    return img_array

def generate_random(width, height):
    """Generate completely random RGB values for each pixel."""
    img_array = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)
    return img_array

def generate_noise_pattern(width, height):
    """Generate perlin-like noise pattern."""
    img_array = np.zeros((height, width, 3), dtype=np.uint8)
    
    for y in range(height):
        for x in range(width):
            # Create pseudo-random but smoother patterns using sine waves
            r = int((math.sin(x * 0.01) * math.cos(y * 0.01) + 1) * 127.5)
            g = int((math.sin(x * 0.02 + 1) * math.cos(y * 0.015 + 1) + 1) * 127.5)
            b = int((math.sin(x * 0.015 + 2) * math.cos(y * 0.02 + 2) + 1) * 127.5)
            
            img_array[y, x] = [r, g, b]
    
    return img_array

def generate_checkerboard_rgb(width, height, block_size=8):
    """Generate RGB checkerboard pattern."""
    img_array = np.zeros((height, width, 3), dtype=np.uint8)
    
    colors = [
        [255, 0, 0],    # Red
        [0, 255, 0],    # Green
        [0, 0, 255],    # Blue
        [255, 255, 0],  # Yellow
        [255, 0, 255],  # Magenta
        [0, 255, 255],  # Cyan
        [255, 128, 0],  # Orange
        [128, 0, 255],  # Purple
    ]
    
    for y in range(height):
        for x in range(width):
            block_x = x // block_size
            block_y = y // block_size
            color_index = (block_x + block_y) % len(colors)
            img_array[y, x] = colors[color_index]
    
    return img_array

def generate_spiral(width, height):
    """Generate spiral RGB pattern."""
    img_array = np.zeros((height, width, 3), dtype=np.uint8)
    
    center_x, center_y = width // 2, height // 2
    
    for y in range(height):
        for x in range(width):
            dx, dy = x - center_x, y - center_y
            distance = math.sqrt(dx**2 + dy**2)
            angle = math.atan2(dy, dx) + math.pi
            
            spiral_value = (distance + angle * 20) % 255
            r = int(spiral_value)
            g = int((spiral_value + 85) % 255)
            b = int((spiral_value + 170) % 255)
            
            img_array[y, x] = [r, g, b]
    
    return img_array

def main():
    parser = argparse.ArgumentParser(description='Generate RGB pattern images')
    parser.add_argument('resolution', help='Image resolution (e.g., 1920x1080)')
    parser.add_argument('pattern', choices=[
        'gradient_h', 'gradient_d', 'gradient_r', 'random', 
        'noise', 'checkerboard', 'spiral'
    ], help='Pattern type to generate')
    parser.add_argument('-o', '--output', default='rgb_pattern.png', 
                       help='Output filename (default: rgb_pattern.png)')
    parser.add_argument('--block-size', type=int, default=8,
                       help='Block size for checkerboard pattern (default: 8)')
    
    args = parser.parse_args()
    
    try:
        width, height = parse_resolution(args.resolution)
        print(f"Generating {width}x{height} image with {args.pattern} pattern...")
        
        # Generate the pattern based on user choice
        if args.pattern == 'gradient_h':
            img_array = generate_gradient_horizontal(width, height)
        elif args.pattern == 'gradient_d':
            img_array = generate_gradient_diagonal(width, height)
        elif args.pattern == 'gradient_r':
            img_array = generate_radial_gradient(width, height)
        elif args.pattern == 'random':
            img_array = generate_random(width, height)
        elif args.pattern == 'noise':
            img_array = generate_noise_pattern(width, height)
        elif args.pattern == 'checkerboard':
            img_array = generate_checkerboard_rgb(width, height, args.block_size)
        elif args.pattern == 'spiral':
            img_array = generate_spiral(width, height)
        
        # Create and save the image
        img = Image.fromarray(img_array, 'RGB')
        img.save(args.output)
        
        print(f"Image saved as '{args.output}'")
        print(f"Total pixels: {width * height:,}")
        
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # If run without arguments, show interactive mode
    import sys
    if len(sys.argv) == 1:
        print("RGB Pattern Image Generator")
        print("=" * 30)
        
        # Get resolution
        resolution = input("Enter resolution (e.g., 1920x1080): ").strip()
        
        # Show pattern options
        patterns = {
            '1': 'gradient_h (Horizontal gradient)',
            '2': 'gradient_d (Diagonal gradient)', 
            '3': 'gradient_r (Radial gradient)',
            '4': 'random (Random colors)',
            '5': 'noise (Smooth noise pattern)',
            '6': 'checkerboard (RGB checkerboard)',
            '7': 'spiral (Spiral pattern)'
        }
        
        print("\nAvailable patterns:")
        for key, desc in patterns.items():
            print(f"{key}. {desc}")
        
        choice = input("\nSelect pattern (1-7): ").strip()
        pattern_map = {
            '1': 'gradient_h', '2': 'gradient_d', '3': 'gradient_r',
            '4': 'random', '5': 'noise', '6': 'checkerboard', '7': 'spiral'
        }
        
        if choice in pattern_map:
            pattern = pattern_map[choice]
            output = input("Output filename (default: rgb_pattern.png): ").strip() or "rgb_pattern.png"
            
            # Override sys.argv for main() function
            sys.argv = ['script', resolution, pattern, '-o', output]
            
            if pattern == 'checkerboard':
                block_size = input("Block size for checkerboard (default: 8): ").strip()
                if block_size.isdigit():
                    sys.argv.extend(['--block-size', block_size])
        else:
            print("Invalid choice!")
            sys.exit(1)
    
    main()