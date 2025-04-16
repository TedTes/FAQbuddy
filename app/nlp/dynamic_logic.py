from datetime import datetime
import re

def handle_dynamic(query, intent, answer):
    if intent == "hours" and "now" in query.lower():
        # Match formats like "9 AM - 5 PM" or "10:30 AM - 2:00 PM"
        match = re.search(r"(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)", answer)
        if match:
            start_hour = int(match.group(1))
            start_min = int(match.group(2) or 0)  # Default to 0 if no minutes
            start_period = match.group(3)
            end_hour = int(match.group(4))
            end_min = int(match.group(5) or 0)
            end_period = match.group(6)

            # Convert to 24-hour format
            if start_period == "PM" and start_hour != 12:
                start_hour += 12
            elif start_period == "AM" and start_hour == 12:
                start_hour = 0
            if end_period == "PM" and end_hour != 12:
                end_hour += 12
            elif end_period == "AM" and end_hour == 12:
                end_hour = 0

            # Current time
            now = datetime.now()
            current_hour = now.hour
            current_min = now.minute

            # Compare times (simplified, assumes same day)
            start_time = start_hour * 60 + start_min
            end_time = end_hour * 60 + end_min
            current_time = current_hour * 60 + current_min

            if start_time <= current_time <= end_time:
                return "Yes, we’re open now!"
            return "Sorry, we’re closed."
    return answer