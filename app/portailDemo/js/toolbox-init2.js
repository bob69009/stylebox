/******************************************************************************************/
/* == REGLE 																			  */
/******************************************************************************************/
/* == @todo	: commentaire/code temporaire a supprimer apres livraison					  */
/* == @note	: commentaire                                                                 */
/* == @fct : nom de la fonction 	 													  */
/* == @param : nom du parametre		 													  */
/******************************************************************************************/

/******************************************************************************************/
/* == SUMMARY																			  */
/******************************************************************************************/
/* == Init       					 													  */
/* == Utilitaire   					 													  */
/* == Fonctionnalité Outils Toolbox   					     							  */
/******************************************************************************************/

(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = factory;
	} else {
		// Global Variables
		root.toolbox = factory($);
	}
})(this, function($) {
	
    var exports = {};
    
    exports.isAdminMode = false;

    /******************************************************************************************/
    /* == Init       					 													  */
    /******************************************************************************************/
    
    /* @fct init */
    /* Initialisation au lancement de l'outils Toolbox */
	/***********************************************************************/
    
    exports.init = function () {   
        
        this.isAdminMode = this.isAdmin();
        
        this.initNavigation();
        
        this.initAccueil();



    };
    
    /******************************************************************************************/
    /* == Utilitaire   					 													  */
    /******************************************************************************************/
    
    /* @fct get url */
	/***********************************************************************/
    
    exports.url = function(param) {
        var vars = {};
        window.location.href.replace( location.hash, '' ).replace( 
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if ( param ) {
            return vars[param] ? vars[param] : null;	
        }
        return vars;
    };
    
    /* @fct admin */
	/***********************************************************************/
    
     exports.isAdmin = function() {
        var $param = exports.url();
               
        if(typeof $param["mode"] !== "undefined" && $param["mode"].indexOf("acdm16*") > -1){
            mode = true;
        }else{
            mode = false;
        }
         
        return mode;
     }
    
    /* @fct ajax */
	/***********************************************************************/
    
    exports.ajax = function(id,page,callback){
        
        var $content = $("#"+id);
        var url = page+".html";
        
        $.ajax({
			url: url,
			dataType : 'html',
		  	beforeSend : function(){
		  		$content.empty();
		  	},
		  	success : function(html) {
                
                $content.empty();
                $('#back-top').fadeOut();
                
                /* Exception sur le contenu de la page Version */
                if(id === "tool-version-content"){
                    html = $(html).find("#tool-list-versionning > li:first-child > *");
                }
                
		  		$content.append(html);
                $.getScript("js/custom.js");
                
			},
			complete : function(){ 				
                
                if(id !== "tool-version-content" && $('.lang-html').length > 0){
                    exports.parseHTML($('.lang-html'));      
                }else{
                    PR.prettyPrint();                    
                }
                
                // @note : Gestion de l'affichage du bouton de retour en haut de page
                $("#tool-main-content").find(".overflow-y").scroll(function () {
                    exports.configScrollTop("back-top");
                });
                
                if(typeof callback !== 'undefined'){
                    callback();
                }                
                
            },
            error : function(xhr){
                console.log(xhr.statusText);
            }            
		});
    };
    
    /* @fct rgb2hex */
    /* Function to convert hex format to a rgb color */
	/***********************************************************************/
    
    exports.rgb2hex = function(color){
        var rgb = color.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
        return (rgb && rgb.length === 4) ? "#" +
          ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
    }
    
    /* @fct parseHTML */
	/***********************************************************************/
    
    exports.parseHTML = function(html){
        var content = html;   
        var text;
        
        for(var i = 0; i < content.length; i++) {
            text = $(content[i]).html().replace(/</g,"&lt;");
            $(content[i]).html(text);
        }
        
        PR.prettyPrint();
    }

    /******************************************************************************************/
    /* == Fonctionnalité Outils Toolbox   					     							  */
    /******************************************************************************************/
    
    /* @fct initNavigation */
	/***********************************************************************/
    
    exports.initNavigation = function(){
        
        /* => lien accueil */
        $("#tool-link-accueil").on("click",function(){
            exports.initAccueil();
        });

         $("#tool-menu-home").on("click",function(){
            exports.initAccueil();
        });
        
        $(".toolbox-link").on("click",function(){
            exports.initToolbox();
        });
        
        //$('.tool-pres a').blur();
        
        /* remove focus action on hidden navigation panel link */
        $("#tool-navigation a").blur();
        $("#tool-navigation a").attr("tabIndex", "-1");
        
        $('button.button--primary').on('click', function (event) {
              
                 $('.modal-backdrop').remove();
          });   
        
        /* => lien versionng */
        $("#tool-menu-info").on("click",function(){
            /* On recupere le contenu de la version toolbox */
            exports.ajax("tool-version-content","toolbox/version");
            
            var $linkVersion = $("#tool-link-version");
            /* Gestion du bouton qui permet de voir la liste des versions de la toolbox */
            if(exports.isAdminMode){
                $linkVersion.removeAttr('disabled')
                $linkVersion.on("click",function(){
                     lightbox.closeLightbox("all","tool-version","modalY-topToCenter",function(){
                          exports.ajax("tool-main-content","toolbox/version");
                     });                    
                }); 
            }else{
                $linkVersion.attr('disabled','disabled');
            }     
                        
            lightbox.openLightbox("all","tool-version","modalY-topToCenter","","",function(){
                
                /* Gestion du bouton de fermeture de la popin */
                $(".lbptool-closeX-btn").on("click",function(){
                     lightbox.closeLightbox("all","tool-version","modalY-topToCenter");
                });
                     
            });   
        });
        
        /* => lien menu burger ouverture */
        $("#tool-menu-open").on("click",function(){
            $("#tool-navigation").on("webkitTransitionEnd transitionend",function(){

                var $itemNav = $(this).find("li ul li");
                var $burger = $(this).find("li:last-child");

                $burger.on("webkitAnimationEnd animationend",function(){
                    $burger.off("webkitAnimationEnd animationend");  

                    $itemNav.removeClass("effet-open-translateX-rightLeft").css({
                        "-webkit-animation-delay": 0,
                                "animation-delay": 0 
                    });
                });          

                /* delay d'apparition sur chaque item menu */
                for(var i = 0; i < $itemNav.length; i++) {
                    $($itemNav[i]).css({
                        "-webkit-animation-duration": ".2s",
                                "animation-duration": ".2s",
                        "-webkit-animation-delay": i/20 +"s",
                                "animation-delay": i/20 +"s"
                    });
                }      

                /* on lance l'animation d'ouverture des item du menu */
                $("#tool-navigation-menu-content").removeClass("effet-hide");
                $itemNav.addClass("effet-open-translateX-rightLeft");

                $(this).off("webkitTransitionEnd transitionend");  
            });
        });
        
        /* => lien menu de navigation*/
        $("#tool-navigation-menu-content").find("a:last-child").on("click",function(){
            
            var valueTemplate = $(this).attr("data-click").split('/');
            var length = valueTemplate.length;
            valueTemplate = valueTemplate[length-1];
            
            exports.ajax("tool-main-content","toolbox/"+$(this).attr("data-click"),function(){                
                exports.dataReady(valueTemplate);
            });
            
            var $navigationMenu = $("#tool-navigation");
            
            $navigationMenu.on("webkitTransitionEnd transitionend",function(){
                $navigationMenu.off("webkitTransitionEnd transitionend");
                $("#tool-navigation-menu-content").addClass("effet-hide");
            });
        });
        
        /* => lien menu burger/croix fermeture */
        $("#tool-menu-close").on("click",function(){
            
            var $menuClose = $("#tool-navigation");
            
            $menuClose.on("webkitTransitionEnd transitionend",function(){
                $menuClose.off("webkitTransitionEnd transitionend");
                $("#tool-navigation-menu-content").addClass("effet-hide");
            });
        });
        
        // => lien retour en haut de page
        $('#back-top').on("click","a",function(){
            exports.returnScrollTop();
            
            return false;
        });
    };    
    
    /* => gestion du retour haut de page */
	    
    exports.configScrollTop = function (elt){
		var $elt = $('#'+elt);
        var $header = $("#tool-header");
        var $scrollContent = $("#tool-main-content").find(".overflow-y");
		if ($scrollContent.scrollTop() > 200) {  
			$header.attr("smaller","");           
            $elt.fadeIn(200);
		} else {           
            $header.removeAttr("smaller","");
			$elt.fadeOut(200);
		}
	};
    
    exports.returnScrollTop = function (){
		$("#tool-main-content").find(".overflow-y").animate({ 
				scrollTop: 0 
			},{
				duration: 600,
				complete: function() {}
    		}
    	);
	};
    
    /* @fct initAccueil : Chargement de la page d'accueil */
    exports.initAccueil = function(){
        exports.ajax("tool-main-content","toolbox/accueil",function(){
            // @note : Gestiion bouton page accueil            
            $("#tool-link-download").on("click",function(){
                lightbox.openLightbox("all","tool-toolbox-download","modalY-topToCenter","","",function(){
                    /* Gestion du bouton de fermeture de la popin */
                    $(".lbptool-closeX-btn").on("click",function(){
                         lightbox.closeLightbox("all","tool-toolbox-download","modalY-topToCenter");
                    });
                });
            });           
        });
    };
    
     exports.initToolbox = function(){
        exports.ajax("tool-main-content","toolbox/accueil",function(){
                
        });
    };
    
    /* @fct dataReady : traitement spec par page */
	/***********************************************************************/
    
    exports.dataReady = function(template){        
        switch(template){
            case "couleur":                
                exports.initEdition();
                exports.initColor2();                
                break;
            case "bouton":                
                exports.initEdition();                
                break;
            case "liste":
				exports.initEdition();
                navigation.addEltClassActiveOnTouch();
                break;
            case "navigation":                
                exports.initEdition();
                exports.initColor();  
                navigation.addEltClassActiveOnTouch();
                break;
            default:
                exports.initEdition();         
                break;
        }
        
        exports.animateScroll();
    };
    
    /* @fct animateScroll : effet smooth scroll sur les ancres */
	/***********************************************************************/
    
    exports.animateScroll = function(){
        var $menu = $(".tool-nav-s");
        
        if($menu.length > 0){
            $menu.on("click","li a",function(){
                var $scroll = $("#tool-main-content").find(".overflow-y");
                var target = $( $(this).attr('href') );                
                var positionY = $scroll.scrollTop() + (target.offset().top - 157 - 10);
                
                $scroll.animate({ scrollTop: positionY }, 600); 
                
                return false;
            });
        }
    } 
    
    /* @fct initColor */
	/***********************************************************************/
    
    exports.initColor = function(){
        var $colorContent = $(".tool-color-list").find("li");
        
        for(var i = 0; i < $colorContent.length; i++) {
            var colorRGB = $($colorContent[i]).find(".tool-color-visuel").css("background-color");
            var colorHex = exports.rgb2hex(colorRGB);
            //$($colorContent[i]).find("[class*='color']").attr("data-tb-color",(colorHex));
            $($colorContent[i]).find("[class*='color'] span").html(colorHex);
        }
        
        /*for(var i = 0; i < $colorContent.length; i++) {
            var $elt = $($colorContent[i]).find("[class*='bgc']");
            
            var colorRGB = $elt.css("background-color");            
            var colorHex = exports.rgb2hex(colorRGB);
            var nameClass = $elt.attr("class").split(" ")[1];
            
            $elt.attr("data-tb-color",colorHex);            
            $elt.find("span").html(nameClass);
        }*/
    };
    
    exports.initColor2 = function(){
        var $colorContent = $(".tool-color-list2").find("li [data-tb-color]"); 
        
        for(var i = 0; i < $colorContent.length; i++) {
            $($colorContent[i]).css("background-color",$($colorContent[i]).attr("data-tb-color"));
        }
        
        /*for(var i = 0; i < $colorContent.length; i++) {
            var $elt = $($colorContent[i]).find("[class*='bgc']");
            
            var colorRGB = $elt.css("background-color");            
            var colorHex = exports.rgb2hex(colorRGB);
            var nameClass = $elt.attr("class").split(" ")[1];
            
            $elt.attr("data-tb-color",colorHex);            
            $elt.find("span").html(nameClass);
        }*/
    };
    
    /* @fct specifique */
	/***********************************************************************/
    
    exports.listeMaquette = function(page,liste,source){
        for(var i in pages) {
            var page = pages[i];

            if(page.description === "") {
                page.description = page.url;
            }

            var a = document.createElement("a");
            a.setAttribute("class", "flex-container-v");  
            a.setAttribute("href", source + page.url);  
            a.setAttribute("target","_blank");

            var p = document.createElement("p");
            p.innerHTML = page.url;
            p.setAttribute("class", "pas");  
            
            var p2 = document.createElement("p");
            p2.innerHTML = page.version;
            p2.setAttribute("class", "bold txtright pas ptn");

            var iframe = document.createElement("iframe");
            iframe.setAttribute("data-original", source + page.url);

            var contentIframe = document.createElement("div");
            contentIframe.appendChild(iframe);

            var overlay = document.createElement("div");
            overlay.setAttribute("class", "overlay"); 

            var texte = document.createElement("div");
            texte.setAttribute("class", "texte-overlay"); 
            texte.innerHTML = "show code";

            var div = document.createElement("div");
            div.setAttribute("class", "iframe-content");       
            div.appendChild(contentIframe);  
            overlay.appendChild(texte);
            div.appendChild(overlay);                                                        
            a.appendChild(div);
            a.appendChild(p);
            a.appendChild(p2);

            var li = document.createElement("li");
            li.setAttribute("class", "preview-content mts");  

            li.appendChild(a);                                                        

            liste.appendChild(li);
        }
    };
    
    /* @fct animationArticle */
	/***********************************************************************/
    
    exports.initEdition = function(){       
        
        var $show = $(".tool-bloc-edit-show");       
        var $edit = $(".tool-bloc-edit-edit");
        
        var $linkShow = $show.find("a:first-child");
        //$linkShow.removeAttr('disabled');

        /* Par defaut tout est non visible */
        var $pre = $linkShow.closest("article").find("pre");
        $pre.attr("data-tb-edit","hide");
        $linkShow.find("span").html("Show code");

        /* Gestion de l'affichage du code source */
        $linkShow.on("click",function(){
            var $pre2 = $(this).closest("article").find("pre");
            if($pre2.attr("data-tb-edit") === "hide"){
                $pre2.attr("data-tb-edit","show");
                $(this).find("span").html("Hide code");
            }else{
                $pre2.attr("data-tb-edit","hide");
                $(this).find("span").html("Show code");
            }
        });
        
        if(exports.isAdminMode){
            
            var $linkEdit = $edit.find("a:first-child");
            $linkEdit.removeAttr('disabled');
            
            /* Gestion de l'edition des styles */
            $linkEdit.on("click",function(){ 
                lightbox.openLightbox("all","tool-lightbox","menuOption","","",function(){

                    /* Gestion du bouton de fermeture de la popin */
                    $(".lbptool-closeX-btn").on("click",function(){
                         lightbox.closeLightbox("all","tool-lightbox","menuOption");
                    });

                });
            });
            
        }else{
            //$show.find("a").attr('disabled','disabled');
            $edit.find("a").attr('disabled','disabled');
        }  
    };    
        
    return exports;
});