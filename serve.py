import os
import sys
import socket
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

class DualStackThreadingServer(ThreadingHTTPServer):
    address_family = socket.AF_INET6
    daemon_threads = True

    def server_bind(self):
        try:
            self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        except Exception as e:
            print("Failed to set IPV6_V6ONLY=0:", e)
        return super().server_bind()

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    
    try:
        server = DualStackThreadingServer(('', port), SimpleHTTPRequestHandler)
        print(f"Dual-stack server running on http://localhost:{port}/ and http://127.0.0.1:{port}/", flush=True)
    except Exception as e:
        print(f"Dual-stack failed ({e}), falling back to IPv4...", flush=True)
        server = ThreadingHTTPServer(('0.0.0.0', port), SimpleHTTPRequestHandler)
        print(f"IPv4 server running on http://127.0.0.1:{port}/", flush=True)
        
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
