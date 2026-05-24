;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#ducquynh-offcanvas, .js-ducquynh-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-ducquynh-nav-toggle').removeClass('active');
	    	}
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="ducquynh-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-ducquynh-nav-toggle ducquynh-nav-toggle ducquynh-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#ducquynh-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#ducquynh-offcanvas').append(clone2);

		$('#ducquynh-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#ducquynh-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-ducquynh-nav-toggle').removeClass('active');
				
	    	}
		});
	};

	var burgerMenu = function() {

		$('body').on('click', '.js-ducquynh-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};

	var offcanvasMenuClose = function() {

		$('#ducquynh-offcanvas').on('click', 'a', function(){

			if ( $('body').hasClass('offcanvas') ) {

				$('body').removeClass('overflow offcanvas');
				$('.js-ducquynh-nav-toggle').removeClass('active');

			}

		});

	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".ducquynh-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#ducquynh-counter').length > 0 ) {
			$('#ducquynh-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	// Music
	function playMusic() {
    document.getElementById("bg-music").play();
  	}

	window.addEventListener("click", function () {
    document.getElementById("bg-music").play();
  	}, { once: true });

	document.addEventListener("DOMContentLoaded", function(){

    const btn = document.getElementById("heartBtn");
    const message = document.getElementById("loveMessage");

    btn.addEventListener("click", function(){

        // Hiện message
        message.classList.add("show");

        setTimeout(() => {
            message.classList.remove("show");
        }, 4500);

        // Tạo trái tim
        for(let i = 0; i < 120; i++){

            const heart3 = document.createElement("div");

            heart3.className = "heart3";

            heart3.innerHTML = "💕";

            // vị trí button
            const rect = btn.getBoundingClientRect();

            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            heart3.style.left = startX + "px";
            heart3.style.top = startY + "px";

            // random hướng
            const angle = Math.random() * Math.PI * 2;

            // khoảng cách
            const distance = Math.random() * 600 + 100;

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            heart3.style.setProperty("--x", `${x}px`);
            heart3.style.setProperty("--y", `${y}px`);

            // size random
            const size = Math.random() * 50 + 15;

            heart3.style.fontSize = size + "px";

            // thời gian random
            const duration = Math.random() * 2 + 2;

            heart3.style.animationDuration = duration + "s";

            document.body.appendChild(heart3);

            setTimeout(() => {
                heart3.remove();
            }, duration * 1000);
        }

    });
});


	$(function(){
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		offcanvasMenuClose();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
		playMusic();
	});

}());