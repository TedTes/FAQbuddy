from db import get_db

def add_faq(data):
    try:
        with get_db as conn:
            cursor = conn.execute(
                "INSERT INTO faqs (question, answer, intent) VALUES (?, ?, ?)",
                (data["question"], data["answer"], data["intent"])
            )
            faq_id = cursor.lastrowid
            conn.commit()
    except Exception as e:
        conn.rollback()
        raise RuntimeError(f"error add_faq function: {str(e)}")
           
def get_config(business_id):
    try:
        with get_db as conn:
            config = conn.execute("SELECT * FROM config WHERE business_id = ?",(business_id,)).fetchone()
            return config
    except Exception as e:
        conn.rollback()
        raise RuntimeError(f"error get_config function : {str(e)}")
def delete_faq(id):
       try:
          with get_db as conn:
            conn.execute("DELETE FROM faqs WHERE id = ?", (id,))
            conn.commit()
            if result.rowcount == 0:
                raise ValueError(f"FAQ with id={id} not found")
       except Exception as e:
            conn.rollback()
            raise RuntimeError(f"Error deleting FAQ: {str(e)}")
def list_faqs():
    try :
        with get_db as conn:
            faqs = conn.execute("SELECT * FROM faqs").fetchall()
            return faqs
    except Exception as e:
        conn.rollback()
        raise RuntimeError(f"Error listing FAQs: {str(e)}")
    
def update_faq(id,data):
     try:
        with get_db as conn:
            conn.execute(
                "UPDATE faqs SET question = ?, answer = ?, intent = ? WHERE id = ?",
                (data["question"], data["answer"], data["intent"], id)
            )
            conn.commit()
     except Exception as e:
        conn.rollback()
        raise RuntimeError(f"error occured updating faq:{str(e)}")
        
