(function (document, window, $) {
  var $govBarContent = $('#gov-banner');
  var $govBarWrapper = $('[aria-controls="gov-banner"]');

  $(document).ready(function(){
    if ( $( ".tabs" ) ) {
      $( ".tabs" ).tabs();
    }
    /* Setting search focus */
    $('#js-search-focus').click(function(){
        $('#search-field').focus();
    });
    $('#search-field').keyup(function(e) {
      if (e.keyCode == 27) {
        $('#js-search-focus').focus();
      }
    });
    $govBarWrapper.on('click', function(){
      toggleGovBar();
    })
    ajaxifyContactForm();
  });

  function toggleGovBar() {
    if ($govBarContent.hasClass('hide')) {
      expandGovBar();
    } else {
      shrinkGovBar();
    }
  }

  function expandGovBar() {
    $govBarContent.removeClass('hide');
    $govBarContent.attr('aria-hidden', 'false');
    $govBarWrapper.addClass('expanded');
    $govBarWrapper.attr('aria-expanded', 'true');
  }

  function shrinkGovBar() {
    $govBarContent.addClass('hide');
    $govBarContent.attr('aria-hidden', 'true');
    $govBarWrapper.removeClass('expanded');
    $govBarWrapper.attr('aria-expanded', 'false');
  }

  function ajaxifyContactForm () {
    var contactForm = $('#contact'),
        originalUrl = contactForm.attr('action');
        contactBtn  = $('.contact [type=submit]'),
        alert       = $('#contact-alert');

    contactBtn.on('click', function (e) {
      e.preventDefault();
      var url = [originalUrl, contactForm.serialize()].join('?'),
          img = $('<img></img');

      img.on('error', function (e) {
        console.log('known error', e);
      });

      contactBtn.val('Thank you');
      contactBtn.attr('disabled', true);
      img.attr('src', url);

    });
  }
})(document, window, $);
