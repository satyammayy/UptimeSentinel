#!/bin/bash

# Start a new tmux session named 'app'
tmux new-session -d -s app

# Run ap.js in the first pane interactively
tmux send-keys -t app "node ap.js" Enter

# Split the window horizontally and run monitor.js interactively in the second pane
tmux split-window -h
tmux send-keys -t app:0.1 "node monitor.js" Enter

# Attach to the tmux session
tmux attach-session -t app
