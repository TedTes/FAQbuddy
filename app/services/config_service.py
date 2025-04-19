from db import get_db

def get_config():
    try:
        with get_db() as conn:
            config = conn.execute("SELECT * FROM config WHERE user_id = 1").fetchone()
            return config
    except Exception as e:
        raise RuntimeError(f"error get_config function : {str(e)}")


def update_config(user_id,config_data):
    try:
        with get_db() as conn:
            user = conn.execute("SELECT business_id FROM users WHERE id = ?", (user_id,)).fetchone()
            result = conn.execute("UPDATE config SET theme = ? ,logo = ? , hours = ? WHERE  user_id = ? "
            , (config_data["theme"], config_data["logo"], config_data["hours"],user["business_id"]))
            conn.commit()
    except Exception as e:
        conn.rollback()
        raise RuntimeError(f"error updating_config service: {str(e)}")

