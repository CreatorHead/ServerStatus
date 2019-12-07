$(function () {
	getServerList();
});


function getServerList(){
	console.log("ready!");
	$.ajax('./data/server_list.json',
			{
		dataType: 'json', // type of response data
		timeout: 500,     // timeout milliseconds
		success: function (data, status, xhr) {   // success callback function
			console.log(data.servers);
			for(let i=0;i<data.servers.length;i++){
				$("#servers_list").append('<option id="'+i+'" name="servler_list" '+ 
						'value="'+i+'">'+data.servers[i]+'</option>');
			}
			$('#servers_list').on('change', function() {
				$("#server_props").empty();
				getServerProps();
			});
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			$("#servers_list").append('Error: ' + errorMessage);
		}
			});
}

function getServerProps(){
	$.ajax('./data/server_props.json',
			{
		dataType: 'json', // type of response data
		timeout: 500,     // timeout milliseconds
		success: function (data, status, xhr) {   // success callback function
			console.log(data.serverProps);
			for(let i=0;i<data.serverProps.length;i++){
				$("#server_props").append('<td><label>'+data.serverProps[i]+':</label> <input type="text" class="form-control"></td>');
			}
			$("#submit").remove(); $("#server_props_display").children("br").remove();
			$("#server_props_display").append('<br><button id="submit" type="button" class="form-group btn btn-success form-control">Submit</button>');
			$('#submit').on('click', function() {
				printResults();
			});
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			$("#server_props").append('Error: ' + errorMessage);
		}
			});
}

function printResults(){
	$.ajax('./data/results.json',
			{
		dataType: 'json', // type of response data
		timeout: 500,     // timeout milliseconds
		success: function (data, status, xhr) {   // success callback function
			$("#display_output").empty();
			$("#display_output").append('<p>'+JSON.stringify(data, undefined, 2)+'</p>');
		},
		error: function (jqXhr, textStatus, errorMessage) { // error callback 
			$("#servers_list").append('Error: ' + errorMessage);
		}
			});
}
