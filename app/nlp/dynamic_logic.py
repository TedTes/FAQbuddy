from datetime import datetime
import re

# Registry of dynamic handlers
DYNAMIC_HANDLERS = {}

def register_dynamic(intent, keyword):
    def decorator(func):
        DYNAMIC_HANDLERS[(intent, keyword)] = func
        return func
    return decorator

@register_dynamic("hours", "now")
def handle_open_now(query, intent, answer):
    match = re.search(r"(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)", answer)
    if match:
        start_hour = int(match.group(1))
        start_min = int(match.group(2) or 0)
        start_period = match.group(3)
        end_hour = int(match.group(4))
        end_min = int(match.group(5) or 0)
        end_period = match.group(6)

        if start_period == "PM" and start_hour != 12:
            start_hour += 12
        elif start_period == "AM" and start_hour == 12:
            start_hour = 0
        if end_period == "PM" and end_hour != 12:
            end_hour += 12
        elif end_period == "AM" and end_hour == 12:
            end_hour = 0

        now = datetime.now()
        current_hour = now.hour
        current_min = now.minute

        start_time = start_hour * 60 + start_min
        end_time = end_hour * 60 + end_min
        current_time = current_hour * 60 + current_min

        if start_time <= current_time <= end_time:
            return "Yes, we’re open now!"
        return "Sorry, we’re closed."
    return answer

def process_dynamic(query, intent, answer):
    # Check all registered handlers
    for (handler_intent, keyword), handler in DYNAMIC_HANDLERS.items():
        if handler_intent == intent and keyword in query.lower():
            return handler(query, intent, answer)
    return answer