
function getUrlVars() {
	  var vars = {};
	  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		  vars[key] = value;
	  });
	  return vars;
 }
 
function populateTable(json)
 {
		var table = document.getElementById("mytable"); 
		var fields =  Object.keys(json[0]);
		var values =  Object.values(json[0]);
		var type = fields[0].substr(0,7);
		for (var i = 0; i < fields.length; i++) {
			valueText = values[i];
			if(fields[i] == 'password'){
				valueText = '----------'
			}
			if(fields[i].includes('date')){
				valueText = formatDate(valueText);
			}
			if(!fields[i].includes('ID')){
				table.appendChild(createNewRow(fields[i], valueText, 'edit', 'field='+ fields[i] +'&id=' + values[0] + '&type=' + type ));
			}
		};
 }
 
function formatDate(date){
	return date.split('T')[0];	
}
  
function update(value){
	window.location.replace("./updatefield.html?" + value);
}

 function createNewRow(fieldName, valueText, buttonText, buttonValue){
			var newRow = document.createElement("tr");
			if(fieldName != ''){
				var field = document.createElement("td");
				field.className = 'fields';
				field.innerText = fieldName;
				newRow.appendChild(field);
			}
			var value = document.createElement("td"); 
			var edit = document.createElement("td"); 
			if(fieldName != 'username' && fieldName != 'owner'){
				var button = document.createElement("button"); 
				button.setAttribute( "onClick", "update(\'" + buttonValue + "\')" );
				button.className = 'btn btn-primary';
				button.innerText = buttonText;
				edit.appendChild(button);
			}
			value.innerText = valueText;
			newRow.appendChild(value);
			newRow.appendChild(edit);
			return newRow;
 }
 


		 

		 