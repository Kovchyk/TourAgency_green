$( document ).ready(function() {
	$('ul.accordion').accordion({
        autoheight: false,
        header: ".opener",
        active: ".selected",
        selectedClass: "active",
        alwaysOpen: false,
        event: "click"
    });

	$("#main-gallery").owlCarousel(
		{	
			loop: true,
            autoplay:true,
    		autoplayTimeout:2000,
    		autoplaySpeed: 1500,
            responsive:{
		        0:{
		            items:2
		        },
		        599:{
		            items:3
		        },
		        767:{
		            items:4
		        },
		        991:{
		            items:5
		        },
		        1199:{
		            items:6
		        }
		    }
		}
	);

	$(".owl-carousel").owlCarousel(
		{	
			loop: true,
            autoplay: true,
    		autoplayTimeout: 4000,
            items: 1,
            animateOut: 'fadeOut',
            nav: true,
            dots: false,
		}
	);

	// Scroll top on #btn-up click
    function scrollTop() {
		var scrollBtn = $("#btn-up");

		scrollBtn.on("click", function(e) {
			e.preventDefault();
			var curPos = $(document).scrollTop();
			var scrollTime = curPos / 1;
			$("body, html").animate({"scrollTop": 0}, scrollTime);
		});
	}

	// If scrolltop more than 115px show or hide #btn-up 
	function checkScroll() {
		if ( $(document).scrollTop() >= 115 ) {
			$("#btn-up").fadeIn(600);
		} else {
			$("#btn-up").fadeOut(600);
		}
	}

	$(document).scroll(function() {
		checkScroll();
	});
	
	scrollTop();
	checkScroll();

	var dropArray = [];
	var moreBtn = $("#more");

	// This function checks whether total menu item's sum is more than menu width
	// and hides items which is not placed in menu and pushes the items into array
	function setMenuItemsAmount() {
		var menuItems = $(".menu li");
		var sum = 0;
		var menuWidth = $(".menu").width();

		menuItems.each(function(i, item) {
			
			sum += $(item).outerWidth();

			if ( sum > (menuWidth + moreBtn.width()) ) {
				
				$(item).css({"display": "none"}).prev().css({"display": "none"});
				moreBtn.css({"display": "block"});

				dropArray.push($(item).prev().html());

			} else {
				$(item).css({"display": "block"});
				moreBtn.css({"display": "none"});
			}
		});
	}

	setMenuItemsAmount();

	function drawHiddenItems(array) {
		var result = "";

		for (var i = 0; i < array.length; i++) {
			result += "<li>" + array[i] + "</li>"
		}

		$(".drop").html("<ul>" + result + "</ul>");
	}

	// If dropArray is not empty draw its items
	if (dropArray.length) {
		drawHiddenItems(dropArray);
	}

	$(window).resize(function() {
		var result = "";
		$(".drop").html("");
		dropArray = [];
		setMenuItemsAmount();

		if (!dropArray.length) {
			$(".drop").css({"display": "none"});
		}

		drawHiddenItems(dropArray);

		if ( $(window).width() > 767 ) {
			$(".whole-drop-menu").css({"display": "none"});
		}

	});	

	$("#more > a").on("click", function(e) {
		e.preventDefault();
		$(".drop").fadeToggle(800);
	});

	function saveCurrentPosToLocalStorage() {
		var curPos = $(document).scrollTop();
		localStorage.setItem('curPos', curPos);
	}

	$(".menu").on("click", "a", function() {
		saveCurrentPosToLocalStorage();
	});

	$("#to-another-hotels").on("click", "a", function() {
		saveCurrentPosToLocalStorage();
	});

	$(".hotels").on("click", "a", function() {
		saveCurrentPosToLocalStorage();
	});

	function scrollToContent() {

		var curPos = localStorage.getItem("curPos");
		var contentPosition = $(".content").offset().top;
		var location = window.location.href;
		if ( $(".advertisement").length == 1 && location.indexOf("index.html") == -1) {
			console.log("ok");
			var advertisementPosition = $(".advertisement").offset().top;
			$(document).scrollTop(curPos);
			$("body, html").animate({"scrollTop": advertisementPosition}, 1000);
			return false;
		}

		if ( location.indexOf("index.html") == -1 && location !== "http://www.grand-voyage.net/") {
			$(document).scrollTop(curPos);
			$("body, html").animate({"scrollTop": contentPosition}, 1000);
		}
		
	}

	scrollToContent();

	$(".menu-btn-holder").click(function(e) {
		e.preventDefault();
		$(".whole-drop-menu").slideToggle(800);
	});

	var flag = true;
	var time = 700;

	// Make an advertisement to blink
	function animateInterval() {
		var adv = $(".advertisement h3");
		if (flag) {
			$(adv).animate({
				opacity: 0.1
			}, time);	
			flag = false;
		} else {
			$(adv).animate({opacity: 1}, time);	
			flag = true;
		}
	}

	setInterval(animateInterval, 1000);

	// Take all menu items which haven't id attribute and place them to .whole-drop-menu
	function addMenuItemsToWholeDropMenu() {

		var menuItems = $(".menu li");
		$(".whole-drop-menu").append("<ul>");

		menuItems.each(function(i, item) {

			if ( $(item).attr("id") === undefined ) {
				$(item).clone().appendTo( $(".whole-drop-menu ul") );
			}
		});
	}

	addMenuItemsToWholeDropMenu();
});