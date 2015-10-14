$(function(){

	$(function(){
		$(".container1").mapael({
			map : {
				// Set the name of the map to display
				name : "france_departments",
			}
		});
	});

	$(".container2").mapael({
		map : {
			name : "france_departments"
			
			// Set default plots and areas style
			, defaultPlot : {
				attrs : {
					fill: "#004a9b"
					, opacity : 0.6
				}
				, attrsHover : {
					opacity : 1
				}
				, text : {
					attrs : {
						fill : "#505444"
					}
					, attrsHover : {
						fill : "#000"
					}
				}
			}
			, defaultArea: {
				attrs : {
					fill : "#f4f4e8"
					, stroke: "#ced8d0"
				}
				, attrsHover : {
					fill: "#a4e100"
				}
				, text : {
					attrs : {
						fill : "#505444"
					}
					, attrsHover : {
						fill : "#000"
					}
				}
			}
		},
		
		// Customize some areas of the map
		areas: {
			"department-56" : {
				text : {content : "Morbihan", attrs : {"font-size" : 10}}, 
				tooltip: {content : "<b>Morbihan</b> <br /> Bretagne"}
			},
			"department-21" : {
				attrs : {
					fill : "#488402"
				}
				, attrsHover : {
					fill: "#a4e100"
				}
			}
		},
		
		// Add some plots on the map
		plots : {
			// Image plot
			'paris' : {
				type : "image",
				url: "http://www.vincentbroute.fr/mapael/marker.png",
				width: 12,
				height: 40,
				latitude : 48.86, 
				longitude: 2.3444,
				attrs : {
					opacity : 1
				},
				attrsHover: {
					transform : "s1.5"
				}
			},
			// Circle plot
			'lyon' : {
				type: "circle",
				size:50,
				latitude :45.758888888889, 
				longitude: 4.8413888888889, 
				tooltip: {content : "<span style=\"font-weight:bold;\">City :</span> Lyon <br /> Rhône-Alpes"},
				text : {content : "Lyon"}
			},
			// Square plot
			'rennes' : {
				type :"square",
				size :20,
				latitude : 48.114166666667, 
				longitude: -1.6808333333333, 
				tooltip: {content : "<span style=\"font-weight:bold;\">City :</span> Rennes <br /> Bretagne"},
				text : {content : "Rennes"}
			},
			// Plot positioned by x and y instead of latitude, longitude
			'myplot' : {
				x : 300, 
				y: 200,
				text : {
					content : "My plot"
					, position: "bottom"
					, attrs : {"font-size" : 10, fill : "#004a9b", opacity: 0.6}
					, attrsHover : {fill : "#004a9b", opacity: 1}
				},
			},
			'Bordeaux' : {
				type: "circle",
				size:30,
				latitude :44.834763, 
				longitude: -0.580991,
                attrs : {
                    opacity : 1
                },
				text : {
                    content : "33",
                    position : "inner", 
                    attrs : {
						"font-size" : 16
                        , "font-weight" : "bold"
						, fill : "#fff"
					}, 
                    attrsHover : {
						"font-size" : 16
                        , "font-weight" : "bold"
						, fill : "#fff"
					}
                }
			}
		}
	});
	
	$(".container3").mapael({
		map : {
			name : "world_countries",
			defaultArea: {
				attrs : {
					fill : "#f4f4e8"
					, stroke: "#ced8d0"
				}
			}
            // Default attributes can be set for all links
            , defaultLink: {
                factor : 0.4
                , attrsHover : {
                    stroke: "#a4e100"
                }
            }
            , defaultPlot : {
                text : {
                    attrs : {
                        fill:"#000"
                    }, 
                    attrsHover : {
                        fill:"#000"
                    }
                }
            }
		},
		plots : {
			'paris' : {
				latitude :48.86, 
				longitude :2.3444, 
				tooltip: {content : "Paris<br />Population: 500000000"}
			},
			'newyork' : {
				latitude :40.667, 
				longitude :-73.833, 
				tooltip: {content : "New york<br />Population: 200001"}
			},
            'sanfrancisco' : {
				latitude: 37.792032,
				longitude: -122.394613,
				tooltip: {content : "San Francisco"}
			},
			'brasilia' : {
				latitude :-15.781682, 
				longitude :-47.924195, 
				tooltip: {content : "Brasilia<br />Population: 200000001"}
			},
			'roma': {
				latitude :41.827637, 
				longitude :12.462732, 
				tooltip: {content : "Roma"}
			},
            'miami' : {
				latitude: 25.789125,
				longitude:  -80.205674,
				tooltip: {content : "Miami"}
			},
            
            // Size=0 in order to make plots invisible
			'tokyo': {
				latitude :35.687418, 
				longitude :139.692306, 
				size:0,
                text : {content : 'Tokyo'}
			},
			'sydney' : {
				latitude :-33.917, 
				longitude :151.167,
                size:0,
                text : {content : 'Sydney'}
			},
			'plot1': {
                latitude :22.906561, 
				longitude :86.840170, 
                size:0,
                text : {content : 'Plot1', position : 'left', margin:5}
			},
			'plot2': {
                latitude :-0.390553, 
				longitude :115.586762, 
                size:0,
                text : {content : 'Plot2'}
			},
			'plot3': {
                latitude :44.065626, 
				longitude :94.576079, 
                size:0,
                text : {content : 'Plot3'}
			}
		},
        // Links allow you to connect plots between them
        links: {
            'parisnewyork' : {
                // The curve can be inverted by setting a negative factor
                factor : -0.3
                , between : ['paris', 'newyork']
                , attrs : {
                    "stroke-width" : 2
                }
                , tooltip: {content : "Paris - New-York"}
            }
            , 'parissanfrancisco' : {
                factor : -0.5
                , between : ['paris', 'sanfrancisco']
                , attrs : {
                    "stroke-width" : 4
                }
                , tooltip: {content : "Paris - San - Francisco"}
            }
            , 'parisbrasilia' : {
                factor : -0.8
                , between : ['paris', 'brasilia']
                , attrs : {
                    "stroke-width" : 1
                }
                , tooltip: {content : "Paris - Brasilia"}
            }
            , 'romamiami' : {
                factor : 0.2
                , between : ['roma', 'miami']
                , attrs : {
                    "stroke-width" : 4
                }
                , tooltip: {content : "Roma - Miami"}
            }
            , 'sydneyplot1' : {
                factor : -0.2
                , between : ['sydney', 'plot1']
                , attrs : {
                    stroke: "#a4e100",
                    "stroke-width" : 3,
                    "stroke-linecap":"round",
                    opacity:0.6
                }
                , tooltip: {content : "Sydney - Plot1"}
            }
            , 'sydneyplot2' : {
                factor : -0.1
                , between : ['sydney', 'plot2']
                , attrs : {
                    stroke: "#a4e100",
                    "stroke-width" : 8,
                    "stroke-linecap":"round",
                    opacity:0.6
                }
                , tooltip: {content : "Sydney - Plot2"}
            }
            , 'sydneyplot3' : {
                factor : 0.2
                , between : ['sydney', 'plot3']
                , attrs : {
                    stroke: "#a4e100",
                    "stroke-width" : 4,
                    "stroke-linecap":"round",
                    opacity:0.6
                }
                , tooltip: {content : "Sydney - Plot3"}
            }
            , 'sydneytokyo' : {
                factor : 0.2
                , between : ['sydney', 'tokyo']
                , attrs : {
                    stroke: "#a4e100",
                    "stroke-width" : 6,
                    "stroke-linecap":"round",
                    opacity:0.6
                }
                , tooltip: {content : "Sydney - Plot2"}
            }
        }
	});
	
	$(".container4").mapael({
		map : {
			name : "france_departments"
            // Enable zoom on the map
            , zoom : {
                enabled : true
            }
			// Set default plots and areas style
			, defaultPlot : {
				attrs : {
					fill: "#004a9b"
					, opacity : 0.6
				}
				, attrsHover : {
					opacity : 1
				}
				, text : {
					attrs : {
						fill : "#505444"
					}
					, attrsHover : {
						fill : "#000"
					}
				}
			}
			, defaultArea: {
				attrs : {
					fill : "#f4f4e8"
					, stroke: "#ced8d0"
				}
				, attrsHover : {
					fill: "#a4e100"
				}
				, text : {
					attrs : {
						fill : "#505444"
					}
					, attrsHover : {
						fill : "#000"
					}
				}
			}
		},
		
		// Customize some areas of the map
		areas: {
			"department-56" : {
				text : {content : "Morbihan", attrs : {"font-size" : 10}}, 
				tooltip: {content : "Morbihan (56)"}
			},
			"department-21" : {
				attrs : {
					fill : "#488402"
				}
				, attrsHover : {
					fill: "#a4e100"
				}
			}
		},
		
		// Add some plots on the map
		plots : {
			// Image plot
			'paris' : {
				type : "image",
				url: "http://www.vincentbroute.fr/mapael/marker.png",
				width: 12,
				height: 40,
				latitude : 48.86, 
				longitude: 2.3444,
				attrs : {
					opacity : 1
				},
				attrsHover: {
					transform : "s1.5"
				}
			},
			// Circle plot
			'lyon' : {
				type: "circle",
				size:50,
				latitude :45.758888888889, 
				longitude: 4.8413888888889, 
				value : 700000, 
				tooltip: {content : "<span style=\"font-weight:bold;\">City :</span> Lyon"},
				text : {content : "Lyon"}
			},
			// Square plot
			'rennes' : {
				type :"square",
				size :20,
				latitude : 48.114166666667, 
				longitude: -1.6808333333333, 
				tooltip: {content : "<span style=\"font-weight:bold;\">City :</span> Rennes"},
				text : {content : "Rennes"}
			},
			// Plot positioned by x and y instead of latitude, longitude
			'myplot' : {
				x : 300, 
				y: 200,
				text : {
					content : "My plot"
					, position: "bottom"
					, attrs : {"font-size" : 10, fill : "#004a9b", opacity: 0.6}
					, attrsHover : {fill : "#004a9b", opacity: 1}
				},
			}
		}
	});

	$('.mapaelBlock').mapael({
		map : {
			name : "world_countries",
			zoom : {
                enabled : true
            },
			defaultPlot : {
				attrs : {
					fill: "#ff0000",
					opacity : 0.6
				},
				attrsHover : {
					opacity : 1
				},
				text : {
					attrs : {
						fill : "#cccccc"
					},
					attrsHover : {
						fill : "#000"
					}
				}
			},
			defaultArea: {
				attrs : {
					fill : "gray",
					stroke: "gray"
				},
				attrsHover : {
					fill: "green"
				},
				text : {
					attrs : {
						fill : "red"
					}
					, attrsHover : {
						fill : "blue"
					}
				}
			}
		},
		plots : plotsSome,
		areas: areasSome
	});
	
});