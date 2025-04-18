import sqlite3

def init_db():
    conn = sqlite3.connect("faqbuddy.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS faqs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            intent TEXT NOT NULL
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS config (
            business_id INTEGER PRIMARY KEY,
            theme TEXT,
            logo TEXT,
            hours TEXT
        )
    """)
    # Seed initial data
    conn.execute("INSERT OR IGNORE INTO config (business_id, theme, logo, hours) VALUES (1, 'blue', '', '9 AM - 5 PM')")
    conn.execute("INSERT OR IGNORE INTO faqs (question, answer, intent) VALUES ('What are your hours?', '9 AM - 5 PM', 'hours')")
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()