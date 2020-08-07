(function ($) {
	
	
	jQuery(window).on('load',function(){
		if(jQuery('#US_Positive').length > 0){ getUSWholeData(); }
		if(jQuery('#CountryDataOwl').length > 0){ getCountryData(); }
		if(jQuery('#CountryStatsDataTable').length > 0){ getCountryStatsDataTable(); }
		if(jQuery('#TopCountryStats').length > 0){ getCountryTopStats(); }
		if(jQuery('.corona-update-in-tab').length > 0){ getCoronaUpdateInTabs(); }
		if(jQuery('.country-select-box').length > 0){ getCountrySelectBox(); }
	});

	jQuery(document).on('change','#CoronaUpdateByCountry',function(){
		getCoronaUpdateByCountry(jQuery(this).val());
	});
	
})(jQuery);;
	
	function getFormattedDate(timestamp)
	{
		var formatted_date;
		var date = new Date(timestamp);
		monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		formatted_date =  monthNames[date.getMonth()] + " " + date.getDate()  + ", " + date.getFullYear();
		return formatted_date;
	}
	
	function getUSWholeData()
	{
		var action_url = 'script/covid.html'; 
		jQuery.ajax({
            method: 'POST',
            url: action_url,
            dataType: 'json',
            data: {data:'US_Complete'},
			beforeSend : function ( xhr ) {
			},
            success:function(response){
				if(response.status = 1)
				{
					jQuery('#US_Positive').text(response.positive);
					jQuery('#US_Death').text(response.death);
					jQuery('#US_Recovered').text(response.recovered);
				}else{
					alert(response.msg);
				}
				
            },
			error : function(response){
				alert('Something is wrong, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong, Please wait.');
			},
		});
	}

	function getCountryData()
	{
		var action_url = 'script/covid.html'; 
		jQuery.ajax({
            method: 'POST',
            url: action_url,
            dataType: 'json',
            data: {data:'Countries_Data'},
			beforeSend : function ( xhr ) {
			},
            success:function(response){
				if(response.status = 1)
				{
				jQuery.each(response.data, function(country_code, country_data) {
					if(jQuery("#CountryDataOwl [data-country-code='"+country_code+"']").length > 0)
					{
					jQuery("#CountryDataOwl [data-country-code='"+country_code+"'] .dz-confirmed").text(country_data.confirmed);
					jQuery("#CountryDataOwl [data-country-code='"+country_code+"'] .dz-death").text(country_data.death);
					jQuery("#CountryDataOwl [data-country-code='"+country_code+"'] .dz-recovered").text(country_data.recovered);
					}
				});
				}else{
					alert(response.msg);
				}
					
            },
			error : function(response){
				alert('Something is wrong, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong, Please wait.');
			},
		});
	}

	function getCountryStatsDataTable()
	{
		jQuery.ajax({
            method: 'GET',
            url: 'https://corona.lmao.ninja/v2/countries',
            dataType: 'json',
            success:function(response){
				var dataSet = [];
				var serial_no = 0;
				jQuery.each(response, function(index, country_data) {
					var rowValues = {};
					//rowValues[0] = 0;
					/*rowValues[0] = ++serial_no;
					rowValues[1] = '<img src="'+country_data.countryInfo.flag+'" width="30">';
					rowValues[2] = country_data.country;
					rowValues[3] = country_data.cases;
					rowValues[4] = country_data.todayCases;
					rowValues[5] = country_data.deaths;
					rowValues[6] = country_data.todayDeaths;
					rowValues[7] = country_data.recovered;
					rowValues[8] = country_data.active;
					rowValues[9] = country_data.critical;
					rowValues[10] = country_data.tests;*/
					rowValues[0] = '<img src="'+country_data.countryInfo.flag+'" width="30">';
					rowValues[1] = country_data.country;
					rowValues[2] = country_data.cases;
					rowValues[3] = country_data.todayCases;
					rowValues[4] = country_data.deaths;
					rowValues[5] = country_data.todayDeaths;
					rowValues[6] = country_data.recovered;
					rowValues[7] = country_data.active;
					rowValues[8] = country_data.critical;
					rowValues[9] = country_data.tests;
					dataSet.push(rowValues);
				});
				
				var stats_table = $('#CountryStatsDataTable');
		
				$('#CountryStatsDataTable').DataTable({
								data: dataSet,
								columns: [
									/*{ title: "Serial",
									   render: function (data, type, row, meta) {
										 return meta.row + meta.settings._iDisplayStart + 1;
										}  	
									},*/
									{ title: "Flag" },
									{ title: "Country" },
									{ title: "Cases" },
									{ title: "New Cases" },
									{ title: "Deaths" },
									{ title: "New Deaths" },
									{ title: "Recoverd" },
									{ title: "Active" },
									{ title: "Critical" },
									{ title: "Tested" },
								],
								order: [[ 2, 'desc' ]],
							});
				/*
				For Serial Numbers
				var s_no = 0;			
				$('#CountryStatsDataTable').on( 'order.dt search.dt', function () {
					 s_no = 0;
					 $('#CountryStatsDataTable tbody tr').each(function(){
						 s_no = s_no+1;
						 $(this).find('td:first').text(s_no);
					 });
				});
				
				$('#CountryStatsDataTable').on( 'page.dt', function (e) {
					//console.log(e.page);
					//var info = stats_table.info();
					//console.log(stats_table.page.info());
					//$('#pageInfo').html( 'Showing page: '+info.page+' of '+info.pages );
				});
				*/
					
            },
			error : function(response){
				alert('Something is wrong 1, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong 1, Please wait.');
			},
		});
	}	
	
	function getCountryTopStats()
	{
		var action_url = 'script/covid.html'; 
		jQuery.ajax({
            method: 'POST',
            url: action_url,
            dataType: 'json',
            data: {data:'Countries_Top_Stats'},
			success:function(response){
				if(response.status = 1)
				{
					var top_cases = today_cases = top_deaths = today_deaths = top_active = top_recover = '';
					
					/* Top 10 Country Confirmed Cases */
					jQuery.each(response.data.top_cases, function(key, value) 
					{
					
						top_cases += '<div class="item"><img src="'+value.countryInfo.flag+'" width="30"><span> '+value.country+'</span><span> '+value.cases+'</span></div>';
					});
					
					/* Top 10 Country Today Cases */
					jQuery.each(response.data.today_cases, function(key, value) 
					{
					
						today_cases += '<div class="item"><img src="'+value.countryInfo.flag+'" width="30"><span> '+value.country+'</span><span> '+value.todayCases+'</span></div>';
					});
					
					/* Top 10 Country Top Deaths Cases */
					jQuery.each(response.data.top_deaths, function(key, value) 
					{
					
						top_deaths += '<div class="item"><img src="'+value.countryInfo.flag+'" width="30"><span> '+value.country+'</span><span> '+value.deaths+'</span></div>';
					});
					
					/* Top 10 Country Today Deaths Cases */
					jQuery.each(response.data.today_deaths, function(key, value) 
					{
					
						today_deaths += '<div class="item"><img src="'+value.countryInfo.flag+'" width="30"><span> '+value.country+'</span><span> '+value.todayDeaths+'</span></div>';
					});
					
					/* Top 10 Country Active Cases */
					jQuery.each(response.data.top_active, function(key, value) 
					{
					
						top_active += '<div class="item"><img src="'+value.countryInfo.flag+'" width="30"><span> '+value.country+'</span><span> '+value.active+'</span></div>';
					});
					
					/* Top 10 Country Recover Cases */
					jQuery.each(response.data.top_recover, function(key, value) 
					{
					
						top_recover += '<div class="item"><img src="'+value.countryInfo.flag+'" width="30"><span> '+value.country+'</span><span> '+value.recovered+'</span></div>';
					});
					
					jQuery('#CountryTopCases').append(top_cases);
					jQuery('#CountryTodayCases').append(today_cases);
					jQuery('#CountryTopDeaths').append(top_deaths);
					jQuery('#CountryTodayDeaths').append(today_deaths);
					jQuery('#CountryTopActive').append(top_active);
					jQuery('#CountryTopRecover').append(top_recover);
					
				}else{
					alert(response.msg);
				}
					
            },
			error : function(response){
				alert('Something is wrong 2, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong 2, Please wait.');
			},
		});
	}
	
	
	function getCoronaUpdateInTabs()
	{
		var action_url = 'script/covid.html'; 
		jQuery.ajax({
            method: 'POST',
            url: action_url,
            dataType: 'json',
            data: {data:'Countries_Corona_Info'},
			success:function(response){
				if(response.status = 1)
				{
					jQuery.each(response.data, function(key, value) {
						if(jQuery(".corona-update-in-tab [data-country-code='"+value.countryInfo.iso2+"']").length > 0)
						{
							//tab_content_data = '<div class="item float-left m-r50"><div class="updated-time">Updated: '+getFormattedDate(value.updated)+'<div><div><i class="fa fa-user"></i></div><div><h5>Total Cases</h5><h3>'+value.cases+'</h3></div></div><div class="item float-left m-r50"><div><i class="fa fa-user"></i></div><div><h5>Total Deaths</h5><h3>'+value.deaths+'</h3></div></div><div class="item float-left m-r50"><div><i class="fa fa-user"></i></div><div><h5>Total Recovered</h5><h3>'+value.recovered+'</h3></div></div><div class="item float-left m-r50"><div><i class="fa fa-user"></i></div><div><h5>Total Active</h5><h3>'+value.active+'</h3></div></div><div class="item float-left m-r50"><div><i class="fa fa-user"></i></div><div><h5>New Cases</h5><h3>'+value.todayCases+'</h3></div></div><div class="item float-left m-r50"><div><i class="fa fa-user"></i></div><div><h5>New Deaths</h5><h3>'+value.todayDeaths+'</h3></div></div>';
							
							
							tab_content_data = '<div class="covid-world-widget"><div class="updated-time row"><div class="col-md-4 col-lg-3 col-6"><div class="covid-widget-1 defult-bx"><div class="icon"><img src="images/icons/covid-defult.svg" alt=""/></i></div><div class="info"> <h5>Total Cases</h5><h3>'+value.cases+'</h3></div></div></div><div class="col-md-4 col-lg-3 col-6"><div class="covid-widget-1 red-bx"><div class="icon"><img src="images/icons/covid-red.svg" alt=""/></div><div class="info"><h5>Total Deaths</h5><h3>'+value.deaths+'</h3></div></div></div><div class="col-md-4 col-lg-3 col-6"><div class="covid-widget-1 green-bx"><div class="icon"><img src="images/icons/covid-green.svg" alt=""/></div><div class="info"><h5>Total Recovered</h5><h3>'+value.recovered+'</h3></div></div></div><div class="col-md-4 col-lg-3 col-6"><div class="covid-widget-1 blue-bx"><div class="icon"><img src="images/icons/covid-blue.svg" alt=""/></div><div class="info"><h5>Total Active</h5><h3>'+value.active+'</h3></div></div></div><div class="col-md-4 col-lg-3 col-6"><div class="covid-widget-1 orange-bx"><div class="icon"><img src="images/icons/covid-orange.svg" alt=""/></div><div class="info"><h5>New Cases</h5><h3>'+value.todayCases+'</h3></div></div></div><div class="col-md-4 col-lg-3 col-6"><div class="covid-widget-1 redark-bx"><div class="icon"><img src="images/icons/covid-redark.svg" alt=""/></div><div class="info"><h5>New Deaths</h5><h3>'+value.todayDeaths+'</h3></div></div></div>';
							
							
							
							jQuery(".corona-update-in-tab [data-country-code='"+value.countryInfo.iso2+"']").html(tab_content_data);
						}
					});
				}else{
					alert(response.msg);
				}
			},
			error : function(response){
				alert('Something is wrong 3, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong 3, Please wait.');
			},
		});
	}
	
	

	function getCountrySelectBox()
	{
		var select_box = '';
		jQuery.ajax({
            method: 'GET',
            //url: 'https://api.covid19api.com/countries',
            url: 'https://corona.lmao.ninja/v2/countries',
            dataType: 'json',
            success:function(response){
				select_box = '<select class="country-picker" id="CoronaUpdateByCountry">';
				jQuery.each(response, function(key, value) {
					select_box += '<option value="'+value.countryInfo.iso2+'">'+value.country+'</option>';
				});
				select_box += '</select>';
				jQuery('.country-select-box').html(select_box);
				jQuery('.country-picker').niceSelect();
				getCoronaUpdateByCountry('US');
			},
			error : function(response){
				alert('Something is wrong, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong, Please wait.');
			},
		});
	}
	
	
	
	function getCoronaUpdateByCountry(country_code)
	{
		
		var action_url = 'script/covid.html'; 
		jQuery.ajax({
			method: 'POST',
			url: action_url,
			dataType: 'json',
			data: {data:'Countries_Corona_Info',country_code:country_code},
			success:function(response){
				if(response.status = 1)
				{
					
					if(jQuery("#CoronaUpdateByCountryBox").length > 0)
					{
						jQuery('#CoronaWorldMapStatUpdateOn').html('Updated: '+getFormattedDate(response.data.updated));
						
						tab_content_data = '<div class="covid-world-widget"><div class="updated-time row"><div class="col-md-4 col-lg-6 col-6"><div class="covid-widget-1 defult-bx"><div class="icon"><img src="images/icons/covid-defult.svg" alt=""/></i></div><div class="info"> <h5>Total Cases</h5><h3>'+response.data.cases+'</h3></div></div></div><div class="col-md-4 col-lg-6 col-6"><div class="covid-widget-1 red-bx"><div class="icon"><img src="images/icons/covid-red.svg" alt=""/></div><div class="info"><h5>Total Deaths</h5><h3>'+response.data.deaths+'</h3></div></div></div><div class="col-md-4 col-lg-6 col-6"><div class="covid-widget-1 green-bx"><div class="icon"><img src="images/icons/covid-green.svg" alt=""/></div><div class="info"><h5>Total Recovered</h5><h3>'+response.data.recovered+'</h3></div></div></div><div class="col-md-4 col-lg-6 col-6"><div class="covid-widget-1 blue-bx"><div class="icon"><img src="images/icons/covid-blue.svg" alt=""/></div><div class="info"><h5>Total Active</h5><h3>'+response.data.active+'</h3></div></div></div><div class="col-md-4 col-lg-6 col-6"><div class="covid-widget-1 orange-bx"><div class="icon"><img src="images/icons/covid-orange.svg" alt=""/></div><div class="info"><h5>New Cases</h5><h3>'+response.data.todayCases+'</h3></div></div></div><div class="col-md-4 col-lg-6 col-6"><div class="covid-widget-1 redark-bx"><div class="icon"><img src="images/icons/covid-redark.svg" alt=""/></div><div class="info"><h5>New Deaths</h5><h3>'+response.data.todayDeaths+'</h3></div></div></div>';
						
						//tab_content_data += '<br><div id="canvas-holder" class="col-md-12" style="width:100%"><canvas id="chart-area"></canvas></div>';
						
						jQuery("#CoronaUpdateByCountryBox").html(tab_content_data);
						getGraphicalInfo(response.data.cases,response.data.deaths,response.data.active,response.data.recovered);
					}
					
				}else{
					alert(response.msg);
				}
			},
			error : function(response){
				alert('Something is wrong 4, Please wait.');
			},
			fail : function(response){				
				alert('Something is wrong 4, Please wait.');
			},
		});
	}
	
	function getGraphicalInfo(cases,deaths,active,recover)
	{
		var config = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
						cases,
						deaths,
						active,
						recover,
					],
					backgroundColor: [
						window.chartColors.red,
						window.chartColors.dark_red,
						window.chartColors.blue,
						window.chartColors.green,
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Total Cases',
					'Total Deaths',
					'Total Active',
					'Total Recovered',
				]
			},
			options: {
				responsive: true
			}
		};
			
		/*
		window.onload = function() {
			var ctx = document.getElementById('chart-area').getContext('2d');
			window.myPie = new Chart(ctx, config);
		};*/
		
	}
	
