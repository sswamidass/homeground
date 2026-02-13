<?php
/**
 * Plugin Name: Install Homeground Theme
 * Description: Automatically copies Homeground theme files on every load
 * Version: 1.0
 */

// Copy theme files if they don't exist or are incomplete
add_action('init', function() {
    $theme_dir = WP_CONTENT_DIR . '/themes/homeground';
    $source_dir = '/tmp/homeground-theme';
    
    // Check if source exists and target doesn't have style.css
    if (is_dir($source_dir) && (!file_exists($theme_dir . '/style.css') || filesize($theme_dir . '/style.css') < 1000)) {
        if (!is_dir($theme_dir)) {
            mkdir($theme_dir, 0755, true);
        }
        
        // Copy all files recursively
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($source_dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        
        foreach ($iterator as $item) {
            $target = $theme_dir . '/' . $iterator->getSubPathName();
            if ($item->isDir()) {
                if (!is_dir($target)) {
                    mkdir($target, 0755, true);
                }
            } else {
                copy($item, $target);
                chmod($target, 0644);
            }
        }
        
        error_log('Homeground theme files copied successfully');
    }
}, 1);
