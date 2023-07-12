<footer class="site-footer">
  <?php
  wp_nav_menu(
    array(
      'theme_location' => 'menu-2',
      'menu_id'        => 'footer-menu',
    )
  );
  ?>
</footer>
<?php
get_template_part('./template-parts/contact');
?>
<?php wp_footer(); ?>

</div>
</body>

</html>