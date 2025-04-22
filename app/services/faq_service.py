from db import get_db

def add_faq(user_id,data):
    try:
        with get_db() as conn:
            user = conn.execute("SELECT business_id FROM users WHERE id = ?", (user_id,)).fetchone()
            cursor = conn.execute(
                "INSERT INTO faqs (question, answer, intent) VALUES (?, ?, ,?)",
                (data["question"], data["answer"], data["intent"],user["business_id"])
            )
            faq_id = cursor.lastrowid
            conn.commit()
    except Exception as e:
        conn.rollback()
        raise RuntimeError(f"error add_faq function: {str(e)}")
           
def delete_faq(user_id,id):
       try:
          with get_db() as conn:
            user = conn.execute("SELECT business_id FROM users WHERE id = ?", (user_id,)).fetchone()
            result = conn.execute("DELETE FROM faqs WHERE id = ? AND business_id = ?", (id,user["business_id"]))
            conn.commit()
            if result.rowcount == 0:
                raise ValueError(f"FAQ with id={id} not found")
       except Exception as e:
            conn.rollback()
            raise RuntimeError(f"Error deleting FAQ: {str(e)}")
def list_faqs_by_userId(user_id):
    try :
        with get_db() as conn:
            user = conn.execute("SELECT business_id FROM users WHERE id = ?", (user_id,)).fetchone()
            faqs = conn.execute("SELECT * FROM faqs WHERE business_id = ?",(user["business_id"],)).fetchall()
            return faqs
    except Exception as e:
        raise RuntimeError(f"Error listing FAQs: {str(e)}")
    
def update_faq(user_id,id,data):
     try:
        with get_db() as conn:
            user = conn.execute("SELECT business_id FROM users WHERE id = ?", (user_id,)).fetchone()
            conn.execute(
                "UPDATE faqs SET question = ?, answer = ?, intent = ? WHERE id = ? AND business_id = ?",
                (data["question"], data["answer"], data["intent"], id,user["business_id"])
            )
            conn.commit()
     except Exception as e:
        conn.rollback()
        raise RuntimeError(f"error occured updating faq:{str(e)}")
        
