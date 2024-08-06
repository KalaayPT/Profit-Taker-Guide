#!/bin/bash

# Set variables for file paths
CUSTOM_DIR="./custom_files/vitepress/dist/client/theme-default/components"
NODE_MODULES_DIR="./node_modules/vitepress/dist/client/theme-default/components"

CUSTOM_FILE_1="$CUSTOM_DIR/VPLocalSearchBox.vue"
NODE_MODULES_FILE_1="$NODE_MODULES_DIR/VPLocalSearchBox.vue"

CUSTOM_FILE_2="$CUSTOM_DIR/VPNavBarSearchButton.vue"
NODE_MODULES_FILE_2="$NODE_MODULES_DIR/VPNavBarSearchButton.vue"

# Restore the custom files from backup
if [ -f "$CUSTOM_FILE_1" ]; then
    cp "$CUSTOM_FILE_1" "$NODE_MODULES_FILE_1"
    echo "Custom VPLocalSearchBox.vue restored."
else
    echo "Backup VPLocalSearchBox.vue not found, cannot restore."
fi

if [ -f "$CUSTOM_FILE_2" ]; then
    cp "$CUSTOM_FILE_2" "$NODE_MODULES_FILE_2"
    echo "Custom VPNavBarSearchButton.vue restored."
else
    echo "Backup VPNavBarSearchButton.vue not found, cannot restore."
fi

echo "Deployment script executed successfully."
