from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer


def run():
    Handler = SimpleHTTPRequestHandler
    Handler.extensions_map = {'wasm': 'application/wasm'}
    with TCPServer(('', 8000), Handler) as httpd:
        httpd.serve_forever()


if __name__ == '__main__':
    run()
