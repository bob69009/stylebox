/******************************************************************************************/
/* Services Animation																   	  */	
/* @namespace Animation				 											  	  	  */
/******************************************************************************************/
/* @fct isAnimation																		  */
/* @fct onAnimation																		  */
/* @fct offAnimation																	  */
/* @fct animationOpenStripe															  	  */
/* @fct animationOpenAccueil															  */
/* @fct animationOpenDashboard															  */
/* @fct animationOpenFinDashboard 														  */
/* @fct animationOpenPersoDashboard														  */
/* @fct animationOpenPage 																  */
/******************************************************************************************/

(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = factory;
	} else {
		// Global Variables
		root.animation = factory($);
	}
})(this, function($) {
	
	var exports = {};

	/* @fct isAnimation */
	/***********************************************************************/
	exports.isAnimation = function(){
		return ($(document.body).attr("data-tb-animate") === "actif");
	};

	/* @fct onAnimation */
	/* On réactive l'animation sauf sous VO et Android < 4.2.2 */
	/***********************************************************************/
	exports.onAnimation = function(){
		var $body = $(document.body);

		if($body.hasClass('device-ios') && !$body.hasClass('access-voiceover')){
			$body.attr("data-tb-animate","actif");
		}

		if($body.hasClass('device-android') && !$body.hasClass('device-android422m')){
			$body.attr("data-tb-animate","actif");
		}	

		if($body.hasClass('device-desktop')){
			$body.attr("data-tb-animate","actif");
		}
	};

	/* @fct offAnimation */
	/***********************************************************************/
	exports.offAnimation = function(){
		var $body = $(document.body);
		$body.attr("data-tb-animate","inactif");
	};

	/* @fct animationOpenAccueil */
	/* @param callback : callback animation de la liste des profils */
	/***********************************************************************/
	exports.animationOpenAccueil = function(callback) {

		var animate = animation.isAnimation();
		var $content = $("#lbptel-profil-content");
		var $header = $("#lbptel-home-navigation-header");

		if($content.hasClass("effet-hide")){
			if(animate){				
				/* @note on affiche le contenu de la page header + profil */
				$header.removeClass("effet-hide").addClass("slideInUp");
				$content.removeClass("effet-hide").addClass("effet-show zone-inactif overflow-y-hidden");				
			}else{
				$header.removeClass("effet-hide");
			}		

			/*@note on lance l'animation sur la liste des profils */
			if(typeof callback !== 'undefined'){
		   		callback();
		   	}
		}
	};

	/* @fct animationOpenStripe */
	/* @param elt : id de la liste */
	/* @param timeTransition : temps de la transition */
	/* @param timeLoop : temps de bouclage sur les item de la liste */
	/* @param callback : fonction en callback de la methode */
	/***********************************************************************/
	exports.animationOpenStripe = function(elt,timeTransition,timeLoop,callback) {

		var nb = 0;
		var $elt = $("#"+elt);
		var $eltParent = $elt.parent();
		var heightListe = $elt.height();
		var $idChild = $elt.find("li");
		var lengthList = $idChild.length;		
		var translateInit = 0;
		var translateAnim = 0;
		var seuilAnimeItemIndex = 0;

		var $content = $elt.parents("[id$='content']");
		var heightContent = $content.height();

		var animate = animation.isAnimation();

		if(animate){
			/* @note on initialise les stripes */
			$idChild.removeClass("effet-hide");

			/* @note init animation liste : cas ou liste < hauteur ecran */
			if(heightContent > heightListe){
				$elt.css("height","100%");
				$eltParent.css("height","100%");
				translateInit = heightContent;
				seuilAnimeItemIndex = lengthList;
			}else{
				translateInit = heightListe;
				seuilAnimeItemIndex = Math.round(heightContent / $idChild.innerHeight()) + 2;
			}

			$idChild.css({
        		"-webkit-transform":"translateY("+ translateInit +"px) translateZ(0)",
        		"transform":"translateY("+ translateInit +"px) translateZ(0)"
        	});

			/* @note boucle sur la liste en ajoutant l'effet css toute les n-child * x ms */			
			for(var i = 0; i < lengthList; i++) {
		    	nb++;
        	
		        (function(i) {		        		
			
		        	/* @synchro : stripe par stripe*/ 
		        	setTimeout(function() {	
						/* @note ajout de l'effet css ttes les n child * timeLoop */
		        		translateAnim = 0;

		        		if(i <= seuilAnimeItemIndex){
		        			$($idChild[i]).css({
								"opacity":"1",
								"-webkit-transform":"translateY("+ translateAnim +"px) translateZ(0)",
								"transform":"translateY("+ translateAnim +"px) translateZ(0)",
								"-webkit-transition": "-webkit-transform "+ timeTransition +"s cubic-bezier(0.39, 0.58, 0.57, 1) .1s",
										"transition": "transform "+ timeTransition +"s cubic-bezier(0.39, 0.58, 0.57, 1) .1s"
							});
		        		}else{
		        			
		        			/* @note au dela du seuilAnimeItemIndex : les stripes en dehors de l'ecran n'ont pas de transition sur l'animation */
		        			timeTransition = 0;
		        			timeLoop = 0;
		        			
		        			$idChild.css({
		        				"opacity":"1",
								"-webkit-transform":"translateY("+ translateAnim +"px) translateZ(0)",
								"transform":"translateY("+ translateAnim +"px) translateZ(0)"	
		        			});
		        		}
		            },nb*timeLoop);
		            
		        }(i));
		    }

		    /* @note etat finale de l'animation */
		    var $itemFinal;
		    if(seuilAnimeItemIndex >= lengthList){
				if($elt.find("li:last-child").attr("data-gamme") === "push"){
					$itemFinal = $elt.find("li:nth-last-child(2)");
				} else {
					$itemFinal = $elt.find("li:last-child");
				}
		    }else{
		    	$itemFinal = $elt.find("li:nth-child("+seuilAnimeItemIndex+")");
		    }

		   	$itemFinal.on('transitionend webkitTransitionEnd MSTransitionEnd', function() {
		   		/* @note on reinitialise la transformation directement en js car l'animation est g�r� dynamiquement avec ce dernier */
	        	$idChild.css({
	            	"-webkit-transform":"",
	            			"transform":"",
	            	"-webkit-transition":"",
			            	"transition":""
	            });

	        	/* @note on supprime l'écouteur sur les stripes */
	        	$(this).off('transitionend webkitTransitionEnd MSTransitionEnd');

	        	/* @note reinit animation liste : cas ou liste < hauteur ecran */
	        	if(heightContent > heightListe){
	        		$elt.css("height","initial");
	        		$eltParent.css("height","initial");
	        	}

	        	if(typeof callback !== 'undefined'){
	    	   		callback();
	    	   	}
	        });
		}else{
			/* @note init no animate contenu */
			$eltParent.removeClass("effet-hide");

			if(typeof callback !== 'undefined'){
    	   		callback();
    	   	}
		}	   
	};

	/* @fct animationOpenDashboard */
	/* @param id : id du header dashboard */
	/* @param callback : callback animation de la liste */
	/***********************************************************************/
	exports.animationOpenDashboard = function(elt,callback) {
		
		var $elt = $("#"+elt);
		var animate = animation.isAnimation();
		var $contentDashboard = $("#lbptel-list-dashboard-content");

		if(animate){
			/* @note on rend inactif le scroll pendant l'animation des stripes */
			$("#scroll-list-dashboard").addClass("zone-inactif overflow-y-hidden");
		
			$elt.removeClass("effet-hide").addClass("slideInUp");

			$elt.on('animationend webkitAnimationEnd MSAnimationEnd', function() {
				$(this).off('animationend webkitAnimationEnd MSAnimationEnd');

				$contentDashboard.removeClass("effet-hide");
				/*@note on lance l'animation sur la liste des profils */
				if(typeof callback !== 'undefined'){
				   	callback();
				}
			});
		}else{
			/* @note on calcul la hauteur de la stripe la plus haute sur les gammes produits */
			utilitaire.mesureHeightStripe("lbptel-list-dashboard");

			$elt.removeClass("effet-hide");
			$contentDashboard.removeClass("effet-hide");

			if(typeof callback !== 'undefined'){
			   	callback();
			}
		}
	};

	/* @fct animationOpenPersoDashboard */
	/* @param id : id du header dashboard */
	/* @param callback : callback animation de la liste */
	/***********************************************************************/
	exports.animationOpenPersoDashboard = function(elt,callback) {

		var $elt = $("#"+elt);
		var animate = animation.isAnimation();
		var $contentDashboard = $("#lbptel-list-dashboard-content");

		if(animate){
			/* @note on rend inactif le scroll pendant l'animation des stripes */
			$("#scroll-list-dashboard").addClass("zone-inactif overflow-y-hidden");
			
			$elt.removeClass("effet-hide").addClass("slideInUp");

			$elt.on('animationend webkitAnimationEnd MSAnimationEnd', function() {
				$(this).off('animationend webkitAnimationEnd MSAnimationEnd');

				$contentDashboard.removeClass("effet-hide");
				/*@note on lance l'animation sur la liste des profils */
				if(typeof callback !== 'undefined'){
				   	callback();
				}
			});
		}else{
			/* @note on calcul la hauteur de la stripe la plus haute sur les gammes produits */
			utilitaire.mesureHeightStripe("lbptel-list-dashboard");

			$elt.removeClass("effet-hide");
			$contentDashboard.removeClass("effet-hide");

			if(typeof callback !== 'undefined'){
			   	callback();
			}
		}
	};

	/* @fct animationOpenFinDashboard */
	/* @param id : id du bandeau connexion dashboard */
	/* @param timeTransition : temps de la transition */
	/* @param callback : callback animation de la liste */
	/***********************************************************************/
	exports.animationOpenFinDashboard = function(elt,timeTransition,callback) {

		var animate = animation.isAnimation();
		var $elt = $("#"+elt);
		var heightElt = $elt.find("span").innerHeight();	

		if(animate){
			$elt.css({
	    		"-webkit-transition": "height "+ timeTransition +"s cubic-bezier(0.39, 0.58, 0.57, 1)",
						"transition": "height "+ timeTransition +"s cubic-bezier(0.39, 0.58, 0.57, 1)",
				"height": heightElt,
				"opacity":"1"
			});							

	    	$elt.on('transitionend webkitTransitionEnd MSTransitionEnd', function() {        	
	    		$(this).off('transitionend webkitTransitionEnd MSTransitionEnd');

	    		$elt.css({
					"-webkit-transition":"",
					"transition":""
				});

				if(typeof callback !== 'undefined'){
			   		callback();
			   	}
			});
		}else{
			$elt.css({
	    		"height": heightElt,
				"opacity":"1"
			});	

			if(typeof callback !== 'undefined'){
		   		callback();
		   	}
		}
	}

    return exports;
});