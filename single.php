<?php
// Récupérer les champs ACF
$reference = get_field('reference');
$type = get_field('type');

// Récupérer les taxonomies
$formats = get_the_terms(get_the_ID(), 'formats');
$categories = get_the_terms(get_the_ID(), 'categorie');

// Récupérer les posts précédent et suivant
$previous_post = get_previous_post();
$next_post = get_next_post();

// Initialisation des variables
$categorySlug = '';
$formatSlug = '';
$photoYear = '';

if ($categories && !is_wp_error($categories)) {
  $category = reset($categories);
  $categorySlug = $category->slug; // récupère le slug de la catégorie
}
if ($formats && !is_wp_error($formats)) {
  $format = reset($formats);
  $formatSlug = $format->slug; // récupère le slug du format
}
if (get_the_date()) {
  $photoYear = get_the_date('Y'); // récupère l'année de publication
}

$current_photo_id = get_the_ID(); // récupère l'ID de la photo courante

$args = array(
  'post_type' => 'photos',
  'paged' => 1,
  'posts_per_page' => 2,
  'tax_query' => array(
    array(
      'taxonomy' => 'categorie',
      'field' => 'slug',
      'terms' => $categorySlug,
    ),
  ),
  'post__not_in' => array($current_photo_id), // exclure la photo courante
); // arguments de la requete WP_Query

// requete WP_Query
$photos = new WP_Query($args);

get_header(); // récupération du template header.php
?>

<main>
  <div class="singlecontainer">
    <div class="singlecontent">

      <!-- DESCRIPTION DE LA PHOTO  -->
      <div class="left-single">
        <div class="photo-description">
          <h1><?php echo get_the_title(); ?></h1> <!-- récupère et affiche le titre de la photo -->
          <p>référence : <?php echo $reference; ?></p> <!-- récupère et affiche la référence de la photo -->
          <p class="category-single" data-id="<?php echo $current_photo_id; ?>" data-category="<?php echo $categorySlug; ?>">catégorie : <?php echo $categorySlug; ?></p> <!-- récupère et affiche le slug de la catégorie -->
          <p>format : <?php echo $formatSlug; ?></p> <!-- récupère et affiche le slug du format -->
          <p>type : <?php echo $type; ?></p> <!-- récupère et affiche le type de la photo -->
          <p>année : <?php echo $photoYear; ?></p> <!-- récupère et affiche l'année de publication -->
        </div>
      </div>

      <!-- PHOTO  -->
      <div class=" right-single">
        <div class="overlay-container">
          <div class="item-overlay-gallery">
            <span class="single-icon-fullscreen" data-fullscreen="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>"></span> <!-- récupère l'url de l'image en taille full pour la lightbox  -->
          </div>
        </div>
        <?php the_post_thumbnail('full'); ?> <!-- récupère et affiche l'image en taille full -->
      </div>
    </div>

    <!-- CONTACT -->
    <div class="singlecontact">
      <div class="left-single">
        <p>Cette photo vous intéresse ?</p><button class="contact-btn btn">Contact</button>
      </div>

      <!-- NAVIGATION ENTRE LES PHOTOS -->
      <div class="right-single">
        <div class="post-nav">

          <?php if ($previous_post) : ?>
            <a href="<?php echo get_permalink($previous_post); ?>" class="nav-link prev"></a>
            <div class="thumbnail-container">
              <?php echo get_the_post_thumbnail($previous_post, 'thumbnail', array('class' => 'nav-thumbnail nav-thumbnail-prev')); ?>
            </div>
          <?php endif; ?> <!-- récupère l'image du post précédent en taille thumbnail pour le hover -->

          <?php if ($next_post) : ?>
            <div class="thumbnail-container">
              <?php echo get_the_post_thumbnail($next_post, 'thumbnail', array('class' => 'nav-thumbnail nav-thumbnail-next')); ?>
            </div>
            <a href="<?php echo get_permalink($next_post); ?>" class="nav-link next"></a>
          <?php endif; ?> <!-- récupère l'image du post suivant en taille thumbnail pour le hover -->
        </div>
      </div>
    </div>

    <!-- GALERIE SIMILAIRE -->
    <div class="singlegallery">
      <h2> vous aimerez aussi
      </h2>

      <!-- Affichage des photos -->
      <div id="items-gallery" class="items-gallery">
        <?php
        if ($photos->have_posts()) {
          while ($photos->have_posts()) {
            $photos->the_post();
            get_template_part('template-parts/gallery-card'); // récupération du template gallery-card.php 
          }
        }
        ?>
      </div>

      <!-- Bouton charger plus -->
      <div class="load-btn-container">
        <button class="load-btn btn">Charger plus</button>
      </div>
      </section>
</main>

</div>
</div>
</main>

<?php
get_footer();
