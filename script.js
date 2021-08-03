let allStation = new Array;
let selStation = new Array;

let stationTextActive = '#333'; // Цвет выбранной станции
let stationTextNotActive = '#ddd'; // Цвет не выбраной станции

let sationMarkerActive = '#EBEBEB'; // Цвет маркера при выбранной станции
let sationMarkerNotActive = '#fff'; // Цвет маркера при выбранной станции

let lineLableTextActive = '900'; // Жирность текста выбраной линии метро
let lineLableTextNotActive = '400'; // Жирность текста не выбранной линии метро

let lineBackgroundActive = '#EBEBEB'; // Цвет выбраной линии метро
let lineBackgroundNotActive = '#fff'; // Цвет выбраной линии метро

// Get all id
function getAllStation() {
    let AllElemdentsById = $('[data-metro-map-node-id]');
    for (let i = 0; i < AllElemdentsById.length; i++) {
        const el = AllElemdentsById[i];
        allStation.push($(el).attr('data-metro-map-node-id'));
    };
};

function getSelectedStation(e) {
    let stationId = $(e.target).parents('.MetroMap_station_item').attr('data-metro-map-node-id'); // Получение id станции
    let targetStationText = $(e.target).parents('.MetroMap_station_item').children('.text'); // Выбор текста станции
    let stationMarker = $(`[data-station="${stationId}"]`); // Получение маркерка к станции

    let lineId = $(e.target).parents('.MetroMap_line_item').attr('data-metro-map-node-id'); // Получение id линни
    let targetLineLable = $(e.target).parents('.MetroMap_line_item').children('.MetroMap_label').children('text'); // Получение навзания линии
    let lineBackground = $(e.target).parents('.MetroMap_line_item').children('.MetroMap_line').children('path.MetroMap_bottom'); // Получение фона линии
    let lineStation = $('[data-line]'); // Список станций по ID Линии

    if (allStation.indexOf(stationId) != -1) {
        if (selStation.indexOf(stationId) != -1) {
            targetStationText.css('fill', stationTextNotActive);
            selStation.splice(selStation.indexOf(stationId), 1);
            stationMarker.css('stroke', sationMarkerNotActive);
        } else {
            targetStationText.css('fill', stationTextActive);
            selStation.push(stationId);
            stationMarker.css('stroke', sationMarkerActive);
        };
    } else if (allStation.indexOf(lineId) != -1) {
        if (selStation.indexOf(lineId) != -1) {
            targetLineLable.css('font-weight', lineLableTextNotActive);
            lineBackground.css('stroke', lineBackgroundNotActive);
            selStation.splice(selStation.indexOf(lineId), 1);
            for (let i = 0; i < lineStation.length; i++) {
                const el = lineStation[i];
                if ($(el).attr('data-line') == lineId) {
                    let elChildren = $(el).children();
                    for (let index = 0; index < elChildren.length; index++) {
                        const element = elChildren[index];
                        let elementId = $(element).attr('data-metro-map-node-id');
                        $(`[data-station="${elementId}"]`).css('stroke', sationMarkerNotActive);
                        selStation.splice(selStation.indexOf(elementId), 1);
                    };
                    $(el).children().children('text').css('fill', stationTextNotActive);
                };
            };
        } else {
            targetLineLable.css('font-weight', lineLableTextActive);
            lineBackground.css('stroke', lineBackgroundActive);
            for (let i = 0; i < lineStation.length; i++) {
                const el = lineStation[i];
                if ($(el).attr('data-line') == lineId) {
                    let elChildren = $(el).children();
                    for (let index = 0; index < elChildren.length; index++) {
                        const element = elChildren[index];
                        let elementId = $(element).attr('data-metro-map-node-id');
                        $(`[data-station="${elementId}"]`).css('stroke', sationMarkerActive);
                        selStation.push(elementId);
                    }
                    $(el).children().children('text').css('fill', stationTextActive);
                };
            };
            selStation.push(lineId);
        };
    };
    console.log(selStation);
};

$(window).on('load', function() {
    getAllStation();
});

$(window).on('click', function(e) {
    getSelectedStation(e);
});