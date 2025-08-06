function load_Pg(Question_Type, Subject = null) {
    fetch('/Data_Set', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ data: 0}) })
	.then(response => response.json())
	.then(data => {data_set_main = data; data_set= data_set_main;});
	setTimeout(() => {load_Qn(1);},200); 
	
	if (Subject != null && datas['Subject'] != Subject){
		datas['Subject']= Subject;
		document.getElementById(Subject).className = 'clicked-sub';
		 let datak = document.getElementById("selected-subject");
		
		if (Subject == 'math'){
			datak = "Mathematics";
			document.getElementById("1-i").src = blue;
		}
		else if (Subject == 'physics'){
			datak.innerHTML = "Physics";
			document.getElementById("2-i").src = blue;
		}
		else if (Subject == 'chemistry'){
			datak.innerHTML = "Chemistry";
			document.getElementById("3-i").src = blue;
		}
		for (let i=0; i<3;i++){
			if (subjects[i] != Subject){
				document.getElementById(subjects[i]).className = "sub";
				document.getElementById(String(i+1)+"-i").src = white;
			}
		}
	}
	
	if (Question_Type == 'mcq' && datas["Question-Type"] != "mcq"){
		datas["Question-Type"] = "mcq";
		document.getElementById("question-no").innerHTML = mcq_no;
		document.getElementById("mcq").className = 'clicked-type';
		document.getElementById("numerical").className = 'type'; 
    }
    else if (Question_Type == 'numerical' && datas["Question-Type"] != "numerical"){
		datas["Question-Type"] = "numerical";
		document.getElementById("question-no").innerHTML = num_no;
		document.getElementById("mcq").className = 'type';
		document.getElementById("numerical").className = 'clicked-type';
    }
};

function load_Qn(qn_no) {
	datas["Question-No"] = qn_no;
	
	fetch('/Data_Set', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ data: 0}) })
	.then(response => response.json())
	.then(data => {data_set_main = data; data_set= data_set_main;});
	
	save_Check();

	function save_Check(){
		if (data_set[datas["Question-Type"]][datas["Subject"]][datas["Question-No"]][1] == "" ){
			datas['Answer-Type'] = "-notans";
		}
		else {
			datas['Answer-Type'] = data_set[datas["Question-Type"]][datas["Subject"]][datas["Question-No"]][1];
		}
		if (data_set[datas["Question-Type"]][datas["Subject"]][datas["Question-No"]][0] == '' ){
			datas['Answered'] = "0";
		}
		else {
			datas['Answered'] = data_set[datas["Question-Type"]][datas["Subject"]][datas["Question-No"]][0];
		}
		option_Reset();

		fetch('/Save_Recieve', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ data: datas}) })
		.then(response => response.json())
		.then(data => {data_set_main = data;data_set= data_set_main;});
		data_set [datas["Question-Type"]] [datas['Subject']] [datas["Question-No"]] = [datas['Answered'], datas['Answer-Type']];
		symbols();
	} 
};

function symbols(){
	var current = data_set[datas['Question-Type']][datas['Subject']];
	if (datas['Question-Type'] == "mcq"){
		for (let i = 1; i<21; i++){
			document.getElementById(i).className = "question-box"+current[i][1];
		}
	}
	else if (datas['Question-Type'] == "numerical"){
		for (let i = 1; i<6; i++){
			document.getElementById(i).className = "question-box"+current[i][1];
		}
	}
};

function select_Ans(option){
	datas['Answered'] = option;
	option_Reset();
	document.getElementById(option).className = "optioned";
};

function option_Reset(){
	document.getElementById('A').className = "option";
	document.getElementById('B').className = "option";
	document.getElementById('C').className = "option";
	document.getElementById('D').className = "option";
};

function save_Ans(option){
	if (option == 'marked'){
		if (datas['Answered'] != '0'){
			datas['Answer-Type'] = '-ansrev';
		}
		else if (datas['Answered'] == '0'){
			datas['Answer-Type'] = '-mrkrev';
		}
		save_choice();
		next_Qn();
	}
	else if (option == 'clear'){
		datas['Answered'] = "0";
		datas['Answer-Type'] = '-notans';
		option_Reset();
		save_choice();
		load_Qn(datas['Question-No']);
	}
	else if (option == 'save'){
		if (datas['Answered'] == '0'){ 
			datas['Answer-Type'] = '-notans';
		}
		else if (datas['Answered'] != '0'){
			datas['Answer-Type'] = '-ans';
		}
		save_choice();
		next_Qn();
	}
}

function next_Qn(){
	let qn = datas['Question-No']+1 ;
	if (datas['Question-Type'] == "mcq"){
		if (qn < 21){
			load_Qn(qn);
		};
		if (qn == 21){
			load_Pg("numerical");
		};
	}
	else if (datas['Question-Type'] == "numerical"){
		if (qn < 6){
			load_Qn(qn);
		};
		if (qn == 6){
			let Sub;
			if (datas["Subject"] == 'math'){
				Sub = "physics";
			}
			else if (datas["Subject"] == 'chemistry') {
				Sub = "math";
			}
			else if (datas["Subject"]== 'physics'){
				Sub = "chemistry";
			}
			load_Pg("mcq", Sub);
		};
	}
};

function scaleApp() {
    const app = document.getElementById("scaler");
    const designWidth = 1920;
    const designHeight = 1080;

    const scaleX = window.innerWidth / designWidth;
    const scaleY = window.innerHeight / designHeight;
    const scale = Math.min(scaleX, scaleY);

    app.style.transform = `scale(${scale})`;
}

    
const subjects = ['math', 'physics', 'chemistry'];
const datas = {'Time': '3:00:00', 'Subject': "", 'Question-Type': "", "Question-No": "", 'Answer-Type': "", 'Answered': "0"};
let data_set = {};


let mcq_no = `<div class="row">
						<a id="1" class="question-box" onclick='load_Qn(1)'>1</a>
						<a id="2" class="question-box" onclick='load_Qn(2)'>2</a>
						<a id="3" class="question-box" onclick='load_Qn(3)'>3</a>
						<a id="4" class="question-box" onclick='load_Qn(4)'>4</a>
					</div>
					<div class="row">
						<a id="5" class="question-box" onclick='load_Qn(5)'>5</a>
						<a id="6" class="question-box" onclick='load_Qn(6)'>6</a>
						<a id="7" class="question-box" onclick='load_Qn(7)'>7</a>
						<a id="8" class="question-box" onclick='load_Qn(8)'>8</a>
					</div>
					<div class="row">
						<a id="9" class="question-box" onclick='load_Qn(9)'>9</a>
						<a id="10" class="question-box" onclick='load_Qn(10)'>10</a>
						<a id="11" class="question-box" onclick='load_Qn(11)'>11</a>
						<a id="12"class="question-box" onclick='load_Qn(12)'>12</a>
					</div>
					<div class="row">
						<a id="13" class="question-box" onclick='load_Qn(13)'>13</a>
						<a id="14" class="question-box" onclick='load_Qn(14)'>14</a>
						<a id="15" class="question-box" onclick='load_Qn(15)'>15</a>
						<a id="16" class="question-box" onclick='load_Qn(16)'>16</a>
					</div>
					<div class="row">
						<a id="17" class="question-box" onclick='load_Qn(17)'>17</a>
						<a id="18" class="question-box" onclick='load_Qn(18)'>18</a>
						<a id="19" class="question-box" onclick='load_Qn(19)'>19</a>
						<a id="20" class="question-box" onclick='load_Qn(20)'>20</a>
					</div>`;

let num_no = `<div class="row">
						<a id="1" class="question-box" onclick='load_Qn(1)'>1</a>
						<a id="2" class="question-box" onclick='load_Qn(2)'>2</a>
						<a id="3" class="question-box" onclick='load_Qn(3)'>3</a>
						<a id="4" class="question-box" onclick='load_Qn(4)'>4</a>
					</div>
					<div class="row">
						<a id="5" class="question-box" onclick='load_Qn(5)'>5</a>
						<a class="question-boxs"></a>
						<a class="question-boxs"></a>
						<a class="question-boxs"></a>
					</div>`;

const blue = document.getElementById("selected-subject").dataset.blue;
const white = document.getElementById("selected-subject").dataset.white;
load_Pg('mcq', 'math');

window.addEventListener("load", scaleApp);
window.addEventListener("resize", scaleApp);