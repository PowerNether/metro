let allStation = new Array;
let selStation = new Array;
let selLine = new Array;

let stationTextActive = '#fff'; // Цвет выбранной станции
let stationTextNotActive = '#999'; // Цвет не выбраной станции
let stationTextHover = '#5947B3';

let stationBgActive = '#5947B3'; // Цвет задника выбранной станции
let stationBgNotActive = '#FFDE5A'; // Цвет задника не выбраной станции

let sationMarkerActive = '#5947B3'; // Цвет маркера при выбранной станции
let sationMarkerNotActive = '#fff'; // Цвет маркера при выбранной станции

let lineLableTextActive = '900'; // Жирность текста выбраной линии метро
let lineLableTextNotActive = '400'; // Жирность текста не выбранной линии метро

let transitionSpeed = '0.35s'; // Скорость анимаций

// Get all id
function getAllStation() {
    let allElementsById = $('[data-metro-map-node-id]');
    for (let i = 0; i < allElementsById.length; i++) {
        const el = allElementsById[i];
        allStation.push($(el).attr('data-metro-map-node-id'));
    };
    // Array.from(allElementsById).forEach(el => {
    //     const tspans = $(el).children('text');
    //     let text = '';
    //     Array.from(tspans).forEach(elem => {
    //         let elemText = $(elem).children('tspan').text();
    //         if (!elemText.includes('-')) {
    //             elemText += ' '
    //         }
    //         text += elemText;
    //     })
    //     allStation.push(text.trim())
    // })
};

function getStationName(stationNameText) {
    let text = '';
    Array.from(stationNameText).forEach(el => {
        const tspans = $(el).children('tspan');
        Array.from(tspans).forEach(elem => {
            let elemText = $(elem).text();
            if (!elemText.includes('-')) {
                elemText += ' '
            }
            text += elemText;
        })
    })
    return text.trim();
}

function getSelectedStation(e) {
    let stationId = $(e.target).parents('.MetroMap_station_item').attr('data-metro-map-node-id'); // Получение id станции

    let targetStationText = $(e.target).parents('.MetroMap_station_item').children('.text'); // Выбор текста станции
    let targetStationBg = $(e.target).parents('.MetroMap_station_item').children('.MetroMap_bg'); // Выбор задника текста станции
    let stationMarker = $(`[data-station="${stationId}"]`); // Получение маркерка к станции

    let markerId = $(e.target).parents('.MetroMap_stop').attr('data-station'); // ПОлучение id станции привязаной к маркеру
    let targetMarkerParent = $(e.target).parents('.MetroMap_stop'); // Получение родителя маркера
    let markerStation = $(`[data-metro-map-node-id="${markerId}"]`); // Получение маркерка к станции

    let lineId = $(e.target).parents('.MetroMap_line_item').attr('data-metro-map-node-id'); // Получение id линни
    let targetLineLable = $(e.target).parents('.MetroMap_line_item').children('.MetroMap_label').children('text'); // Получение навзания линии
    let lineStation = $('[data-line]'); // Список станций по ID Линии

    let stationNameText = $(`[data-metro-map-node-id="${stationId}"]`).children('text');
    let stationNameMarked = $(`[data-metro-map-node-id="${markerId}"]`).children('text');

    if (allStation.indexOf(stationId) != -1) {
        let stationName = getStationName(stationNameText);

        if (selStation.indexOf(stationName) != -1) {
            targetStationText.css({
                fill: stationTextNotActive,
                transition: `all ${transitionSpeed}`,
            });
            targetStationBg.css({
                fill: stationBgNotActive,
                opacity: 0,
                transition: `all ${transitionSpeed}`,
            });
            stationMarker.css({
                stroke: sationMarkerNotActive,
                transition: `all ${transitionSpeed}`,
            });
            selStation.splice(selStation.indexOf(stationName), 1);
        } else {
            targetStationText.css({
                fill: stationTextActive,
                transition: `all ${transitionSpeed}`,
            });
            targetStationBg.css({
                fill: stationBgActive,
                opacity: 1,
                transition: `all ${transitionSpeed}`,
            });
            stationMarker.css({
                stroke: sationMarkerActive,
                transition: `all ${transitionSpeed}`,
            });

            selStation.push(stationName);
        };
    } else if (allStation.indexOf(lineId) != -1) {
        if (selLine.indexOf(lineId) != -1) {
            targetLineLable.css('font-weight', lineLableTextNotActive);

            for (let i = 0; i < lineStation.length; i++) {
                const el = lineStation[i];
                if ($(el).attr('data-line') == lineId) {
                    let elChildren = $(el).children();
                    for (let index = 0; index < elChildren.length; index++) {
                        const element = elChildren[index];
                        let elementId = $(element).attr('data-metro-map-node-id');

                        let stationNameLine = $(`[data-metro-map-node-id="${elementId}"]`).children('text');
                        let stationName = getStationName(stationNameLine);

                        $(element).children('.MetroMap_bg').css({
                            fill: stationBgNotActive,
                            opacity: 0,
                            transition: `all ${transitionSpeed}`,
                        });
                        $(`[data-station="${elementId}"]`).css({
                            stroke: sationMarkerNotActive,
                            transition: `all ${transitionSpeed}`,
                        });

                        if (selStation.indexOf(stationName) != -1) {
                            selStation.splice(selStation.indexOf(stationName), 1);
                        }
                    };

                    $(el).children().children('text').css({
                        fill: stationTextNotActive,
                        transition: `all ${transitionSpeed}`,
                    });
                };
            };

            selLine.splice(selLine.indexOf(lineId), 1)
        } else {
            targetLineLable.css('font-weight', lineLableTextActive);

            for (let i = 0; i < lineStation.length; i++) {
                const el = lineStation[i];
                if ($(el).attr('data-line') == lineId) {
                    let elChildren = $(el).children();

                    for (let index = 0; index < elChildren.length; index++) {
                        const element = elChildren[index];
                        let elementId = $(element).attr('data-metro-map-node-id');

                        let stationNameLine = $(`[data-metro-map-node-id="${elementId}"]`).children('text');
                        let stationName = getStationName(stationNameLine);

                        $(element).children('.MetroMap_bg').css({
                            fill: stationBgActive,
                            opacity: 1,
                            transition: `all ${transitionSpeed}`,
                        });
                        $(`[data-station="${elementId}"]`).css({
                            stroke: sationMarkerActive,
                            transition: `all ${transitionSpeed}`,
                        });
                        if (selStation.indexOf(stationName) == -1) {
                            selStation.push(stationName);
                        }
                    }

                    $(el).children().children('text').css({
                        fill: stationTextActive,
                        transition: `all ${transitionSpeed}`,
                    });
                };
            };

            selLine.push(lineId)
        };
    } else if (allStation.indexOf(markerId) != 1) {
        let stationName = getStationName(stationNameMarked);

        if (selStation.indexOf(stationName) != -1) {
            markerStation.children('.text').css({
                fill: stationTextNotActive,
                transition: `all ${transitionSpeed}`,
            });
            markerStation.children('.MetroMap_bg').css({
                fill: stationBgNotActive,
                opacity: 0,
                transition: `all ${transitionSpeed}`,
            });
            targetMarkerParent.css({
                stroke: sationMarkerNotActive,
                transition: `all ${transitionSpeed}`,
            });

            selStation.splice(selStation.indexOf(stationName), 1);
        } else if (typeof markerId != 'undefined') {
            markerStation.children('.text').css({
                fill: stationTextActive,
                transition: `all ${transitionSpeed}`,
            });
            markerStation.children('.MetroMap_bg').css({
                fill: stationBgActive,
                opacity: 1,
                transition: `all ${transitionSpeed}`,
            });
            targetMarkerParent.css({
                stroke: sationMarkerActive,
                transition: `all ${transitionSpeed}`,
            });
            
            selStation.push(stationName);
        };
    };
    console.log(selStation);
    console.log(JSON.parse(selStation));
};


$(window).on('load', function() {
    getAllStation();
    $('.MetroMap_line_item').css('cursor', 'pointer')
    $('.MetroMap_circle').css('cursor', 'pointer')
    $('.MetroMap_station_item').css('cursor', 'pointer')

    $('.MetroMap_line_item').hover(
        function() {
            let lineId = $(this).attr('data-metro-map-node-id');
            let lineStation = $('[data-line]');
            if (selStation.indexOf(lineId) == -1) {
                for (let index = 0; index < lineStation.length; index++) {
                    const el = lineStation[index];
                    if ($(el).attr('data-line') == lineId) {
                        let elChildren = $(el).children();
                        for (let index = 0; index < elChildren.length; index++) {
                            const element = elChildren[index];
                            let elementId = $(element).attr('data-metro-map-node-id');
                            if (selStation.indexOf($(element).attr('data-metro-map-node-id')) == -1) {
                                $(element).children('.text').css({
                                    fill: stationTextHover,
                                    transition: `all ${transitionSpeed}`,
                                });
                                $(`[data-station="${elementId}"]`).attr({
                                    'stroke-width': 2, 
                                }).css({
                                    transition: `all ${transitionSpeed}`,
                                });
                            }
                        };
                    }
                }
            }
        }, 
        function() {
            let lineId = $(this).attr('data-metro-map-node-id');
            let lineStation = $('[data-line]');
            if (selStation.indexOf(lineId) == -1) {
                for (let index = 0; index < lineStation.length; index++) {
                    const el = lineStation[index];
                    if ($(el).attr('data-line') == lineId) {
                        let elChildren = $(el).children();
                        for (let index = 0; index < elChildren.length; index++) {
                            const element = elChildren[index];
                            let elementId = $(element).attr('data-metro-map-node-id');
                            if (selStation.indexOf($(element).attr('data-metro-map-node-id')) == -1) {
                                $(element).children('.text').css({
                                    fill: stationTextNotActive,
                                    transition: `all ${transitionSpeed}`,
                                });
                                $(`[data-station="${elementId}"]`).attr({
                                    'stroke-width': 4, 
                                }).css({
                                    transition: `all ${transitionSpeed}`,
                                });
                            }
                        };
                    }
                }
            }
        }
    )
    $('.MetroMap_circle').hover(
        function() {
            let stationId = $(this).parent().attr('data-station')
            if (selStation.indexOf(stationId) == -1) {
                $(this).parent().attr({
                    'stroke-width': 2,
                }).css({
                    cursor: 'pointer',
                    transition: `all ${transitionSpeed}`,
                });
                $(`[data-metro-map-node-id=${stationId}]`).children('.text').css({
                    fill: stationTextHover,
                    transition: `all ${transitionSpeed}`,
                })
            }
        },
        function() {
            let stationId = $(this).parent().attr('data-station')
            if (selStation.indexOf(stationId) == -1) {
                $(this).parent().attr({
                    'stroke-width': 4, 
                }).css({
                    transition: `all ${transitionSpeed}`,
                });
                $(`[data-metro-map-node-id=${stationId}]`).children('.text').css({
                    fill: stationTextNotActive,
                    transition: `all ${transitionSpeed}`,
                })
            }
        }
    )
    $('.MetroMap_station_item').hover(
        function() {
            let stationId = $(this).attr('data-metro-map-node-id')
            if (selStation.indexOf(stationId) == -1) {
                $(this).children('.text').css({
                    fill: stationTextHover,
                    transition: `all ${transitionSpeed}`,
                })
                $(`[data-station=${stationId}]`).attr({
                    'stroke-width': 2,
                }).css({
                    transition: `all ${transitionSpeed}`,
                });
            }
        },
        function() {
            let stationId = $(this).attr('data-metro-map-node-id')
            if (selStation.indexOf(stationId) == -1) {
                $(this).children('.text').css({
                    fill: stationTextNotActive,
                    transition: `all ${transitionSpeed}`,
                })
                $(`[data-station=${stationId}]`).attr({
                    'stroke-width': 4,
                }).css({
                    transition: `all ${transitionSpeed}`,
                });
            }
        }
    )
});

$(window).on('click', function(e) {
    getSelectedStation(e);
});