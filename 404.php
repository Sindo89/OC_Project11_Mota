<?php
get_header(); // récupération du template header.php
?>

<main>

  <section class="error-404">
    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/emoji-404.png" alt="emoji perte de conscience">
    <h1 class="page-title">ERREUR 404</h1>

    <div class="page-content">
      <a href="/">Retour à la page d'accueil</a>
    </div>
  </section>

</main>

<?php
get_footer(); // récupération du template footer.php
