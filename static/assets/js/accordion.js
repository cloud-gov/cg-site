$( document ).ready(function() {

  $( ".accordion-container article" ).hide();
  $( ".accordion-container section:first-of-type article" ).show();
  $( ".accordion-container section:first-of-type" ).css( "background-color", "#e7e9eb" );

  $( ".accordion-container .option-input" ).click(function() {
    $( ".accordion-container article" ).hide();
    $( ".accordion-container section" ).css( "background-color", "#d3d9df" );
    $( this ).parent().siblings( ".accordion-container article" ).delay( 400 ).fadeIn( 1200 );
    $( this ).parent().parent( ".accordion-container section" ).css( "background-color", "#e7e9eb" ).fadeIn();
  });

});
