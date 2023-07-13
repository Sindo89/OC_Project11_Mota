<?php
$args = array(
  'post_type' => 'photos',
  'posts_per_page' => -1,
);

$photos = new WP_Query($args);

get_header();
?>

<main>

  <section class="hero">
    <?php $hero_image = random_hero_image(); ?>
    <img class="img-hero" src="<?php echo $hero_image; ?>" />
    <div class="content-hero">
      <h1 class="title-hero">PHOTOGRAPHE EVENT</h1>
    </div>
  </section>

  <section class=gallery>

    <div class="dropdown">
      <div class="categories-dropdown">
      </div>

      <div class="formats-dropdown">
      </div>

      <div class="date-dropdown">
      </div>
    </div>

    <div class="items-gallery">
      <?php
      global $photos;
      if ($photos->have_posts()) {
        while ($photos->have_posts()) {
          $photos->the_post();

          // Récupérer les champs ACF
          $reference = get_field('reference');

          // Récupérer les taxonomies
          $formats = get_the_terms(get_the_ID(), 'formats');
          $categories = get_the_terms(get_the_ID(), 'categorie');
      ?>

          <div class="item-gallery">
            <a href="<?php echo get_permalink(); ?>">
              <?php the_post_thumbnail('full'); ?>
            </a>

            <div class="item-overlay-gallery">
              <span class="icon-fullscreen"></span>
              <span class="icon-eye"></span>
              <span class="photo-reference"><?php echo $reference; ?></span>
              <span class="photo-category">
                <?php
                if ($categories && !is_wp_error($categories)) {
                  foreach ($categories as $category) {
                    echo $category->name;
                  }
                }
                ?>
              </span>
            </div>
          </div>

      <?php }
      }
      ?>
    </div>

  </section>



</main>

<?php
get_footer();
