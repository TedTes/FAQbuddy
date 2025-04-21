
from db import get_db
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

def register_user(email, password):
     try:
        with get_db() as conn:
          cursor = conn.execute("INSERT INTO config (theme, logo, hours) VALUES (?, ?, ?)", ("blue", "", "9 AM - 5 PM"))
          business_id = cursor.lastrowid
          password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
          conn.execute("INSERT INTO users (email, password_hash, business_id) VALUES (?, ?, ?)", (email, password_hash, business_id))
          conn.commit()
     except sqlite3.IntegrityError:
        conn.rollback()
        raise RuntimeError(f"error , Email already exists")

def login_user(email,password):
    try:
       with get_db() as conn:
            user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
            if user and bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
                access_token = create_access_token(identity=user["id"])
                return  access_token,  user["business_id"]
            raise ValueError({"error": "Invalid credentials"})
    except Exception as e:
         conn.rollback()
         raise RuntimeError(f"failed login user:{str(e)}")


def me(user_id):
    try:
       with get_db() as conn:
          user = conn.execute("SELECT id, email, business_id FROM users WHERE id = ?", (user_id,)).fetchone()     
          return user
    except Exception as e:
          raise RuntimeError(f"error fetching user:{str(e)}")  