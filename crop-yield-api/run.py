from app.__init__ import app

if __name__ == "__main__":
    # Stable entrypoint for Windows; no auto-reloader
    app.run(host="127.0.0.1", port=5000, debug=False, use_reloader=False)


