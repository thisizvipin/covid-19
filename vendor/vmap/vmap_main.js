	/* Loader And Map */
	var loaded = false;
	var allCountrySummary = [];
	var totalInformation = {
	totalConfirmed: 0,
	totalDeaths: 0,
	totalRecovered: 0,
	newDeaths: 0,
	
	};

	const processAPIData = data => {
	allCountrySummary = data.Countries;

	allCountrySummary.forEach(country => {
	  totalInformation.totalConfirmed += country.TotalConfirmed;
	  totalInformation.totalDeaths += country.TotalDeaths;
	  totalInformation.totalRecovered += country.TotalRecovered;
	  totalInformation.newDeaths += country.NewDeaths;
	});
	};

	const showRegionResultText = result => {
	$("#region-new-confirmed").text(`Confirmed : ${result.NewConfirmed}`);
	$("#region-new-deaths").text(`Deaths : ${result.NewDeaths}`);
	$("#region-new-recovered").text(`Recovered : ${result.NewRecovered}`);
	$("#region-total-confirmed").text(
	  `Confirmed : ${result.TotalConfirmed}`
	);
	$("#region-total-deaths").text(`Deaths : ${result.TotalDeaths}`);
	$("#region-total-recovered").text(
	  `Recovered : ${result.TotalRecovered}`
	);
	};

	const removeLoaderAndShowMap = () => {
	$("#loader").hide();
	$("#VMAP_CoronaUpdates").append($("<div>").attr("id", "vmap"));
	$("#vmap").vectorMap({
	  map: "world_en",
	  enableZoom: true,
	  showTooltip: true,
	  onResize: function(element, width, height) {
		console.log("Map Size: " + width + "x" + height);
	  },
	  onRegionClick: function(element, code, region) {
		console.log(code);
		let result = allCountrySummary.find(item => {
		  return (
			item["Country"] === region ||
			item["Country"].toLowerCase() === code
		  );
		});
		console.log(result);
		if (result !== undefined) {
		  showRegionResultText(result);
		  $("#modal-title").text(region);
		  $("#alert-modal").modal("show");
		  fetchAndDisplay(result["Slug"]);
		}
	  }
	});
	};

	$(() => {
	axios
	  .get("https://api.covid19api.com/summary", null)
	  .then(res => {
		processAPIData(res.data);
		loaded = true;
		removeLoaderAndShowMap();
		//showStatistics();
		buildStatisticsList();
	  })
	  .catch(err => {
		//console.err(err);
	  });
	});
	/* Loader And Map END */
	
	/* Statistics */
	/*const buildStatisticsList = () => {
        return $("<ul>")
          .addClass("list-group mt-3 mb-2")
          .append(
            $("<li>")
              .addClass("list-group-item")
              .append(
                $("<h3>")
                  .addClass("text-center")
                  .text("Statistics")
              ),
            $("<li>")
              .addClass("list-group-item list-group-item-warning")
              .text(`Total Confirmed : ${totalInformation.totalConfirmed}`),
            $("<li>")
              .addClass("list-group-item list-group-item-danger")
              .text(`Total Deaths : ${totalInformation.totalDeaths}`),
            $("<li>")
              .addClass("list-group-item list-group-item-success")
              .text(`Total Recovered : ${totalInformation.totalRecovered}`)
          );
      }; */
	  
	  const buildStatisticsList = () => {
		var globalState = '<div class="col"><div class="icon-box"><div class="icon"><img src="images/icons/covid-defult.svg" alt=""/></div><div class="info"><h5>Total Confirmed</h5><h3>'+totalInformation.totalConfirmed+'</h3></div></div></div><div class="col"><div class="icon-box"><div class="icon"><img src="images/icons/covid-green.svg" alt=""/></div><div class="info"><h5>Total Recovered</h5><h3>'+totalInformation.totalRecovered+'</h3></div></div></div><div class="col"><div class="icon-box"><div class="icon"><img src="images/icons/covid-red.svg" alt=""/></div><div class="info"><h5>Total Deaths</h5><h3>'+totalInformation.totalDeaths+'</h3></div></div></div><div class="col"><div class="icon-box"><div class="icon"><img src="images/icons/covid-redark.svg" alt=""/></div><div class="info"><h5>New Deaths</h5><h3>'+totalInformation.newDeaths+'</h3></div></div></div><div class="col"><div class="icon-box"><div class="icon"><img src="images/icons/telephone.svg" alt=""/></div><div class="info"><h5>Help Line No.</h5><h3>198</h3></div></div></div>';
		
		jQuery('#globalStateRow').html(globalState);
		
		
		/*      .addClass("list-group-item list-group-item-warning")
			  .text(`Total Confirmed : ${totalInformation.totalConfirmed}`),
			$("<li>")
			  .addClass("list-group-item list-group-item-danger")
			  .text(`Total Deaths : ${totalInformation.totalDeaths}`),
			$("<li>")
			  .addClass("list-group-item list-group-item-success")
			  .text(`Total Recovered : ${totalInformation.totalRecovered}`)
		  ); */
	  };
	  
      const showStatistics = () => {
        let list = buildStatisticsList();
        let stat = $("<div>")
          .addClass("container-fluid mt-2 mb-5")
          .append(
            $("<div>")
              .addClass("row")
              .append(
                $("<div>")
                  .addClass("col-md-6")
                  .append(list),
                $("<div>")
                  .addClass("col-md-6")
                  .append($("<canvas>").attr("id", "total-stat-chart"))
              )
          );
        $("#VMAP_CoronaUpdates").append(stat);
        renderTotalStatChart(totalInformation);
      };
      const renderTotalStatChart = data => {
        var ctx = $("#total-stat-chart");
        var myChart = new Chart(ctx, {
          type: "horizontalBar",
          data: {
            labels: ["Total Confirmed", "Total Deaths", "Total Recovered"],
            datasets: [
              {
                label: "World Wide Statisticss",
                data: [
                  data.totalConfirmed,
                  data.totalDeaths,
                  data.totalRecovered
                ],
                backgroundColor: [
                  "rgba(255, 255, 0, 1)",
                  "rgba(255, 0, 0, 1)",
                  "rgba(0, 255, 0, 1)"
                ],
                borderColor: [],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      };
	/* Statistics END */

	/* Country Wise Stats On Graph In Model Box */
	const processRegionAPIData = objArr => {
        let list = [];
        Array.from(objArr).forEach(item => {
          list.push(item.Cases);
        });
        return list;
      };

      const processDateTimeFromAPIData = objArr => {
        let list = [];
        Array.from(objArr).forEach(item => {
          list.push(new Date(item.Date).getDate().toLocaleString());
        });
        return list;
      };

      const fetchAndDisplay = region => {
        let chart = generateRegionChart();
        fetchRegionData(region, chart);
      };

      const fetchRegionData = (region, chart) => {
        axios
          .get(
            `https://api.covid19api.com/total/country/${region}/status/confirmed`
          )
          .then(res => {
            chart.data.datasets[0].data = processRegionAPIData(res.data);
            chart.data.labels = processDateTimeFromAPIData(res.data);
            chart.update();
          })
          .catch(err => {
            console.error(err);
          });
        axios
          .get(
            `https://api.covid19api.com/total/country/${region}/status/deaths`
          )
          .then(res => {
            chart.data.datasets[1].data = processRegionAPIData(res.data);
            chart.update();
          })
          .catch(err => {
            console.error(err);
          });
        axios
          .get(
            `https://api.covid19api.com/total/country/${region}/status/recovered`
          )
          .then(res => {
            chart.data.datasets[2].data = processRegionAPIData(res.data);
            chart.update();
          })
          .catch(err => {
            console.error(err);
          });
      };

      const generateRegionChart = () => {
        $("#region-stat-chart").remove();
        $("#region-stat-chart-container").append(
          $("<canvas>").attr("id", "region-stat-chart")
        );
        var ctx = document.getElementById("region-stat-chart").getContext("2d");

        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: [
              {
                label: "Confirmed",
                data: [],
                backgroundColor: ["rgba(204, 204, 0, 0.4)"],
                borderColor: ["rgba(204, 204, 0, 1)"],
                borderWidth: 1
              },
              {
                label: "Deaths",
                data: [],
                backgroundColor: ["rgba(255, 0, 0, 0.4)"],
                borderColor: ["rgba(255, 0, 0, 1)"],
                borderWidth: 1
              },
              {
                label: "Recovered",
                data: [],
                backgroundColor: ["rgba(0, 255, 0, 0.4)"],
                borderColor: ["rgba(0, 255, 0, 1)"],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
        return myChart;
      };
	/* Country Wise Stats On Graph In Model Box END */	