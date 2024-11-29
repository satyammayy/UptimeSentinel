#!/bin/bash

# Start a new tmux session named 'app'
tmux new-session -d -s app "node ap.js"

# Split the tmux pane and run monitor.js
tmux split-window -h "node monitor.js"

# Attach to the tmux session
tmux attach-session -t app