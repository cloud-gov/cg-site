$( document ).ready(function() {

  $( ".form-container" ).hide();
  // $( ".form-container" ).css( "display", "none" );

  $( ".handle-button" ).click(function() {
    // $( ".form-container" ).css( "display", "block" );
    $( ".form-container" ).toggle();
  });

});
