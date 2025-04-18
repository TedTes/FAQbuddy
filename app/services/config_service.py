from db import get_db

def get_config(user_id):
    try:
        with get_db() as conn:
            config = conn.execute("SELECT * FROM config WHERE user_id = ?",(user_id,)).fetchone()
            return config
    except Exception as e:
        conn.rollback()
        raise RuntimeError(f"error get_config function : {str(e)}")


def update_config(user_id,config_data):
    try:
        with get_db() as conn:
            result = conn.execute("UPDATE config SET theme = ? ,logo = ? , hours = ? WHERE  user_id = ? "
            , (config_data["theme"], config_data["logo"], config_data["hours"],user_id))
    except Exception as e:
        raise RuntimeError(f"error updating_config service: {str(e)}")

