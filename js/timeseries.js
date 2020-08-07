function timeseries(){
	
	$.ajax({
		type: 'GET',
		url: 'https://pomber.github.io/covid19/timeseries.json',
		dataType: "json",
		success: function (data) {
			var showCountries = [];
			showCountries[0] = {0:'US',1:'usa_timeseries'};
			showCountries[1] = {0:'Spain',1:'spain_timeseries'};
			showCountries[2] = {0:'Italy',1:'italy_timeseries'};
			showCountries[3] = {0:'China',1:'china_timeseries'};
			showCountries[4] = {0:'France',1:'france_timeseries'};
			showCountries[5] = {0:'Germany',1:'germany_timeseries'};
			
			$.each(showCountries, function (key, record) {
				var confirmed = data[record[0]].slice(Math.max(data[record[0]].length - 30, 1)).map(val => val.confirmed);
				var deaths = data[record[0]].slice(Math.max(data[record[0]].length - 30, 1)).map(val => val.deaths);
				var recovered = data[record[0]].slice(Math.max(data[record[0]].length - 30, 1)).map(val => val.recovered);
				var label = data[record[0]].slice(Math.max(data[record[0]].length - 30, 1)).map(function (val) {
					
					const cDate = new Date(val.date);
					const cDateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
					const [{ value: mo }, , { value: da }] = cDateTimeFormat.formatToParts(cDate);
					return da+'-'+mo;
				});
				
				/* Draw Graph */
				getCountryTimeSeriesGraph(record[1],label,confirmed,deaths,recovered);
			});
		}
	});
}

function getCountryTimeSeriesGraph(id,label,confirmed,deaths,recovered){
	var ctx = document.getElementById(id);
	ctx.height = 100;
	new Chart(ctx, {
		type: 'line',
		data: {
			labels: label,
			datasets: [
				{
					label: "Confirmed",
					borderColor: "#3639AE",
					borderWidth: "2",
					backgroundColor: "transparent",
					pointBackgroundColor: "#3639AE",
					data: confirmed
				},
				{
					label: "Death",
					borderColor: "#ff0000",
					borderWidth: "2",
					backgroundColor: "transparent",
					pointBackgroundColor: "#ff0000",
					data: deaths
				},
				{
					label: "Recovered",
					borderColor: "#82c519",
					borderWidth: "2",
					backgroundColor: "transparent",
					pointBackgroundColor: "#82c519",
					data: recovered
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: true,
				position: 'bottom',
				align : 'start',
				labels: {
					usePointStyle: true,
				},
			},
			tooltips: {
				mode: 'index',
				intersect: false
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					gridLines: {
						display: true,
						drawBorder: false,
						color: '#F7F8FC'
					},
					scaleLabel: {
						display: false,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					gridLines: {
						display: true,
						drawBorder: false,
						color: '#F7F8FC'
					},
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			},

		}
	});
}

