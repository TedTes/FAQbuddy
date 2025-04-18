from db import get_db

def add_faq(data):
    with get_db as conn:
        try:
            cursor = conn.execute(
                "INSERT INTO faqs (question, answer, intent) VALUES (?, ?, ?)",
                (data["question"], data["answer"], data["intent"])
            )
            faq_id = cursor.lastrowid
            conn.commit()
        except Exception as e:
            print(f"error add_faq function : {str(e)}")
            conn.rollback()

def update_faq(id,data):
    with get_db as conn:
        try:
            conn.execute(
                "UPDATE faqs SET question = ?, answer = ?, intent = ? WHERE id = ?",
                (data["question"], data["answer"], data["intent"], id)
            )
            conn.commit()
        except Exception as e:
            print(f"error occured updating faq:{str(e)}")
            conn.rollback()
