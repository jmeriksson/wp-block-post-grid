<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
$number_of_posts = $attributes['numberOfPosts'] ?? 4;
$show_post_author = $attributes['showPostAuthor'] ?? false;
$link_to_author_page = $attributes['linkToAuthorPage'] ?? false;
$show_post_date = $attributes['showPostDate'] ?? false;
$show_post_image = $attributes['showPostImage'] ?? false;

$posts = get_posts( array(
    'numberposts' => $number_of_posts,
    'post_type' => 'post',
    'orderby' => 'date',
    'order' => 'DESC',
    'post_status' => 'publish'
) );


?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="grid">
        <?php foreach ( $posts as $post ) : ?>
            <article class="grid-item">
                <?php if ($show_post_image) : ?>
                    <figure class=grid-item__figure>
                        <?php echo get_the_post_thumbnail($post->ID, 'large'); ?>
                    </figure>
                <?php endif; ?>
                <h3 class="grid-item__heading"><?php echo esc_html($post->post_title); ?></h3>
                <?php if ($show_post_author || $show_post_date) : ?>
                    <div class="grid-item__post-meta">
                        <?php if ($show_post_author) : ?>
                            <small><?php esc_html_e('By', 'post-grid-block'); ?>
                                <?php if ($link_to_author_page) : ?>
                                    <a href="<?php echo get_author_posts_url($post->post_author); ?>">
                                        <?php echo get_the_author_meta('display_name', $post->post_author); ?>
                                    </a>
                                <?php else : ?>
                                    <?php echo get_the_author_meta('display_name', $post->post_author); ?>
                                <?php endif; ?>
                            </small>
                        <?php endif; ?>
                        <?php if ($show_post_date) : ?>
                            <?php $date = new DateTime($post->post_date); ?>
                            <small><?php echo $date->format('Y-m-d'); ?></small>
                        <?php endif; ?>
                    </div>
                    <div>
                        <p><?php echo wp_kses_post(get_the_excerpt($post->ID)); ?></p>
                    </div>
                    <a href="<?php echo esc_url(get_the_permalink($post->ID)); ?>"><?php echo esc_html_e('Read more', 'post-grid-block'); ?></a>
                <?php endif; ?>
            </article>
        <?php endforeach; ?>
    </div>
</div>
