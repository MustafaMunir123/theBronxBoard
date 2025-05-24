import random
import string

def generate_random_password(length=8):
    """
    Generates a random password of given length.
    Contains only letters (uppercase & lowercase) and digits.
    """
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))