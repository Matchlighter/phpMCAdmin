/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* YAML Editor */
function yamlEditor(jqEl, file){
	//Download HTML
	$.ajax({
		url: "editors/ymlEditor.php"
	}, function (html){
		jqEl.html(html);
	})
	this.parElement = jqEl;
	this.loadFile(file);
	this.data = null;
}

yamlEditor.prototype.pullJSON = function (){
	$.ajax({
		url: "getYmlJson.php",
		dataType: "json"
	}, function (jobj){
		this.data = jobj;
	})
}

yamlEditor.prototype.loadFile = function (file){
	this.file = file;
	this.pullJSON();
}

var t = new yamlEditor("","");

/* Tool Tips */
function calculateTips(){
	$("[jstt]").hover(function (){
		var jel = $(this);
		var tip = $("#toolTip #tipcont");
		tip.html(jel.attr("jstt"));
		var side="top";
		
		$("#toolTip").css("display", "inline-block");
		var pX = jel.offset().left + (jel.outerWidth()/2) - (tip.outerWidth()/2);
		var pY = jel.offset().top - tip.outerHeight();
				
		if (pY<0){
			side="bottom";
		}
		if (jel.attr("jsttside") != null)
			side = jel.attr("jsttside");
		
		switch(side){
			case "left":
				pX = jel.offset().left - tip.outerWidth() -15;
				pY = jel.offset().top + (jel.outerHeight()/2) - (tip.outerHeight()/2);
				$("#tiparrow *").css({
					"border-top-style": "none",
					"border-left-style": "none",
					"border-bottom-style": "none",
					
					"border-right-style": "solid",
					"border-right-color": "transparent",
					
					"left": "0",
					"top": "0"
				});
				$("#tiparrow #p1").css({
					"border-top-style": "solid",
					"top": "6px"
				});
				$("#tiparrow #p2").css({
					"border-bottom-style": "solid"
				});
				$("#tiparrow").css({
					"left": tip.outerWidth() + "px",
					"top": -tip.outerHeight()/2-6 + "px"
				});
				break;
			case "right":
				pX = jel.offset().left + jel.outerWidth()+15;
				pY = jel.offset().top + (jel.outerHeight()/2) - (tip.outerHeight()/2);
				$("#tiparrow *").css({
					"border-top-style": "none",
					"border-right-style": "none",
					"border-bottom-style": "none",
					
					"border-left-style": "solid",
					"border-left-color": "transparent",
					
					"left": "0",
					"top": "0"
				});
				$("#tiparrow #p1").css({
					"border-top-style": "solid",
					"top": "6px"
				});
				$("#tiparrow #p2").css({
					"border-bottom-style": "solid"
				});
				$("#tiparrow").css({
					"left": "-6px",
					"top": -tip.outerHeight()/2-6 + "px"
				});
				break;
			case "top":
				pX = jel.offset().left + (jel.outerWidth()/2) - (tip.outerWidth()/2);
				pY = jel.offset().top - tip.outerHeight()-10;
				
				$("#tiparrow *").css({
					"border-top-style": "none",
					"border-right-style": "none",
					"border-left-style": "none",
					
					"border-bottom-style": "solid",
					"border-bottom-color": "transparent",
					
					"left": "0",
					"top": "0"
				});
				$("#tiparrow #p1").css({
					"border-left-style": "solid",
					"left": "6px"
				});
				$("#tiparrow #p2").css({
					"border-right-style": "solid"
				});
				
				$("#tiparrow").css({
					"left": tip.outerWidth()/2 -6,
					"top": "0px"
				});
								
				break;
			case "bottom":
				pX = jel.offset().left + (jel.outerWidth()/2) - (tip.outerWidth()/2);
				pY = jel.offset().top + jel.outerHeight();
				$("#tiparrow *").css({
					"border-bottom-style": "none",
					"border-right-style": "none",
					"border-left-style": "none",
					
					"border-top-style": "solid",
					"border-top-color": "transparent",
					
					"left": "0",
					"top": "0"
				});
				$("#tiparrow #p1").css({
					"border-left-style": "solid",
					"left": "6px"
				});
				$("#tiparrow #p2").css({
					"border-right-style": "solid"
				});
				
				$("#tiparrow").css({
					"left": tip.outerWidth()/2 -6,
					"top": -tip.outerHeight() -6
				});
				break;
		}
		
		if (side=="top" || side=="bottom"){
			if (pX<0){
				pX=0;
				$("#tiparrow").css({
					"left": jel.offset().left + (jel.outerWidth()/2) -6
				});
			}else if (pX+tip.outerWidth() > window.innerWidth){
				pX=window.innerWidth-tip.outerWidth();
				$("#tiparrow").css({
					"left": (jel.offset().left - pX) + (jel.outerWidth()/2) -6
				});
			}
		}
		
		$("#toolTip").offset({
			left: pX, 
			top: pY
		});
		
	},
	function (){
		$("#toolTip").css("display", "none");
	});
}

$(function () {
	calculateTips();
	
	$(".nvmenuItem .expander").parent().each(function (){
		var el = $(this);
		var ex = $(this).children(".expander");
		el.click(function (){
			$(".nvmenuItem .expander").not(this).children(".expander").slideUp();
			ex.slideDown();
		})
	})
})

/* Statuses */
function getStats(){
	$.ajax({
		url: "status.json",
		dataType: "json",
		success: function(jobj){
			for (stat in jobj.stats){
				var statEl = $("#mojangStatus #"+stat.id);
				statEl.children(".pingstat").removeClass("red green yellow").addClass(statEl.color);
				statEl.attr("jstt", stat.statusText);
			}
			
			$("#mojangStatus").removeClass("majorerr minorerr");
			if (!jobj.stats.skin.ok) $("#mojangStatus").addClass("minorerr");
			if (!jobj.stats.login.ok || !jobj.stats.session.ok) $("#mojangStatus").addClass("majorerr");
		},
		error: function(jqXHR, errorStatus, errorThrown){
			$("#mojangStatus .pingstat").addClass("question");
		}
	})
}
getStats();
$(function (){
	setInterval(function (){
		getStats();
	}, 1000*20);
})