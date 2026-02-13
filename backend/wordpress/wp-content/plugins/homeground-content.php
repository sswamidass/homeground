<?php
/**
 * Plugin Name: Homeground Content
 * Plugin URI: https://homeground.local
 * Description: Custom post types for Homeground content (Books, Coffee, Monthly Boxes)
 * Version: 1.0.0
 * Author: Homeground
 * License: GPL v2 or later
 * Text Domain: homeground-content
 * Domain Path: /languages
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Register Custom Post Types
add_action('init', function() {
    // Books Post Type
    register_post_type('hg_book', array(
        'labels' => array(
            'name' => 'Books',
            'singular_name' => 'Book',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'rest_base' => 'books',
        'show_in_rest' => true,
    ));

    // Coffee Post Type
    register_post_type('hg_coffee', array(
        'labels' => array(
            'name' => 'Coffee Roasters',
            'singular_name' => 'Coffee Roaster',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'rest_base' => 'coffee',
        'show_in_rest' => true,
    ));

    // Monthly Box Post Type
    register_post_type('hg_monthly_box', array(
        'labels' => array(
            'name' => 'Monthly Boxes',
            'singular_name' => 'Monthly Box',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'rest_base' => 'monthly-boxes',
        'show_in_rest' => true,
    ));
});

// Register Meta Fields for Books
add_action('init', function() {
    register_post_meta('hg_book', 'hg_author', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_book', 'hg_illustrator', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_book', 'hg_age_range', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_book', 'hg_theme', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_book', 'hg_features', array(
        'show_in_rest' => array('schema' => array('type' => 'array', 'items' => array('type' => 'string'))),
        'type' => 'array',
        'single' => true,
    ));
});

// Register Meta Fields for Coffee
add_action('init', function() {
    register_post_meta('hg_coffee', 'hg_location', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_coffee', 'hg_specialty', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_coffee', 'hg_featured', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
});

// Register Meta Fields for Monthly Box
add_action('init', function() {
    register_post_meta('hg_monthly_box', 'hg_month', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_monthly_box', 'hg_theme', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_monthly_box', 'hg_book_id', array(
        'show_in_rest' => true,
        'type' => 'integer',
        'single' => true,
    ));
    register_post_meta('hg_monthly_box', 'hg_coffee_id', array(
        'show_in_rest' => true,
        'type' => 'integer',
        'single' => true,
    ));
    register_post_meta('hg_monthly_box', 'hg_fact_card', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
    register_post_meta('hg_monthly_box', 'hg_activity', array(
        'show_in_rest' => true,
        'type' => 'string',
        'single' => true,
    ));
});

// Register migration endpoint
add_action('rest_api_init', function() {
    register_rest_route('homeground/v1', '/migrate', array(
        'methods' => 'POST',
        'callback' => 'homeground_migrate_content',
        'permission_callback' => '__return_true',
    ));
});

// Add CORS headers
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_handle_preflight_request');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit;
        }
        return $value;
    });
});

// Migration callback function
function homeground_migrate_content($request) {
    $sample_books = array(
        array(
            'post_type' => 'hg_book',
            'post_title' => 'The Lighthouse Keeper\'s Secret',
            'post_content' => 'Maya discovers the mysterious history of Split Rock Lighthouse and learns about the brave keepers who saved countless ships from fierce storms.',
            'post_status' => 'publish',
            'meta_input' => array(
                'hg_author' => 'Emily Waters',
                'hg_illustrator' => 'Michael Torres',
                'hg_age_range' => '6-10 years',
                'hg_theme' => 'Lake Superior History & Bravery',
                'hg_features' => json_encode(['28 pages', 'Full-color illustrations', 'Historical facts section']),
            )
        ),
        array(
            'post_type' => 'hg_book',
            'post_title' => 'Penny the Piping Plover',
            'post_content' => 'Join Penny, a brave little piping plover, on her journey along Michigan\'s sandy shores as she learns about protecting endangered species.',
            'post_status' => 'publish',
            'meta_input' => array(
                'hg_author' => 'Marcus Johnson',
                'hg_illustrator' => 'Sofia Chen',
                'hg_age_range' => '4-8 years',
                'hg_theme' => 'Michigan Wildlife & Conservation',
                'hg_features' => json_encode(['24 pages', 'Watercolor illustrations', 'Wildlife guide included']),
            )
        ),
        array(
            'post_type' => 'hg_book',
            'post_title' => 'The Edmund Fitzgerald Mystery',
            'post_content' => 'An age-appropriate adventure story inspired by the famous Great Lakes shipwreck, teaching about maritime history and nature\'s power.',
            'post_status' => 'publish',
            'meta_input' => array(
                'hg_author' => 'Sarah Mitchell',
                'hg_illustrator' => 'David Park',
                'hg_age_range' => '8-12 years',
                'hg_theme' => 'Maritime History & Weather',
                'hg_features' => json_encode(['32 pages', 'Detailed illustrations', 'Weather science facts']),
            )
        ),
        array(
            'post_type' => 'hg_book',
            'post_title' => 'Mackinac Island Magic',
            'post_content' => 'Experience the wonder of car-free Mackinac Island through the eyes of twins exploring historic forts, riding horses, and discovering unique ecology.',
            'post_status' => 'publish',
            'meta_input' => array(
                'hg_author' => 'Robert Chen',
                'hg_illustrator' => 'Lisa Anderson',
                'hg_age_range' => '5-9 years',
                'hg_theme' => 'Island Life & History',
                'hg_features' => json_encode(['28 pages', 'Vibrant illustrations', 'Island map included']),
            )
        ),
        array(
            'post_type' => 'hg_book',
            'post_title' => 'Sturgeon River Adventure',
            'post_content' => 'Follow Sammy the sturgeon on an incredible journey through Great Lakes rivers, learning about ancient fish species and water conservation.',
            'post_status' => 'publish',
            'meta_input' => array(
                'hg_author' => 'Jennifer Williams',
                'hg_illustrator' => 'Alex Martinez',
                'hg_age_range' => '6-10 years',
                'hg_theme' => 'River Ecosystems & Fish',
                'hg_features' => json_encode(['26 pages', 'Educational diagrams', 'Ecosystem poster']),
            )
        ),
        array(
            'post_type' => 'hg_book',
            'post_title' => 'Winter Waves of Lake Erie',
            'post_content' => 'Discover how Lake Erie transforms through the seasons and why lake effect snow creates winter wonderlands in nearby communities.',
            'post_status' => 'publish',
            'meta_input' => array(
                'hg_author' => 'Thomas Brown',
                'hg_illustrator' => 'Rachel Kim',
                'hg_age_range' => '4-8 years',
                'hg_theme' => 'Seasons & Lake Effect Weather',
                'hg_features' => json_encode(['24 pages', 'Seasonal illustrations', 'Weather tracking chart']),
            )
        ),
        array(
            'post_type' => 'hg_book',
            'post_title' => 'The Ice Breaker\'s Journey',
            'post_content' => 'Climb aboard with Captain Kate as her ice breaker clears shipping lanes through frozen Great Lakes, keeping commerce moving all winter long.',
            'post_status' => 'publish',
            'meta_input' => array(
                'hg_author' => 'Patricia Davis',
                'hg_illustrator' => 'James Wilson',
                'hg_age_range' => '7-11 years',
                'hg_theme' => 'Ships & Winter Navigation',
                'hg_features' => json_encode(['30 pages', 'Technical illustrations', 'Ship diagram poster']),
            )
        ),
        array(
            'post_type' => 'hg_book',
            'post_title' => 'Dunes of Indiana',
            'post_content' => 'Explore the magical Indiana Dunes where forests meet beaches, and learn how wind and water sculpted these towering sand mountains.',
            'post_status' => 'publish',
            'meta_input' => array(
                'hg_author' => 'Kevin Martinez',
                'hg_illustrator' => 'Emma Thompson',
                'hg_age_range' => '5-9 years',
                'hg_theme' => 'Sand Dunes & Geology',
                'hg_features' => json_encode(['26 pages', 'Nature illustrations', 'Dune formation guide']),
            )
        ),
    );

    $created = 0;
    foreach ($sample_books as $book) {
        $post_id = wp_insert_post($book);
        if ($post_id && !is_wp_error($post_id)) {
            $created++;
        }
    }

    return new WP_REST_Response(array(
        'success' => true,
        'message' => "Migration complete! Created $created books.",
        'created' => $created,
    ), 200);
}
