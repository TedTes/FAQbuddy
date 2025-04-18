from app import create_app
from flask import render_template
app = create_app()


@app.route("/health",methods=["GET"])
def check_health():
    return jsonify({"status":"ok"})

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)