function loadHeader() {
    var content = '';
    content = content + '<h1 title="About Chronomaster"><a href="index.html"><img src="web/images/hmx_logo.png" alt="Humanex logo" style="width:50px;height:40px;border:0" /></a> Chronomaster</h1>';
    document.getElementById("header").innerHTML = content ;
}

function loadSection(localActiveContent,localActiveSubContent) {
  activeContent = localActiveContent;
  activeSubContentContent = localActiveSubContent;
  loadSectionTitle(localActiveSubContent);
  loadSectionNav(localActiveContent);
  loadSectionContent(localActiveContent,localActiveSubContent);
}

function loadSectionTitle(localActiveSubContent) {
    if (localActiveSubContent != 'Home') {
      var title_content = '';
      title_content = title_content + "<h2>" + localActiveSubContent + "</h2>";
      document.getElementById("section_title").innerHTML = title_content ;
    }
}
function loadSectionNav(localActiveContent) {
	var nav_content = '';
	  //Profile
	  if (localActiveContent == 'Profile') {
        nav_content = nav_content + '<h2>Profile</h2>';
        nav_content = nav_content + '<table><tr><td>Main</td></tr>';
        nav_content = nav_content + '<tr><td>Parameters</td></tr>';
        nav_content = nav_content + '<tr><td>Tips</td></tr></table>';
	  }
	  //Activity
	  if (localActiveContent == 'Activity') {
	    nav_content = nav_content + '<h2>Activity</h2>';
	    nav_content = nav_content + '<table><tr><td>Main</td></tr></table>';
	  }
	  //History
	  if (localActiveContent == 'History') {
        nav_content = nav_content + '<h2>History</h2>';
        nav_content = nav_content + '<table><tr><td>Main</td></tr>';
        nav_content = nav_content + '<tr><td>Visualization</td></tr>';
        nav_content = nav_content + '<tr><td>Request</td></tr></table>';
	  }
	  //Model
	  if (localActiveContent == 'Model') {
	    nav_content = nav_content + '<h2>Model</h2>';
	    nav_content = nav_content + '<table><tr><td>Main</td></tr></table>';
	  }
	  //Plan
	  if (localActiveContent == 'Plan') {
	    nav_content = nav_content + '<h2>Plan</h2>';
	    nav_content = nav_content + '<table><tr><td>Main</td></tr></table>';
	  }
	document.getElementById("nav_body").innerHTML = nav_content ;
}

function loadSectionContent(localActiveContent,localActiveSubContent) {
	var body_content = '';
	  //Activity
	  if (localActiveContent == 'Activity' && localActiveSubContent == 'Home') {
	    body_content = body_content + '<form action="file:///home/jeremie/Bureau/20150809_web-project/src/html/action_page.html" method="POST" target="_blank">';
	    body_content = body_content + '<p>Curent activity : ' + activeActivity;
	    body_content = body_content + '<p>Started at : ' + activeActivityStart;
	    body_content = body_content + '<p>New activity : <input type="text" name="new_activity" placeholder="fill-in with a new activity" autocomplete="on"> ';
	    body_content = body_content + '<button type="button" onclick="updateCurentActivity(new_activity.value)">Start</button></p>';
	    body_content = body_content + '</form>';
	  }
	  //History
	  if (localActiveContent == 'History' && localActiveSubContent == 'Home') {
        body_content = body_content + '<table style="width:100%"><tr><th style="width:40%" >Activity</th><th style="width:22%">Begining</th><th>Duration</th></tr>';
        var _initial = new Date (activeHistory[0][1]); var nowDate = Date(); var _final = new Date(nowDate);
        var delta = Math.round((_final.getTime() - _initial.getTime())/1000)/1;
  	    body_content = body_content + '<tr><td>' + activeHistory[0][0] + '</td><td>' + activeHistory[0][1].substring(0, 24) + ' </td><td>' + delta + ' sec </td></tr>';
		if (activeHistory.length >= 2) {
		  for (i = 1; i < activeHistory.length; i++) { 
				body_content = body_content + '<tr><td>' + activeHistory[i][0]+ '</td><td>' + activeHistory[i][1].substring(0, 24) + ' </td><td>' + activeHistory[i][2] + ' sec </td></tr>';
		  }
		}
	    body_content = body_content + '</table>';
	  }
	  
	document.getElementById("section_body").innerHTML = body_content ;
}

function updateCurentActivity(newCurentActivity) {
  //On met à jour la variable globale de l'activité courante
  activeActivity = newCurentActivity;
  activeActivityStart = Date();
  //On met à jour la durée dans le dernier enregistrement de l'historique
  var _initial = new Date (activeHistory[0][1]); var _final = new Date(activeActivityStart);
  var delta = Math.round((_final.getTime() - _initial.getTime())/1000)/1;
  activeHistory[0][2] = delta;
  //On insert un nouvelle enregistrement dans l'historique avec l'activité courante
  var newHistory = [activeActivity,activeActivityStart,0];
  activeHistory.unshift(newHistory);
  loadSectionContent(activeContent);
}
