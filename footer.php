<footer class="site-footer">

  <!-- Récupération du menu Footer -->
  <?php
  wp_nav_menu(
    array(
      'theme_location' => 'menu-2',
      'menu_id'        => 'footer-menu',
    )
  ); // récupère le menu menu-2
  ?>


</footer>

<!-- Récupération de la modal de contact et de la Lightbox -->
<?php
get_template_part('./template-parts/contact');
get_template_part('./template-parts/lightbox');
?>

<?php wp_footer(); ?>

</div>
</body>

</html>