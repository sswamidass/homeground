<?php
/**
 * Force HTTPS URLs for Railway deployment
 * 
 * Railway uses a reverse proxy that forwards HTTPS requests to the container over HTTP.
 * This plugin detects the X-Forwarded-Proto header and tells WordPress to use HTTPS URLs.
 */

// Check if the request came through HTTPS proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}
