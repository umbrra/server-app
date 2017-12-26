	function noSubmit(){
      		return false;
      	}
      	function form(nametext,desktext){
			var name = document.getElementById(nametext).value;
			document.getElementById(nametext).value = '';
			if(desktext===''){}
			else{
				var desk = document.getElementById(desktext).value;
				document.getElementById(desktext).value = '';
			}
			
			var task = {
				name:name,
				desk:desk
			}
			
			var taskStr = JSON.stringify(task);
			return taskStr;
			}
		function processData(data){
			console.log("data");
			console.log(data);
			var dataTasks = data;
			document.getElementById('#tasks').innerHTML = "";
			for(var i=0;i<dataTasks.length;++i){
				document.getElementById('#tasks').innerHTML += '<li id="text">Имя '+dataTasks[i].name+' Описание '+dataTasks[i].desk+'</li>';
			}
		}
		function deleteTask(){
			var urlpost = "http://localhost:3001/tasks/post?type=delete";
			 fetch(urlpost, {
					method: 'POST',
					mode: 'cors', 
					headers: new Headers({
					'Content-Type':'application/json'
					}),
					body: form("deletenametext","")
				}).then(function(res){
					getTasks();
				});
		}

		function setTask(){
			var urlpost = "http://localhost:3001/tasks/post?type=set";
			
		    fetch(urlpost, {
					method: 'POST',
					mode: 'cors', 
					headers: new Headers({
					'Content-Type':'application/json'
					}),
					body: form("setnametext","setdesktext")
				}).then(function(res){
					getTasks();
				});
		    
		}

		function getTasks(){
			var url = "http://localhost:3001/tasks/get?all=true";
			fetch(url).then(function(response){
				response.json().then(function(data){
					processData(data);
				});
			}).catch(function(error){
				alert("something wrong!!");
			});
		}