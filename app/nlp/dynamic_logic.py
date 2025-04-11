from datetime import datetime
import re

def handle_dynamic(query, intent, answer):
    if intent == "hours" and "now" in query.lower():
        match = re.search(r"(\d+)\s*(AM|PM)\s*-\s*(\d+)\s*(AM|PM)", answer)
        if match:
            start_hour = int(match.group(1))
            # ... (time logic from earlier)
            return "Yes, we’re open now!" if start_hour <= datetime.now().hour <= end_hour else "Sorry, we’re closed."
    return answer