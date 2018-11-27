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
/* == Navigation 					 													  */
/******************************************************************************************/
/* @fct navigationSetFocus															      */
/* @fct addEltClassActiveOnTouch														  */
/* @fct removeEltClassActiveOnTouch														  */
/******************************************************************************************/

(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = factory;
	} else {
		// Global Variables
		root.navigation = factory($);
	}
})(this, function($) {

	var exports = {};

	/* @fct navigationSetFocus : place le focus sur l'objet du DOM pointe par lar le selecteur passe en parametre */
	/* @param page :  selecteur de la page sur laquelle placer le focus (utilisé pour enlever focus par défaut avant de placer le nouveau) */
	/* @param sel : selecteur de l'objet sur lequel placer le focus */
	/* @returns l'objet cible */
	/* @acces cette fonction doit etre utilisee en fin de postaction de chaque ecran ou popin afin que Voice Over commence la lecture de l'ecran sur l'objet designe */
	/* @bugfix Attention, placer l'appel a cette fonction en callback des animations sinon cela fera planter l'animation */

	/* traitement effectue sous IOS uniquement */
	/***********************************************************************/
	exports.navigationSetFocus = function (sel,time){
		//if($device.isIOS()){
			if(typeof time === 'undefined' || time === null || time === 0){
				time = 300;
			}
			
			var $obj = undefined;
			// id html par defaut de l'elt sur lequel poser le focus
			var idAccessFocus = "access-focus";
			$("#"+idAccessFocus).removeAttr("id");
			if (sel !== null && sel !== undefined && sel !== "") {
				$obj = $(sel);
				var idObj = $obj.attr("id");
				// si l'objet n'a pas deja un id, on lui attribue celui par defaut pour l'accessibilite
				if ( idObj === null || idObj === undefined || idObj === "") {
					$obj.attr("id",idAccessFocus).attr("tabindex",0); //ConstantesAccessibilite.VALEUR_TABINDEX_FOCUS);
				}
				setTimeout(function(){
					$obj.focus();
				},time);			
			}
			return $obj;
		//}		
	};
	
	/* @fct addEltClassActiveOnTouch : applique la classe active à un élément, simule le :active */
	/***********************************************************************/
	exports.addEltClassActiveOnTouch = function (){

		var $elt = $("[data-lien-user='actif'], [data-lien-user='actif'] a, [data-lien-user='actif'] input");

		$elt.bind('touchstart', function() {
	    	$(this).addClass('active');
		});

		$elt.bind('touchmove', function() {
		    $(this).removeClass('active');
		});

		$elt.bind('touchend', function() {
		    $(this).removeClass('active');
		});
	}

	/* @fct removeEltClassActiveOnTouch : remove la classe active à un élément, simule le :active */
	/***********************************************************************/
	exports.removeEltClassActiveOnTouch = function (){
		var $elt = $("[data-lien-user='actif'], [data-lien-user='actif'] a, [data-lien-user='actif'] input");
		$elt.removeClass('active');
	}

	return exports;
});