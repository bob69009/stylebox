/** INTERFACE **/
$(document).ready(function(){

	/** INIT VIEW **/

	// Initialisation des onglets
	$(".tabnav-tab.selected").each(function(){
		var target = "."+$(this).attr("href").slice(1);
		$(this).parents(".tabnav").next(target).addClass("active");
	});

	// Initialisation des dépliants
	$(".doc-toggle.opened").next("div").slideDown();

	// Scroll doux vers les ancres
	$('a[href^="#"]').not(".tab a, [class*=trigger],[class*=select],[class*=onglet],[class*=tabnav],[data-action], .dropdown-multi, .dropdown-menu a").click(function(){
		var target = $(this).attr("href");
	    $('html, body').animate({
	        scrollTop: $(target).offset().top - 30
	    }, 500);
	});

	// Initialisation des blocs couleurs de la charte
	$(".color-bloc").each(function(){
		$(this).css("background-color",$(this).data("color"));
	});
	$(".color-bloc").dblclick(function(){
		if( $(this).find(".color-info").length == 0 ) {
			$(this).append("<div class='color-info'>"+$(this).data("color")+"</div>");
		} else {
			$(this).find(".color-info").remove();
		}
	});

	
	

	/** EVENTS **/

	// Navigation
	$(".menu-item").click(function(){
		$(".menu-item").removeClass("selected");
		$(this).addClass("selected");
	});

	// Onglets
	$(".tabnav-tab").click(function(){
		if(!$(this).is(".selected")) {
			$(this).siblings(".tabnav-tab").removeClass("selected");
			$(this).addClass("selected");

			var target = "."+$(this).attr("href").slice(1);
			var $oldContent = $(this).parents(".tabnav").nextAll(".tabcontent.active").first();
			$oldContent.hide("slow",function(){
				$oldContent.removeClass("active");
			});

			var $content = $(this).parents(".tabnav").nextAll(target).first();
			$content.show("slow",function(){
				$content.addClass("active");
			});
		}
	});

	// Dépliants
	$(".doc-toggle").click(function(){
		$(this).toggleClass("opened");
		$(this).next("div").slideToggle(function(){
			// On recharge la vue une fois le contexte ouvert
			NEC.loadView($(this));
		});
	});

});