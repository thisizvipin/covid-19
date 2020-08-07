function buildMapDataApi()
{
	var $DZCountryName = $('#DZCountryName');
    var $DZCountryFlag = $('#DZCountryFlag');
    var $DZCountryCases = $('#DZCountryCases');
    var $DZCountryActive = $('#DZCountryActive');
    var $DZCountryCritical = $('#DZCountryCritical');
    var $DZCountryDeaths = $('#DZCountryDeaths');
    var $DZCountryRecovered = $('#DZCountryRecovered');
    var $DZCountryTodayCases = $('#DZCountryTodayCases');
    var $DZCountryTodayDeaths = $('#DZCountryTodayDeaths');
    var $DZCountryCasesPerMillion = $('#DZCountryCasesPerMillion');
    var $DZCountryDeathsPerMillion = $('#DZCountryDeathsPerMillion');


    $.ajax({
        type: 'GET',
        url: 'https://corona.lmao.ninja/v2/countries',
        dataType: "json",
        success: function (data) {

            $.each(data, function (i, C) {

                ApiCountryCode = C.countryInfo.iso2;
                if (ApiCountryCode == 'US') {
                    $DZCountryName.html(C.country)
                    $DZCountryFlag.html('<img src="' + C.countryInfo.flag + '" class="img-fluid mr-3" width="70" />')
                    $DZCountryCases.html(C.cases)
                    $DZCountryActive.html(C.active)
                    $DZCountryCritical.html(C.critical)
                    $DZCountryDeaths.html(C.deaths)
                    $DZCountryRecovered.html(C.recovered)
                    $DZCountryTodayCases.html(C.todayCases)
                    $DZCountryTodayDeaths.html(C.todayDeaths)
                    $DZCountryCasesPerMillion.html(C.casesPerOneMillion)
                    $DZCountryDeathsPerMillion.html(C.deathsPerOneMillion)
                }
            })

            sample_data = {};

            $.each(data, function (i, incr) {
                var objName = incr.countryInfo.iso2;
                var objValue = incr.cases;
                sample_data[objName] = objValue;

            });

            const DZCountryData = {};

            for (const [key, value] of Object.entries(sample_data)) {
                DZCountryData[key.toLowerCase()] = value;
            }

            WorldMap(DZCountryData , data);

        }
    });
}


function WorldMap(DZCountryData , data){
	
	var $DZCountryName = $('#DZCountryName');
    var $DZCountryFlag = $('#DZCountryFlag');
    var $DZCountryCases = $('#DZCountryCases');
    var $DZCountryActive = $('#DZCountryActive');
    var $DZCountryCritical = $('#DZCountryCritical');
    var $DZCountryDeaths = $('#DZCountryDeaths');
    var $DZCountryRecovered = $('#DZCountryRecovered');
    var $DZCountryTodayCases = $('#DZCountryTodayCases');
    var $DZCountryTodayDeaths = $('#DZCountryTodayDeaths');
    var $DZCountryCasesPerMillion = $('#DZCountryCasesPerMillion');
    var $DZCountryDeathsPerMillion = $('#DZCountryDeathsPerMillion');	
	
	$('#DZContinentMap').vectorMap({
		map: 'world_en',
		backgroundColor: null,
		selectedRegions: "us",
		color: '#FFF',
		hoverOpacity: 0.7,
		selectedColor: '#ff0000',
		values: DZCountryData,
		scaleColors: ['#ff0000', '#000000'],
		normalizeFunction: 'polynomial',



		onRegionClick: function (event, code, region) {

			console.log(code);
			
			HtmlCountryCode = code.toUpperCase();
			$.each(data, function (i, C) {
				ApiCountryCode = C.countryInfo.iso2;

				if (HtmlCountryCode == ApiCountryCode) {
					$DZCountryName.html(C.country)
					$DZCountryFlag.html('<img src="' + C.countryInfo.flag + '" class="img-fluid mr-3" width="70" />')
					$DZCountryCases.html(C.cases)
					$DZCountryActive.html(C.active)
					$DZCountryCritical.html(C.critical)
					$DZCountryDeaths.html(C.deaths)
					$DZCountryRecovered.html(C.recovered)
					$DZCountryTodayCases.html(C.todayCases)
					$DZCountryTodayDeaths.html(C.todayDeaths)
					$DZCountryCasesPerMillion.html(C.casesPerOneMillion)
					$DZCountryDeathsPerMillion.html(C.deathsPerOneMillion)
				}
			})
		},

		onLabelShow: function (event, label, geography) {
			HtmlCountryCode = geography.toUpperCase();
			$.each(data, function (i, C) {
				ApiCountryCode = C.countryInfo.iso2;

				if (HtmlCountryCode == ApiCountryCode) {
					label.html('<span><img src="' + C.countryInfo.flag + '" width="25" class="mr-2 mb-1 " />' + C.country + '</span> Cases: ' + C.cases + '<br/> Death: ' + C.deaths + '<br/> Active: ' + C.active + '<br/> Recovered ' + C.recovered);
				}
			})
		},

	});
	
}




