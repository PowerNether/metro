window.addEventListener('load', function () {
    let metro = document.querySelector('.metro') || null;

    if (metro !== null) {
        let selStationsId = [];
        let selLinesId = []
        let selStationsText = [];
        let isPanning = false;

        let around = false;
        let aroundLine = false;
        let initLine = false;
        let initStation = false;
        let drag = false;
        let click = false;

        let somethingArray = [];

        const svgContainer = document.querySelector('.metro__map') || null;
        const svgImage = document.querySelector('.metro__map svg') || null;

        // Выбор станции/линии
        if (svgImage !== null && svgContainer !== null) {
            let allLines = Array.from(svgImage.querySelectorAll('#MetroMap_lines .MetroMap_line_item')) || null;
            let allStations = Array.from(svgImage.querySelectorAll('#MetroMap_stations .MetroMap_stations_group .MetroMap_station_item')) || null;
            let allTransits = svgImage.querySelectorAll('#MetroMap_stations #MetroMap_transit .MetroMap_transit_bg')
            let allStops = svgImage.querySelectorAll('#MetroMap_stops .MetroMap_stop')

            if (allLines !== null) {
                allLines.forEach(line => {
                    line.addEventListener('click', function (event) {
                        if (drag === false) {
                            let id = event.target.parentNode.parentNode.getAttribute('data-metro-map-node-id')
                            let selectLineValue = selectLine.value;
                            if (selLinesId.indexOf(id) === -1) {
                                selectLineValue.push(id)
                                initLine = true;
                                selectLine.setValue(selectLineValue);
                            }
                            else {
                                selectLineValue.splice(selectLineValue.indexOf(id), 1)
                                selectLine.setValue(selectLineValue);
                            }
                        }
                    })
                    line.addEventListener('mouseenter', function (event) {
                        let id = event.target.getAttribute('data-metro-map-node-id')
                        let labels = Array.from(event.target.querySelectorAll('.MetroMap_label')) || null;
                        let lineStations = Array.from(svgImage.querySelectorAll(`#MetroMap_stations .MetroMap_stations_group[data-line='${id}'] .MetroMap_station_item`)) || null;
                        labels.forEach(label => {
                            label.classList.add('MetroMap_label-hover')
                        })
                        lineStations.forEach(station => {
                            let stationId = Number(station.getAttribute('data-metro-map-node-id'));
                            let stationStops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${stationId}']`)) || null;

                            station.classList.add('MetroMap_station_item-hover')
                            if (stationStops !== null) {
                                stationStops.forEach(stop => {
                                    stop.classList.add('MetroMap_stop-hover')
                                })
                            }
                        })
                    })
                    line.addEventListener('mouseleave', function (event) {
                        let id = event.target.getAttribute('data-metro-map-node-id')
                        let labels = Array.from(event.target.querySelectorAll('.MetroMap_label')) || null;
                        let lineStations = Array.from(svgImage.querySelectorAll(`#MetroMap_stations .MetroMap_stations_group[data-line='${id}'] .MetroMap_station_item`)) || null;
                        labels.forEach(label => {
                            label.classList.remove('MetroMap_label-hover')
                        })
                        lineStations.forEach(station => {
                            let stationId = Number(station.getAttribute('data-metro-map-node-id'));
                            let stationStops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${stationId}']`)) || null;

                            station.classList.remove('MetroMap_station_item-hover')
                            if (stationStops !== null) {
                                stationStops.forEach(stop => {
                                    stop.classList.remove('MetroMap_stop-hover')
                                })
                            }
                        })
                    })
                })
            }
            if (allStations !== null) {
                allStations.forEach(station => {
                    let stationName = Array.from(station.querySelectorAll('text')) || null;
                    let stationLine = station.parentNode.getAttribute('data-line');
                    let name = getStationName(stationName);

                    somethingArray.push({
                        label: (name + `<span class="Metro-Line-Color Metro-Line-Color__${stationLine}"></span>`),
                        value: station.getAttribute('data-metro-map-node-id'),
                    })

                    station.addEventListener('click', function (event) {
                        if (drag === false) {
                            let id = event.target.getAttribute('data-metro-map-node-id') || null;
                            id === null ? id = event.target.parentNode.getAttribute('data-metro-map-node-id') || null : true
                            id === null ? id = event.target.parentNode.parentNode.getAttribute('data-metro-map-node-id') : true
                            let selectStationValue = selectStation.value;
                            if (selStationsId.indexOf(id) === -1) {
                                selectStationValue.push(id)
                                initStation = true;
                                selectStation.setValue(selectStationValue);
                            }
                            else {
                                selectStationValue.splice(selectStationValue.indexOf(id), 1)
                                selectStation.setValue(selectStationValue);
                            }
                        }
                    })
                    station.addEventListener('mouseenter', function (event) {
                        let id = event.target.getAttribute('data-metro-map-node-id')
                        let stops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${id}']`)) || null;

                        station.classList.add('MetroMap_station_item-hover')
                        if (stops !== null) {
                            stops.forEach(stop => {
                                stop.classList.add('MetroMap_stop-hover')
                            })
                        }
                    })
                    station.addEventListener('mouseleave', function (event) {
                        let id = event.target.getAttribute('data-metro-map-node-id')
                        let stops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${id}']`)) || null;

                        station.classList.remove('MetroMap_station_item-hover')
                        if (stops !== null) {
                            stops.forEach(stop => {
                                stop.classList.remove('MetroMap_stop-hover')
                            })
                        }
                    })
                })
                somethingArray.sort(function (a, b) {
                    let nameA=a.label.toLowerCase()
                    let nameB=b.label.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    if (nameA > nameB)
                        return 1
                    return 0
                })
            }
            if (allStops !== null) {
                allStops.forEach(stop => {
                    stop.addEventListener('click', function (event) {
                        if (drag === false) {
                            let id = event.target.getAttribute('data-station') || null;
                            id === null ? id = event.target.parentNode.getAttribute('data-station') || null : true
                            setSelectedStation(id)
                        }
                    })
                    stop.addEventListener('mouseenter', function (event) {
                        let id = event.target.getAttribute('data-station')
                        let stops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${id}']`)) || null;
                        let station = svgImage.querySelector(`#MetroMap_stations .MetroMap_stations_group .MetroMap_station_item[data-metro-map-node-id='${id}']`) || null;

                        if (stops !== null) {
                            stops.forEach(stop => {
                                stop.classList.add('MetroMap_stop-hover')
                            })
                        }
                        if (station !== null) {
                            station.classList.add('MetroMap_station_item-hover')
                        }
                    })
                    stop.addEventListener('mouseleave', function (event) {
                        let id = event.target.getAttribute('data-station')
                        let stops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${id}']`)) || null;
                        let station = svgImage.querySelector(`#MetroMap_stations .MetroMap_stations_group .MetroMap_station_item[data-metro-map-node-id='${id}']`) || null;

                        if (stops !== null) {
                            stops.forEach(stop => {
                                stop.classList.remove('MetroMap_stop-hover')
                            })
                        }
                        if (station !== null) {
                            station.classList.remove('MetroMap_station_item-hover')
                        }
                    })
                })
            }
        }


        // Перемещение и приближение
        const svgZoomIn = document.querySelector('.metro__zoomIn') || null;
        const svgZoomOut = document.querySelector('.metro__zoomOut') || null;

        if (svgImage !== null && svgContainer !== null) {
            let startPoint = { x: 0, y: 0 };
            let endPoint = { x: 0, y: 0 };
            let scale = 1.45;
            let svgContainerSize = {
                w: svgContainer.clientWidth,
                h: svgContainer.clientHeight,
            };
            let svgSize = {
                w: svgImage.clientWidth,
                h: svgImage.clientHeight,
            };
            // TODO: Сделать формулу с учетом scale
            let viewBox = {
                w: svgSize.w * scale,
                h: svgSize.h * scale,
                // x: ((svgContainerSize.w - svgSize.w) / 2 + 352) * -1,
                // y: ((svgContainerSize.h - svgSize.h) / 2 + 582) * -1,
                x: ((svgContainerSize.w - svgSize.w) / 2 + 132) * -1,
                y: ((svgContainerSize.h - svgSize.h) / 2 + 362) * -1,
            };

            setTransform(viewBox)
            // Пересчет scale для нормальной работы передвижения по карте
            scale = svgSize.w / viewBox.w;


            svgContainer.addEventListener('mousewheel', function (event) {
                event.preventDefault();
                if (event.wheelDelta >= 0) {
                    if (scale >= 0.3) {
                        calculateZoom(-1, false, event)
                    }
                }
                else {
                    if (scale <= 2) {
                        calculateZoom(1, false, event)
                    }
                }
            }, {passive: false})
            svgContainer.addEventListener('mousedown', function (event) {
                click = true;
                isPanning = true;
                startPoint = {
                    x: event.x,
                    y: event.y,
                };
            })
            svgContainer.addEventListener('mousemove', throttled(20, moveMap))
            svgContainer.addEventListener('mouseup', function (event) {
                click = false;
                if (isPanning) {
                    endPoint = {
                        x: event.x,
                        y: event.y,
                    };
                    let dx = (startPoint.x - endPoint.x) / scale;
                    let dy = (startPoint.y - endPoint.y) / scale;
                    viewBox = {
                        x: viewBox.x + dx,
                        y: viewBox.y + dy,
                        w: viewBox.w,
                        h: viewBox.h,
                    };
                    setTransform(viewBox);
                    isPanning = false
                }
            })
            svgContainer.addEventListener('mouseleave',function (event) {
                svgContainer.style['cursor'] = 'default';
                isPanning = false;
            })

            // Функция перемещения карты
            function moveMap (event) {
                if (click) {
                    drag = true;
                }
                else if (!click) {
                    drag = false;
                }

                if (isPanning && drag) {
                    endPoint = {
                        x: event.x,
                        y: event.y,
                    };
                    let dx = (startPoint.x - endPoint.x) / scale;
                    let dy = (startPoint.y - endPoint.y) / scale;
                    let movedViewBox = {
                        x: viewBox.x + dx,
                        y: viewBox.y + dy,
                        w: viewBox.w,
                        h: viewBox.h,
                    };
                    setTransform(movedViewBox);
                }
            }

            // Кнопки приближения и отдаления
            if (svgZoomIn !== null &&  svgZoomOut !== null) {
                svgZoomIn.addEventListener('click', function () {
                    if (scale <= 2) {
                        calculateZoom(1, true)
                    }
                })
                svgZoomOut.addEventListener('click', function () {
                    if (scale >= 0.3) {
                        calculateZoom(-1, true)
                    }
                })
            }

            // Функция приближения и уменьшения
            function calculateZoom (direction, button, event) {
                let w = viewBox.w;
                let h = viewBox.h;
                let mx = button === true ? svgContainer.getBoundingClientRect().width / 2 : event.offsetX;
                let my = button === true ? svgContainer.getBoundingClientRect().height / 2 : event.offsetY;
                let dw = button === true ? w * direction * 0.1 : w * Math.sign(event.deltaY) * 0.1;
                let dh = button === true ? h * direction * 0.1 : h * Math.sign(event.deltaY) * 0.1;
                let dx = (dw * mx) / svgSize.w;
                let dy = (dh * my) / svgSize.h;
                viewBox = {
                    x: viewBox.x + dx,
                    y: viewBox.y + dy,
                    w: viewBox.w - dw,
                    h: viewBox.h - dh,
                };
                scale = svgSize.w / viewBox.w;
                setTransform(viewBox)
            }

            // Функция для установки новых значений приближения и перемещения
            function setTransform (viewBox) {
                svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
            }
        }

        // Поле выбора станции
        let selectStation = metro.querySelector('.select-metro__station') || null;
        if (selectStation !== null) {
            VirtualSelect.init({
                ele: '.select-metro__station',
                search: true,
                multiple: true,
                disableSelectAll: true,
                placeholder: 'Выбрать станцию',
                noSearchResultsText: 'Ничего не найдено',
                searchPlaceholderText: 'Поиск',
                optionsSelectedText: 'станций выбрано',
                optionSelectedText: 'станция выбрана',
                allOptionsSelectedText: 'Выбраны все станции',
                silentInitialValueSet: true,
                options: somethingArray,
            });
            watcher(selectStation.value, setSelectedStation)

            selectStation.addEventListener('change', function () {
                if (!initStation) {
                    setSelectedStation(selectStation.value[0])
                    initStation = true
                }
                watcher(selectStation.value, setSelectedStation)
            })
            selectStation.addEventListener('reset', function () {
                let ids = [];
                selStationsId.forEach(id => {
                    ids.push(id)
                })
                ids.forEach(id => {
                    around = true
                    setSelectedStation(id);
                })
                around = false
                selectLine.reset()
            })
        }
        // Поле выбора линии
        let selectLine = metro.querySelector('.select-metro__line') || null;
        if (selectLine !== null) {
            VirtualSelect.init({
                ele: '.select-metro__line',
                search: true,
                multiple: true,
                disableSelectAll: true,
                placeholder: 'Выбрать линию',
                noSearchResultsText: 'Ничего не найдено',
                searchPlaceholderText: 'Поиск',
                optionsSelectedText: 'линий выбрано',
                optionSelectedText: 'линия выбрана',
                allOptionsSelectedText: 'Выбраны все линии',
                silentInitialValueSet: true,
                options: [
                    { label: 'Сокольническая линия', value: '632' },
                    { label: 'Замоскворецкая линия', value: '629' },
                    { label: 'Арбатско-Покровская линия', value: '633' },
                    { label: 'Филёвская линия', value: '634' },
                    { label: 'Кольцевая линия', value: '635' },
                    { label: 'Калужско-Рижская линия', value: '631' },
                    { label: 'Таганско-Краснопресненская линия', value: '625' },
                    { label: 'Калининская линия', value: '628' },
                    { label: 'Солнцевская линия', value: '623' },
                    { label: 'Серпуховско-Тимирязевская линия', value: '622' },
                    { label: 'Люблинско-Дмитровская линия', value: '626' },
                    { label: 'Большая кольцевая линия / 1', value: '624' },
                    { label: 'Большая кольцевая линия / 2', value: '627' },
                    { label: 'Бутовская линия', value: '630' },
                    { label: 'Московское центральное кольцо', value: '621' },
                    { label: 'Некрасовская линия', value: '619' },
                    { label: 'МЦД-1', value: '620' },
                    { label: 'МЦД-2', value: '618' },
                ],
            });
            watcher(selectLine.value, setSelectedStationsFromLine)

            selectLine.addEventListener('change', function () {
                if (!initLine) {
                    setSelectedStationsFromLine(selectLine.value[0])
                    initLine = true
                }
                watcher(selectLine.value, setSelectedStationsFromLine)
            })
            selectLine.addEventListener('reset', function () {
                let ids = [];
                selLinesId.forEach(id => {
                    ids.push(id)
                })
                ids.forEach(id => {
                    aroundLine = true
                    setSelectedStationsFromLine(id);
                })
                aroundLine = false
            })
        }

        // Получение названия
        function getStationName(stationNameText) {
            let text = '';
            stationNameText.forEach((el) => {
                const tspans = Array.from(el.querySelectorAll('tspan')) || null;
                if (tspans !== null) {
                    tspans.forEach((tspan) => {
                        let tspanText = tspan.textContent;
                        if (!tspanText.includes('-')) {
                            tspanText += ' ';
                        }
                        text += tspanText;
                    });
                }
            });
            return text.trim();
        }

        // Отслеживание изменений массива
        function watcher (arr, fn) {
            arr.push = function () {
                fn(arguments[0])
                return Array.prototype.push.apply(this, arguments);
            }
            arr.splice = function () {
                fn(arr[arguments[0]])
                return Array.prototype.splice.apply(this, arguments);
            }
        }

        // Выбор станции
        function setSelectedStation (id) {
            if (id === null) return;
            let station = svgImage.querySelector(`#MetroMap_stations .MetroMap_station_item[data-metro-map-node-id='${id}']`) || null;
            let stationName = Array.from(station.querySelectorAll('text')) || null;
            let stationStops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${id}']`)) || null;

            let name;
            if (station !== null) {
                if (selStationsId.indexOf(id) !== -1) {

                    if (stationName !== null) {
                        station.classList.remove('MetroMap_station_item-active')
                        name = getStationName(stationName);
                    }
                    if (stationStops !== null) {
                        stationStops.forEach(stop => {
                            stop.classList.remove('MetroMap_stop-active')
                        })
                    }

                    if (!around) {
                        if (selStationsText.indexOf(name) !== -1) {
                            selStationsText.splice(selStationsText.indexOf(name), 1);
                        }
                        selStationsId.splice(selStationsId.indexOf(id), 1)
                    }
                }
                else {

                    if (stationName !== null) {
                        station.classList.add('MetroMap_station_item-active')
                        name = getStationName(stationName);
                    }
                    if (stationStops !== null) {
                        stationStops.forEach(stop => {
                            stop.classList.add('MetroMap_stop-active')
                        })
                    }
                    if (!around) {
                        if (selStationsText.indexOf(name) === -1) {
                            selStationsText.push(name);
                        }
                        selStationsId.push(id)
                    }
                }
            }
            if (!around) {
                console.log(selStationsText, selLinesId, selStationsId)
            }
        }
        // Выбор линии
        function setSelectedStationsFromLine (id) {
            let line = svgImage.querySelector(`#MetroMap_lines .MetroMap_line_item[data-metro-map-node-id='${id}']`) || null;
            if (line === null) return
            let lineLabels = Array.from(line.querySelectorAll('.MetroMap_label')) || null;
            let lineStations = Array.from(svgImage.querySelectorAll(`#MetroMap_stations .MetroMap_stations_group[data-line='${id}'] .MetroMap_station_item`)) || null;

            if (selLinesId.indexOf(id) !== -1) {
                if (lineLabels !== null) {
                    lineLabels.forEach(label => {
                        label.classList.remove('MetroMap_label-active')
                    })
                }
                if (lineStations !== null) {
                    lineStations.forEach(station => {
                        let stationId = Number(station.getAttribute('data-metro-map-node-id'));
                        let stationName = Array.from(station.querySelectorAll('text')) || null;
                        let stationStops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${stationId}']`)) || null;
                        let name;

                        if (stationName !== null) {
                            station.classList.remove('MetroMap_station_item-active')
                            name = getStationName(stationName);
                        }
                        if (stationStops !== null) {
                            stationStops.forEach(stop => {
                                stop.classList.remove('MetroMap_stop-active')
                            })
                        }
                        if (selStationsId.indexOf(String(stationId)) !== -1) {
                            let selectStationValue = selectStation.value;
                            if (selStationsId.indexOf(String(stationId)) !== -1) {
                                around = true
                                selectStationValue.splice(selectStationValue.indexOf(String(stationId)), 1)
                                initStation = true;
                                selectStation.setValue(selectStationValue);
                            }
                            selStationsId.splice(selStationsId.indexOf(String(stationId)), 1)
                        }
                        if (selStationsText.indexOf(name) !== -1) {
                            selStationsText.splice(selStationsText.indexOf(name), 1);
                        }
                    })
                }

                selLinesId.splice(selLinesId.indexOf(id), 1);
                around = false;
            }
            else {
                if (lineLabels !== null) {
                    lineLabels.forEach(label => {
                        label.classList.add('MetroMap_label-active')
                    })
                }
                if (lineStations !== null) {
                    lineStations.forEach(station => {
                        let stationId = Number(station.getAttribute('data-metro-map-node-id'));
                        let stationName = Array.from(station.querySelectorAll('text')) || null;
                        let stationStops = Array.from(svgImage.querySelectorAll(`#MetroMap_stops .MetroMap_stop[data-station='${stationId}']`)) || null;
                        let name;

                        if (stationName !== null) {
                            station.classList.add('MetroMap_station_item-active')
                            name = getStationName(stationName);
                        }
                        if (stationStops !== null) {
                            stationStops.forEach(stop => {
                                stop.classList.add('MetroMap_stop-active')
                            })
                        }
                        if (selStationsText.indexOf(name) === -1) {
                            if (selStationsId.indexOf(String(stationId)) === -1) {
                                let selectStationValue = selectStation.value;
                                if (selStationsId.indexOf(String(stationId)) === -1) {
                                    around = true
                                    selectStationValue.push(String(stationId))
                                    initStation = true;
                                    selectStation.setValue(selectStationValue);
                                }
                                selStationsId.push(String(stationId))
                            }
                            selStationsText.push(name);
                        }
                    })
                }
                selLinesId.push(id);
                around = false;
            }
            if (!aroundLine) {
                console.log(selStationsText, selLinesId, selStationsId)
            }
        }

        // Фикс для обработчиков, с большим потоком данных
        function throttled (delay, fn) {
            let lastCall = 0;
            return function (...args) {
                const now = (new Date).getTime();
                if (now - lastCall < delay) {
                    return;
                }
                lastCall = now;
                return fn(...args)
            }
        }
    }
});
