/******************************************************************************************/
/* == REGLE 																			  */
/******************************************************************************************/
/* == @todo	: commentaire/code temporaire a supprimer apres livraison					  */
/* == @note	: commentaire                                                                 */
/* == @acces : accessibilite		 													  */
/* == @fct : nom de la fonction 	 													  */
/* == @param : nom du parametre		 													  */
/******************************************************************************************/

/******************************************************************************************/
/* == LightBox	 					 													  */
/******************************************************************************************/
/* @fct lightbox																	  	  */
/* @fct openLightbox																	  */
/* @fct setPageForAccessibility															  */
/* @fct closeLightbox																	  */
/* @fct restorePageForAccessibility														  */
/******************************************************************************************/

(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = factory;
	} else {
		// Global Variables
		root.lightbox = factory($);
	}
})(this, function($) {

	var exports = {};

	/**
	 * fonction renvoi un objet permettant l'ouverture et la fermeture d'une lightbox 
	 * @function lightbox
	 * @param {string} masque élément du DOM qui sera masqué lors de l'apparition de la lightbox
	 * @param {string} idLightBox id de l'élément contenant le texte de la lightbox
	 * @param {string} mode  mode de déplacement de la lightbox correspond à une classe CSS
	 * @return objet avec 2 méthodes open et close qui respectivement ouvre et ferme la lightbox
	 */
	exports.lightbox = function (pMasque,idLightbox,mode,eltToFocusWhenBack,timeTransition,timeToFocus,callback) {

		var that = this;
		var $pageContent = $("[data-ad-view]");

		that.masque = pMasque ;
		var open = function () {
			if (that.masque === "") {
				that.masque = $pageContent.find("> :first").attr("id");
			}
			
			exports.openLightbox(that.masque,idLightbox,mode,timeTransition,timeToFocus,callback);
		};
	
		var close = function () {
			if (that.masque === "") {
				that.masque = $pageContent.find("> :first").attr("id");
			}
			
			exports.closeLightbox(that.masque,idLightbox,mode,eltToFocusWhenBack,timeTransition,callback);
		};
	
		return { 'open' : open, 'close': close};
	};

	/* @fct openLightbox : ouverture de la lightbox */
	/* @param masque : elt sur lequel on affecte le masque */
	/* @param idPopin : elt sur lequel on affiche le contenu de lightbox */
	/* @param mode : mode => default - popin classic */
	/*						 menuOption - menuOption qui arrive par le bas */
	/*						 modal - modal fullscreen variante direction debut-fin */
	/* @param callback : on affiche les données apres l'animation */
	/***********************************************************************/
	exports.openLightbox = function (masque,idPopin,mode,timeTransition,timeToFocus,callback){
		var $lightbox = $("#"+idPopin);
		var $section = $lightbox.find("section");
		var $elt = null;
		var $masque;
		var animate = animation.isAnimation();
		
		if("body" === masque){
			$masque = $(document.body);
		}else if(masque === ""){
			$masque = $("[data-ad-view]").find("> :first").attr("id");			
		}else{
			$masque = $("#"+masque);
		}
		//@note Correction pour Android sur un bug qui permet de scroller la page même en présence de la lightbox
		/*if($device.isAndroid() && ($masque != "#undefined")){
			var masqueEl = $masque[0];
			if(masqueEl !== undefined){
			masqueEl.oldTouchStart = masqueEl.ontouchstart;
			masqueEl.ontouchstart = function(e) {e.preventDefault();};
			}
		}*/

		if(typeof timeTransition === 'undefined' || timeTransition === null || timeTransition === 0){
			timeTransition = 0;
		}
		
		if(typeof timeToFocus === 'undefined' || timeToFocus === null || timeToFocus === 0){
			timeToFocus = 300;
		}
		
		$masque.addClass("lightbox");
		$lightbox.attr("data-mode",mode);
		
		/* @note on desactive les scroll */
		/*var scroll = $("[data-scroll]").attr("id");
			if(ScrollManager.isScrollExist(scroll)){
				ScrollManager.disable(scroll);
		}	*/
		
		$lightbox.on('touchmove', function (e) { e.preventDefault(); });
		
		$elt = $lightbox;
		if(animate){
			$elt.on('animationend webkitAnimationEnd MSAnimationEnd', function() {
				$(this).off('animationend webkitAnimationEnd MSAnimationEnd');
			
				// @acces on bascule la popin en mode accessible
            	$lightbox.attr("aria-hidden","false");
            
            	// @acces on place le focus sur le titre pour que VO lise le <h1> accessible
           		navigation.navigationSetFocus("#" + idPopin + " header[data-access] h1",timeToFocus);
				
				/* @note déclenchement du step (page) suivant */	
				if(typeof callback !== 'undefined'){
					callback();
			}
			});	
		}		
		
		switch(mode){
			case "menuOption" :
				$lightbox.removeAttr("hidden");				
				
				if(animate){
					/* @note delai exec animation afin de voir l'animation */
					$lightbox.css({
						"-webkit-transition-delay": timeTransition+"s",
						"transition-delay": timeTransition+"s"
					}).addClass("effet-open-translateY");
				}
				
				break;
			case "modalY-topToCenter":
				$masque.attr('data-modal', 'open');
				$lightbox.removeAttr("hidden");

				if(animate){
					/* @note delai exec animation afin de voir l'animation */
					$lightbox.css({
						"-webkit-transition-delay": timeTransition+"s",
						"transition-delay": timeTransition+"s"
					}).addClass("effet-open-modal-topToCenter");
				}				
				break;
			default :
				break; 
		}			

				
		if(!animate) {
		
			// @acces on bascule la popin en mode accessible
        	$lightbox.attr("aria-hidden","false");
        
        	// @acces on place le focus sur le titre pour que VO lise le <h1> accessible
        	navigation.navigationSetFocus("#" + idPopin + " header[data-access] h1",timeToFocus);

			/* @note déclenchement du step (page) suivant */	
			if(typeof callback !== 'undefined'){
				callback();
			}
		}

		/* @note desactive le retour d'interface */
		navigation.removeEltClassActiveOnTouch();

		/* @note applique le masque sur l'appelant */
		lightbox.setPageForAccessibility(masque, idPopin);

		/* @acces on rend la lightbox visible au lecteur d'écran*/
		$lightbox.attr( "aria-hidden", "false" );
	};

	/**
	 * applique le masque sur l'appelant
	 * @param masque selecteur de l'element d'arriere-plan a passer en aria-hidden=true
	 * @param idPopin id de la popin affichée
	 */
	exports.setPageForAccessibility = function (masque, idPopin) {
		
		/* @access : accessibilite seulement sous IOS pour VO */
		//if($device.isIOS()){
			var $masque;
			
			if("body" === masque){
				$masque = $("body");
			}else{
				$masque = $("#"+masque);
			}
	
			/* @acces on met le focus sur la lightbox car l'utilisateur malvoyant ne sait pas qu'il y a une popin d'affichée */
			switch(masque){
				case "page-home":
					$("#page-home").attr( "aria-hidden", "true" );
					break;
				default :				
					$masque.attr( "aria-hidden", "true" );
					break; 
			}			
		//}
	};

	/* @fct closeLightbox : fermeture de la lightbox */
	/* @param masque : elt sur lequel on affecte le masque */
	/* @param idPopin : elt sur lequel on affiche le contenu de lightbox */
	/* @param mode : mode => default - popin classic */
	/*						 menuOption - menuOption qui arrive par le bas */
	/*						 modal - modal fullscreen */
	/* @param eltToFocusWhenBack : selt sur lequel placer le focus une fois la lightbox refermée */
	/* @param callback : on affiche les données apres l'animation */
	/***********************************************************************/
	exports.closeLightbox = function (masque,idPopin,mode,eltToFocusWhenBack,timeTransition,callback){		
		var $lightbox = $("#"+idPopin);
		var $section = $lightbox.find("section");
		var $masque;
		var animate = animation.isAnimation();
		
		if("body" === masque){
			$masque = $(document.body);
		}else if(masque === ""){
			$masque = $("[data-ad-view]").find("> :first").attr("id");			
		}else{
			$masque = $("#"+masque);
		}	

		//@note Correction pour Android sur un bug qui permet de scroller la page même en présence de la lightbox
		/*if($device.isAndroid()&& ($masque != "#undefined")){
			var masqueEl = $masque[0];
			if(masqueEl !== undefined){
			if(masqueEl.oldTouchStart !== undefined){
				masqueEl.ontouchstart = masqueEl.oldTouchStart;
				}
			}
		}*/

		var timeTransition = 0;

		/* @note delai exec animation afin de voir l'animation */
		$lightbox.css({
			"-webkit-animation-delay": timeTransition+"s",
					"animation-delay": timeTransition+"s"
		});

		if(typeof mode === 'undefined' || mode === '' || mode === null ){
			mode = $lightbox.attr('data-mode');
		}
		
		/* @note cas specifique : gestion du focus sur le retour */
		if(idPopin === "lbptel-indisponibilite-demo"){
			eltToFocusWhenBack = $lightbox.attr("data-retour");
		}		
		
		/* @note on reactive les scroll*/
		/*var scroll = $("[data-scroll]").attr("id");
		if(ScrollManager.isScrollExist(scroll)){
			ScrollManager.enable(scroll);
		}*/
		
		/* @note on reactive le touchmove */
		$lightbox.off('touchmove');
		
		var lightbox = this;
		switch(mode){
			case "menuOption" :
				if(animate){
					$lightbox.removeClass("effet-open-translateY").addClass("effet-close-translateY");
					$lightbox.on('animationend webkitAnimationEnd MSAnimationEnd', function() {
						$(this).off('animationend webkitAnimationEnd MSAnimationEnd');
						$masque.removeClass("lightbox overflow-hidden");						
						$(this).removeClass("effet-close-translateY").attr("hidden", "true");
						if(typeof callback !== 'undefined'){
							callback();
						}

						lightbox.restorePageForAccessibility(idPopin,masque,eltToFocusWhenBack);

						/* @note desactive le retour d'interface */
						navigation.removeEltClassActiveOnTouch();
					});	
				}else{
					$masque.removeClass("lightbox overflow-hidden");	
					$lightbox.attr("hidden", "true");	
					if(typeof callback !== 'undefined'){
						callback();
					}

					lightbox.restorePageForAccessibility(idPopin,masque,eltToFocusWhenBack);

					/* @note desactive le retour d'interface */
					navigation.removeEltClassActiveOnTouch();
				}
				break;
			case "modalY-topToCenter":
				if(animate){
					$lightbox.removeClass("effet-open-modal-topToCenter").addClass("effet-close-translateY-centerToBottom");

					setTimeout(function(){
						$masque.removeClass("lightbox overflow-hidden").removeAttr("data-modal");
					},0);

					$lightbox.on('animationend webkitAnimationEnd MSAnimationEnd', function() {
						$(this).off('animationend webkitAnimationEnd MSAnimationEnd');
						$(this).removeClass("effet-close-translateY-centerToBottom").attr("hidden", "true");
						if(typeof callback !== 'undefined'){
							callback();
						}

						lightbox.restorePageForAccessibility(idPopin,masque,eltToFocusWhenBack);

						/* @note desactive le retour d'interface */
						navigation.removeEltClassActiveOnTouch();
					});	
				}else{
					$masque.removeClass("lightbox overflow-hidden").removeAttr("data-modal");
					$lightbox.attr("hidden", "true");
					if(typeof callback !== 'undefined'){
						callback();
					}

					lightbox.restorePageForAccessibility(idPopin,masque,eltToFocusWhenBack);

					/* @note desactive le retour d'interface */
					navigation.removeEltClassActiveOnTouch();
				}
				break;
			default :
				break; 
		}
	};

	/**
	 * @fct restorePageForAccessibility
	 * restore la page ayant ouvert la lightbox poru qu'elle soit a nouveau accessible par Voice Over
	 * @param popin la lightbox en cours de fermeture
	 * @param masque le masque posé sur la page sous la lightbox
	 * @param eltToFocusWhenBack se selecteur pointant sur l'element sur lequel poser le focus une fois la popin refermée
	 */
	/***********************************************************************/
	exports.restorePageForAccessibility = function(idPopin, masque, eltToFocusWhenBack) {
		
		/* @access : accessibilite seulement sous IOS pour VO */
		//if($device.isIOS()){

			var $lightbox = $("#"+idPopin);
			var $masque;
			
			if("body" === masque){
				$masque = $(document.body);
			}else{
				$masque = $("#"+masque);
			}
	
			/* @acces on enleve le focus sur la lightbox car l'utilisateur malvoyant ne sait pas qu'il y a une popin d'affichée */
			switch(masque){
				case "page-home":
					$("#page-home").attr( "aria-hidden", "false" );
					break;
				default :				
					$masque.attr( "aria-hidden", "false" );
					break; 
			}
	
			/* @acces on enleve le focus à la popin affichee pour ne pas être lu une fois fermee */
			$lightbox.attr("aria-hidden","true");
	
			/* @acces on place le focus */
			setTimeout(function(){
				navigation.navigationSetFocus(eltToFocusWhenBack);
			},300);
		//}	
	};

    return exports;
});