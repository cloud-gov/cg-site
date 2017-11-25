$( document ).ready(function() {

  var accordionHeight = $( ".accordion-container section:first-of-type" ).height();
  var defaultHeight = 210;

  $( ".accordion-container article" ).hide();
  $( ".accordion-container section:first-of-type article" ).show();
  $( ".accordion-container section:first-of-type" ).css( "background-color", "#e7e9eb" );
  if ( $(window).width() > 959 ) {
    $( ".accordion-container section:not(:first-of-type) .option" ).css( "height", accordionHeight );
  }

  $( ".accordion-container .option-input" ).click(function() {
    $( ".accordion-container article" ).hide();
    $( ".accordion-container section" ).css( "background-color", "#d3d9df" );
    if ( $(window).width() > 959 ) {
      $( ".accordion-container section .option" ).css( "height", accordionHeight );
    }
    $( this ).parent().siblings( ".accordion-container article" ).delay( 400 ).fadeIn( 400 );
    $( this ).parent().parent( ".accordion-container section" ).css( "background-color", "#e7e9eb" ).fadeIn();
    if ( $(window).width() > 959 ) {
      $( this ).siblings( ".option").css( "height", defaultHeight );
    }

  });

  $( window ).resize(function() {
    if ( $(window).width() < 960 ) {
      $( ".accordion-container section .option" ).css( "height", "auto" );
    } else {
      $( ".accordion-container section .option" ).css( "height", accordionHeight );
      $( ".accordion-container section .option-input:checked + .option" ).css( "height", defaultHeight );
    }
  });



});
