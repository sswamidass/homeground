<?php
// Helper functions for the Homeground theme

if ( ! function_exists( 'homeground_nav' ) ) {
    function homeground_nav() {
        wp_nav_menu(array('theme_location' => 'primary', 'container' => false));
    }
}

?>
