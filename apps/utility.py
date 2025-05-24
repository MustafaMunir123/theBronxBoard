import random
import string
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
def generate_random_password(length=8):
    """
    Generates a random password of given length.
    Contains only letters (uppercase & lowercase) and digits.
    """
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


def send_html_email(to_email:list, template_path, context, from_email=settings.EMAIL_HOST_USER):
    html_content = render_to_string(template_path, context)
    msg = EmailMultiAlternatives(
        subject=context['subject'],
        body="Your email client does not support HTML",  # Fallback
        from_email=from_email,
        to=to_email
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
