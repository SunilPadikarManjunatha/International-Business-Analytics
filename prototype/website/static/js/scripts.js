function message(status, shake=false, id="") {
  if (shake) {
    $("#"+id).effect("shake", {direction: "right", times: 2, distance: 8}, 250);
  } 
  document.getElementById("feedback").innerHTML = status;
  $("#feedback").show().delay(2000).fadeOut();
}

function showMore(val){
	var next = "rw"+val;
	document.getElementById(next).setAttribute("style", "");
	val += 3;
	if( val < 18){
		document.getElementById("sm").setAttribute("onclick", "showMore("+val+")");
	}
	if(val == 15) {
		document.getElementById("sm").setAttribute("style", "display:none");
	}
		
}

function error(type) {
  $("."+type).css("border-color", "#E14448");
}

function printResults(op){
	var opt = JSON.parse(op);
	var toc = document.getElementById("toc");
	var br = document.createElement("br");
	var latest ;
	toc.innerHTML = "";
	for (k in opt){
		var current = opt[k];
		if (k%3 == 0){
			latest = document.createElement("div");
			latest.setAttribute("class", "row columns is-multiline");
			latest.setAttribute("id", "rw"+k);
			if(k > 3 ){
				latest.setAttribute("style","display:none");
			}
			toc.appendChild(latest);
		}
		var div1 = document.createElement("div");
		div1.setAttribute("class", "column is-one-third");
		var div2 = document.createElement("div");
		div2.setAttribute("class", "card large");
		var div3 = document.createElement("div");
		div3.setAttribute("class", "card-image");
		var div6 = document.createElement("div");
		div6.setAttribute("class", "circle-text");
		div6.innerHTML = Math.floor(opt[k]['app_by_opening_wei']) + '%';
		var div7 = document.createElement("div");
		div7.setAttribute("class", "center-text");
		div7.innerHTML = opt[k]['opportunity_id'];
		var fig = document.createElement("figure");
		fig.setAttribute("class", "image");
		fig.innerHTML = '<img src="../static/'+k+'.jpg" alt="Image">';
		div3.appendChild(fig);
		div3.appendChild(div6);
		div3.appendChild(div7);
		div2.appendChild(div3);
		div1.appendChild(div2);
		div4 = document.createElement("div");
		div4.setAttribute("class", "card-content");
		div5 = document.createElement("div");
		div5.setAttribute("class", "content");
		var country = opt[k]['name_entity'];
		var skill = opt[k]['intersect_skill'];
		var bg = opt[k]['intersect_back'];
		div5.innerHTML = "<b>Country:</b> "+country+" <br> <b>Skills Matched:</b> "+skill+" <br> <b>Background Matched:</b> "+bg;
		div4.appendChild(div5);
		div2.appendChild(div4);
		latest.appendChild(div1);
		
	}
	document.getElementById("sm").setAttribute("style", "");
}

var search = function() {
	var toc = document.getElementById("toc");
	toc.innerHTML = "";
	document.getElementById("sm").setAttribute("style", "display:none");
	document.getElementById("loader").setAttribute("style","");
  $.post({
    type: "POST",
    url: "/",
    data: {"country": $("#country").val(), 
           "back_pref": $("#back_pref").val(),
		   "skill_pref": $("#skill_pref").val()},
    success(response){
      var stat = JSON.parse(response)["status"];
	  document.getElementById("loader").setAttribute("style","display:none");
	  printResults(stat);
      if (status === "Login successful") { location.reload(); }
      else { error("login-input"); }
    }
  });
};

$(document).ready(function() {
  
  $(document).on("click", "#search", search);
  $(document).keypress(function(e) {if(e.which === 13) {login();}});
  
  $(document).on("click", "#signup-button", function() {
    $.post({
      type: "POST",
      url: "/signup",
      data: {"username": $("#signup-user").val(), 
             "password": $("#signup-pass").val(), 
             "email": $("#signup-mail").val()},
      success(response) {
        var status = JSON.parse(response)["status"];
        if (status === "Signup successful") { location.reload(); }
        else { message(status, true, "signup-box"); }
      }
    });
  });

  $(document).on("click", "#save", function() {
    $.post({
      type: "POST",
      url: "/settings",
      data: {"username": $("#settings-user").val(), 
             "password": $("#settings-pass").val(), 
             "email": $("#settings-mail").val()},
      success(response){
        message(JSON.parse(response)["status"]);
      }
    });
  });
});

// Open or Close mobile & tablet menu
// https://github.com/jgthms/bulma/issues/856
$("#navbar-burger-id").click(function () {
  if($("#navbar-burger-id").hasClass("is-active")){
    $("#navbar-burger-id").removeClass("is-active");
    $("#navbar-menu-id").removeClass("is-active");
  }else {
    $("#navbar-burger-id").addClass("is-active");
    $("#navbar-menu-id").addClass("is-active");
  }
});