function loadHeader() {
    var content = '';
    content = content + '<h1 title="About Chronomaster"><a href="index.html"><img src="web/images/hmx_logo.png" alt="Humanex logo" style="width:50px;height:40px;border:0" /></a> Chronomaster</h1>';
    document.getElementById("header").innerHTML = content ;
}

function loadSection(localActiveContent) {
  activeContent = localActiveContent;
  loadSectionTitle(localActiveContent);
  loadSectionContent(localActiveContent);
}

function loadSectionTitle(localActiveContent) {
    var title_content = '';
    title_content = title_content + "<h2>" + localActiveContent + "</h2>";
    document.getElementById("section_title").innerHTML = title_content ;
}

function loadSectionContent(localActiveContent) {
	var body_content = '';
	  //Activity
	  if (localActiveContent == 'Activity') {
	  body_content = body_content + '<form action="file:///home/jeremie/Bureau/20150809_web-project/src/html/action_page.html" method="POST" target="_blank">';
	  body_content = body_content + '<p>Curent activity : ' + activeActivity;
	  body_content = body_content + '<p>Started at : ' + activeActivityStart;
	  body_content = body_content + '<p>New activity : <input type="text" name="new_activity" placeholder="fill-in with a new activity" autocomplete="on"> ';
	  body_content = body_content + '<button type="button" onclick="updateCurentActivity(new_activity.value)">Start</button></p>';
	  body_content = body_content + '</form>';
	  }
	  //History
	  if (localActiveContent == 'History') {
      body_content = body_content + '<table style="width:50%"><tr><th>Activity</th><th>Begining</th><th>Duration</th></tr>';
      var _initial = new Date (activeHistory[0][1]); var nowDate = Date(); var _final = new Date(nowDate);
      var seconds = (_final.getTime() - _initial.getTime())/1000;
	  body_content = body_content + '<tr><td>' + activeHistory[0][0]+ '</td><td>' + activeHistory[0][1]+ '</td><td>' + seconds + '</td></tr>';
	  body_content = body_content + '</table>';
	  }
	  
	document.getElementById("section_body").innerHTML = body_content ;
}

function updateCurentActivity(newCurentActivity) {
  activeActivity = newCurentActivity;
  activeActivityStart = Date();
  loadSectionContent(activeContent);
}
