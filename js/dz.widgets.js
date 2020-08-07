$(function () {
	$.ajax({
        type: 'GET',
        url: 'https://corona.lmao.ninja/v2/countries',
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, item) {
                
				$flag = '<img src="' + item.countryInfo.flag + '" width="50" />';
				
				widget_body = '<div class="col-xl-6 col-lg-12 col-md-12"><div class="country-widget widget-area"> <div class="widget-head"> <h4 class="dez-title"><span >'+ $flag +'</span>'+ item.country+'</h4> </div><div class="widget-body" id="widget-body"> <div class="row"> <div class="col text-primary info"> <span>Cases</span> <h4>'+ item.cases +'</h4> </div><div class="col text-danger info"> <span>Death</span> <h4>'+item.deaths+'</h4> </div><div class="col text-success info"> <span>Recovered</span> <h4 >'+item.recovered+'</h4> </div><div class="col text-danger info"> <span>Today Death</span> <h4 >'+item.todayDeaths+'</h4> </div><div class="col text-secondary info"> <span>Today Cases</span> <h4 >'+item.todayCases+'</h4> </div><div class="col text-warning info"> <span>Critical</span><h4>'+item.critical+'</h4> </div><div class="col text-info info"> <span>Active Cases</span> <h4>'+item.active+'</h4> </div></div></div></div></div>';
				jQuery('#widgetDiv').append(widget_body);

            });
			
			
        }
    });

})

