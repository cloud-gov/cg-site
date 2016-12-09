var $ = require( 'jquery' );
window.jQuery = $;
window.$ = $;
require('cloudgov-style');

var anchorJS = require('anchor-js');
require('jquery.scrollto');

function hideSidenav() {
  $('#container').addClass('sidebar-close');
  $('#sidebar > ul').hide();
}

function showSidenav() {
  $('#container').removeClass('sidebar-close');
  $('#sidebar > ul').show();
}

function initializeJS() {
  // Sidebar dropdown menu
  var parentMenu = $('.sidenav-level-two .open').parents('ul .nested-menu');
  parentMenu.slideDown(200);
  var parentMenuArrow = parentMenu.siblings("a").find('.menu-arrow');
  parentMenuArrow.addClass('fa-angle-down');
  parentMenuArrow.removeClass('fa-angle-right');
  jQuery('#sidebar .sub-menu > a').click(function () {
      // Toggle current submenu
      var sub = jQuery(this).next();
      if (sub.is(":visible")) {
          jQuery('.menu-arrow', this).addClass('fa-angle-right');
          jQuery('.menu-arrow', this).removeClass('fa-angle-down');
          sub.slideUp(200);
          jQuery(sub).removeClass("open")
      } else {
          jQuery('.menu-arrow', this).addClass('fa-angle-down');
    jQuery('.menu-arrow', this).removeClass('fa-angle-right');
          sub.slideDown(200);
          jQuery(sub).addClass("open")
      }

      // Center menu on screen
      var o = (jQuery(this).offset());
      diff = 200 - o.top;
      if(diff>0)
          jQuery("#sidebar").scrollTo("-="+Math.abs(diff),500);
      else
          jQuery("#sidebar").scrollTo("+="+Math.abs(diff),500);
  });


  jQuery('.toggle-nav').click(function () {
      if (jQuery('#sidebar > ul').is(":visible") === true) {
          hideSidenav();
      } else {
          showSidenav();
      }
  });

  //bar chart
  if (jQuery(".custom-custom-bar-chart")) {
      jQuery(".bar").each(function () {
          var i = jQuery(this).find(".value").html();
          jQuery(this).find(".value").html("");
          jQuery(this).find(".value").animate({
              height: i
          }, 2000)
      })
  }

  jQuery('.nav_toggle').on('click', function() {
    $("#sidebar").toggleClass('active');
    $('#main-content').toggleClass('active');
  });

  // AnchorJS
  var anchors = new anchorJS();
  anchors.options.visible = 'touch';
  anchors.add('.content h2,.content h3,.content h4,.content h5');
}

(function(){
		var caches = {};
		$.fn.showGithub = function(user, repo, type, count){
			$(this).each(function(){
				var $e = $(this);
				var user = $e.data('user') || user,
				repo = $e.data('repo') || repo,
				type = $e.data('type') || type || 'watch',
				count = $e.data('count') == 'true' || count || true;
				var $mainButton = $e.html('<span class="github-btn"><a class="btn btn-xs btn-default" href="#" target="_blank"><i class="icon-github"></i> <span class="gh-text"></span></a><a class="gh-count"href="#" target="_blank"></a></span>').find('.github-btn'),
				$button = $mainButton.find('.btn'),
				$text = $mainButton.find('.gh-text'),
				$counter = $mainButton.find('.gh-count');

				function addCommas(a) {
					return String(a).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
				}

				function callback(a) {
					if (type == 'watch') {
						$counter.html(addCommas(a.watchers));
					} else {
						if (type == 'fork') {
							$counter.html(addCommas(a.forks));
						} else {
							if (type == 'follow') {
								$counter.html(addCommas(a.followers));
							}
						}
					}

					if (count) {
						$counter.css('display', 'inline-block');
					}
				}

				function jsonp(url) {
					var ctx = caches[url] || {};
					caches[url] = ctx;
					if(ctx.onload || ctx.data){
						if(ctx.data){
							callback(ctx.data);
						} else {
							setTimeout(jsonp, 500, url);
						}
					}else{
						ctx.onload = true;
						$.getJSON(url, function(a){
							ctx.onload = false;
							ctx.data = a;
							callback(a);
						});
					}
				}

				var urlBase = 'https://github.com/' + user + '/' + repo;

				$button.attr('href', urlBase + '/');

				if (type == 'watch') {
					$mainButton.addClass('github-watchers');
					$text.html('Star');
					$counter.attr('href', urlBase + '/stargazers');
				} else {
					if (type == 'fork') {
						$mainButton.addClass('github-forks');
						$text.html('Fork');
						$counter.attr('href', urlBase + '/network');
					} else {
						if (type == 'follow') {
							$mainButton.addClass('github-me');
							$text.html('Follow @' + user);
							$button.attr('href', 'https://github.com/' + user);
							$counter.attr('href', 'https://github.com/' + user + '/followers');
						}
					}
				}

				if (type == 'follow') {
					jsonp('https://api.github.com/users/' + user);
				} else {
					jsonp('https://api.github.com/repos/' + user + '/' + repo);
				}

			});
		};

	})();


(function($){
	(function(){
		var caches = {};
		$.fn.showGithub = function(user, repo, type, count){

			$(this).each(function(){
				var $e = $(this);

				var user = $e.data('user') || user,
				repo = $e.data('repo') || repo,
				type = $e.data('type') || type || 'watch',
				count = $e.data('count') == 'true' || count || true;

				var $mainButton = $e.html('<span class="github-btn"><a class="btn btn-xs btn-default" href="#" target="_blank"><i class="icon-github"></i> <span class="gh-text"></span></a><a class="gh-count"href="#" target="_blank"></a></span>').find('.github-btn'),
				$button = $mainButton.find('.btn'),
				$text = $mainButton.find('.gh-text'),
				$counter = $mainButton.find('.gh-count');

				function addCommas(a) {
					return String(a).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
				}

				function callback(a) {
					if (type == 'watch') {
						$counter.html(addCommas(a.watchers));
					} else {
						if (type == 'fork') {
							$counter.html(addCommas(a.forks));
						} else {
							if (type == 'follow') {
								$counter.html(addCommas(a.followers));
							}
						}
					}

					if (count) {
						$counter.css('display', 'inline-block');
					}
				}

				function jsonp(url) {
					var ctx = caches[url] || {};
					caches[url] = ctx;
					if(ctx.onload || ctx.data){
						if(ctx.data){
							callback(ctx.data);
						} else {
							setTimeout(jsonp, 500, url);
						}
					}else{
						ctx.onload = true;
						$.getJSON(url, function(a){
							ctx.onload = false;
							ctx.data = a;
							callback(a);
						});
					}
				}

				var urlBase = 'https://github.com/' + user + '/' + repo;

				$button.attr('href', urlBase + '/');

				if (type == 'watch') {
					$mainButton.addClass('github-watchers');
					$text.html('Star');
					$counter.attr('href', urlBase + '/stargazers');
				} else {
					if (type == 'fork') {
						$mainButton.addClass('github-forks');
						$text.html('Fork');
						$counter.attr('href', urlBase + '/network');
					} else {
						if (type == 'follow') {
							$mainButton.addClass('github-me');
							$text.html('@' + user);
							$button.attr('href', 'https://github.com/' + user);
							$counter.attr('href', 'https://github.com/' + user + '/followers');
						}
					}
				}

				if (type == 'follow') {
					jsonp('https://api.github.com/users/' + user);
				} else {
					jsonp('https://api.github.com/repos/' + user + '/' + repo);
				}

			});
		};

	})();
})(jQuery);

jQuery(document).ready(function(){
    initializeJS();
    $('[rel=show-github]').showGithub();
});
