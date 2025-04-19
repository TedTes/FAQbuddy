class Config:
    SECRET_KEY = "temp-secret-key"
    SENTENCE_TRANSFORMER_MODEL = "all-MiniLM-L6-v2"
    JWT_SECRET_KEY = "super-secret-key"
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_SECURE = False           
    JWT_COOKIE_SAMESITE = 'Lax'        
    JWT_ACCESS_COOKIE_PATH = '/'
    JWT_COOKIE_CSRF_PROTECT = False     