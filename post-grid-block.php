<?php
/**
 * Plugin Name:       Post Grid
 * Description:       A block for displaying a grid of posts.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Mikael Eriksson
 * Author URI:        https://mikaeleriksson.nu
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       post-grid-block
 *
 * @package Jmeriksson
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function jmeriksson_post_grid_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'jmeriksson_post_grid_block_block_init' );
