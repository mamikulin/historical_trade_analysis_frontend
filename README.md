cd /Users/mikemikulin/bmstu/archroute-frontend/src-tauri && cargo build --release

VITE_API_BASE_URL=http://192.168.1.69:8000/api VITE_IMAGE_SERVER=http://192.168.1.69:9000 source "$HOME/.cargo/env" && npm run tauri:build 2>&1 | tail -20

open /Users/mikemikulin/bmstu/archroute-frontend/src-tauri/target/release/bundle/macos/archroute.