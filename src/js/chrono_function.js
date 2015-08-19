function loadHeader() {
    var content = '';
    content = content + '<h1 title="About Chronomaster"><a href="index.html"><img src="web/images/hmx_logo.png" alt="Humanex logo" style="width:50px;height:40px;border:0" /></a> Chronomaster</h1>';
    document.getElementById("header").innerHTML = content ;
}
function loadSection(localActiveContent,localActiveSubContent) {
  activeContent = localActiveContent;
  activeSubContentContent = localActiveSubContent;
  resetNavStyle (localActiveContent);
  setNavStyle(localActiveContent,localActiveSubContent);
  loadSectionTitle(localActiveSubContent);
  loadSectionNav(localActiveContent,localActiveSubContent);
  loadSectionContent(localActiveContent,localActiveSubContent);
}
function loadSectionTitle(localActiveSubContent) {
      var title_content = '';
      if (localActiveSubContent != 'Home') {title_content = title_content + "<h3>" + localActiveSubContent + "</h3>";}
      document.getElementById("section_title").innerHTML = title_content ;
}
function loadSectionNav(localActiveContent,localActiveSubContent) {
	var nav_content = ''; var sideNavSelectedI = '';var sideNavSelectedO = '';
	  //Profile
	  if (localActiveContent == 'Profile') {
        nav_content = nav_content + '<h2><a onclick="loadSection(\'Profile\',\'Home\')">Profile</a></h2>';
        if (localActiveSubContent == 'Parameters') {sideNavSelectedI = '<b>';sideNavSelectedO = '</b>';} else {sideNavSelectedI = '';sideNavSelectedO = '';}
        nav_content = nav_content + '<table><tr><td><a onclick="loadSection(\'Profile\',\'Parameters\')" class="sidenav_parameters">' + sideNavSelectedI + 'Parameters' + sideNavSelectedO + '</td></tr>';
        if (localActiveSubContent == 'Tips') {sideNavSelectedI = '<b>';sideNavSelectedO = '</b>';} else {sideNavSelectedI = '';sideNavSelectedO = '';}
        nav_content = nav_content + '<tr><td><a onclick="loadSection(\'Profile\',\'Tips\')" class="sidenav_tips">' + sideNavSelectedI + 'Tips' + sideNavSelectedO + '</a></td></tr></table>';
	  }
	  //Activity
	  if (localActiveContent == 'Activity') {
	    nav_content = nav_content + '<h2><a onclick="loadSection(\'Activity\',\'Home\')">Activity</a></h2>';
	  }
	  //History
	  if (localActiveContent == 'History') {
        nav_content = nav_content + '<h2><a onclick="loadSection(\'History\',\'Home\')">History</a></h2>';
        if (localActiveSubContent == 'Visualization') {sideNavSelectedI = '<b>';sideNavSelectedO = '</b>';} else {sideNavSelectedI = '';sideNavSelectedO = '';}
        nav_content = nav_content + '<table><tr><td><a onclick="loadSection(\'History\',\'Visualization\')" class="sidenav_visualization">' + sideNavSelectedI + 'Visualization' + sideNavSelectedO + '</a></td></tr>';
        if (localActiveSubContent == 'Request') {sideNavSelectedI = '<b>';sideNavSelectedO = '</b>';} else {sideNavSelectedI = '';sideNavSelectedO = '';}
        nav_content = nav_content + '<tr><td><a onclick="loadSection(\'History\',\'Request\')" class="sidenav_request">' + sideNavSelectedI + 'Request' + sideNavSelectedO + '</a></td></tr></table>';
	  }
	  //Model
	  if (localActiveContent == 'Model') {
	    nav_content = nav_content + '<h2><a onclick="loadSection(\'Model\',\'Home\')">Model</a></h2>';
	  }
	  //Plan
	  if (localActiveContent == 'Plan') {
	    nav_content = nav_content + '<h2><a onclick="loadSection(\'Plan\',\'Home\')">Plan</a></h2>';
	  }
	document.getElementById("nav_body").innerHTML = nav_content ;
}

function loadSectionContent(localActiveContent,localActiveSubContent) {
	var body_content = '';
	  //Activity
	  if (localActiveContent == 'Activity' && localActiveSubContent == 'Home') {
	    body_content = body_content + '<form action="file:///home/jeremie/Bureau/20150809_web-project/src/html/action_page.html" method="POST" target="_blank">';
	    body_content = body_content + '<p>Curent activity : ' + activeActivity;
	    body_content = body_content + '<p>Started at : ' + activeActivityStart.substring(0, 24);
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
  loadSectionContent(activeContent,activeSubContent);
}
function resetNavStyle(localActiveContent) {
	document.getElementById("topnav_Profile").className = document.getElementById("topnav_Profile").className.replace( /(?:^|\s)navSelected(?!\S)/g , '' );
	document.getElementById("topnav_Activity").className = document.getElementById("topnav_Activity").className.replace( /(?:^|\s)navSelected(?!\S)/g , '' );
	document.getElementById("topnav_History").className = document.getElementById("topnav_History").className.replace( /(?:^|\s)navSelected(?!\S)/g , '' );
	document.getElementById("topnav_Model").className = document.getElementById("topnav_Model").className.replace( /(?:^|\s)navSelected(?!\S)/g , '' );
	document.getElementById("topnav_Plan").className = document.getElementById("topnav_Plan").className.replace( /(?:^|\s)navSelected(?!\S)/g , '' );
}
function setNavStyle(localActiveContent,localActiveSubContent) {
	  if (localActiveContent == 'Profile') {document.getElementById("topnav_Profile").className += "navSelected";}
	  if (localActiveContent == 'Activity') {document.getElementById("topnav_Activity").className += "navSelected";}
	  if (localActiveContent == 'History') {document.getElementById("topnav_History").className += "navSelected";}
	  if (localActiveContent == 'Model') {document.getElementById("topnav_Model").className += "navSelected";}
	  if (localActiveContent == 'Plan') {document.getElementById("topnav_Plan").className += "navSelected";}
}
