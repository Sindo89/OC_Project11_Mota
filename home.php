<?php
$args = array( // Arguments de la requête
  'post_type' => 'photos', // Type de contenu
  'posts_per_page' => -1, // Nombre de posts par page
);

$photos = new WP_Query($args); // Requête


// Récupération du header 
get_header();
?>

<main>

  <!-- HERO  -->
  <section class="hero">

    <!-- Appel de la fonction random_hero_image() pour récupérer une image aléatoire -->
    <?php $hero_image = random_hero_image(); ?>
    <img class="img-hero" src="<?php echo $hero_image; ?>" />

    <div class="content-hero">
      <h1 class="title-hero">PHOTOGRAPHE EVENT</h1>
    </div>
  </section>

  <!-- GALLERY  -->
  <section class=gallery>

    <!-- Menu déroulant  -->
    <div class="dropdown">
      <div class="left-dropdown">

        <div class="categories-dropdown custom-select">
          <select id="category-select">
            <option value="">CATÉGORIES</option>
            <?php
            $categories = get_terms('categorie'); // Récupère toutes les catégories
            foreach ($categories as $category) {
              echo '<option value="' . $category->slug . '">' . $category->name . '</option>'; // Affiche les options
            }
            ?>
          </select>
        </div>

        <div class="formats-dropdown custom-select">
          <select id="format-select">
            <option value="">FORMATS</option>
            <?php
            $formats = get_terms('formats'); // Récupère tous les formats
            foreach ($formats as $format) {
              echo '<option value="' . $format->slug . '">' . $format->name . '</option>'; // Affiche les options
            }
            ?>
          </select>
        </div>

      </div>

      <div class="right-dropdown">

        <div class="date-dropdown  custom-select">
          <select id="date-select">
            <option value="">TRIER PAR</option>
            <?php
            $years = array(); // Tableau pour stocker les années des photos
            if ($photos->have_posts()) {
              while ($photos->have_posts()) {
                $photos->the_post();
                $year = get_the_date('Y'); // Récupère l'année de publication
                if (!in_array($year, $years)) {
                  $years[] = $year; // Ajoute l'année au tableau uniquement si elle n'est pas déjà présente
                }
              }
            }
            sort($years); // Trie les années par ordre croissant
            foreach ($years as $year) {
              echo '<option value="' . $year . '">' . $year . '</option>'; // Affiche les options
            }
            ?>
          </select>
        </div>

      </div>

    </div>

    <!-- Affichage des photos  -->
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

          // Initialisation des variables
          $categorySlug = '';
          $formatName = '';
          $photoYear = '';
          if ($categories && !is_wp_error($categories)) {
            foreach ($categories as $category) {
              $categorySlug = $category->slug;
              break; // Sortir de la boucle après la première catégorie
            }
          }
          if ($formats && !is_wp_error($formats)) {
            foreach ($formats as $format) {
              $formatSlug = $format->slug;
              break; // Sortir de la boucle après le premier format
            }
          }
          if (get_the_date()) {
            $photoYear = get_the_date('Y');
          }
      ?>

          <div class="item-gallery" data-category="<?php echo $categorySlug; ?>" data-format="<?php echo $formatSlug; ?>" data-year="<?php echo $photoYear; ?>">

            <?php the_post_thumbnail('full'); ?> <!-- Afficher l'image -->

            <a href=" <?php echo get_permalink(); ?>"> <!-- Lien vers la page de la photo -->
              <div class="item-overlay-gallery">
                <span class="icon-fullscreen"></span>
                <span class="icon-eye"></span>
                <span class="photo-reference"><?php echo $reference; ?></span> <!-- Afficher la référence de la photo -->
                <span class="photo-category">
                  <?php
                  if ($categories && !is_wp_error($categories)) { // Si il y a des catégories
                    foreach ($categories as $category) { // Pour chaque catégorie
                      echo $category->name; // Afficher le nom de la catégorie
                    }
                  }
                  ?>
                </span>
              </div>
            </a>
          </div>

      <?php }
      }
      ?>
    </div>
    <div class="load-btn-container">
      <button class="load-btn">Charger plus</button>
    </div>
  </section>



</main>

<?php
get_footer();
