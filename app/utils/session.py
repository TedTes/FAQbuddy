def get_last_intent(session):
    return session.get("last_intent")

def handle_followup(query, last_intent):
    if last_intent == "hours" and "weekend" in query.lower():
        return {"answer": "Weekends are 10 AM - 4 PM."}
    return None