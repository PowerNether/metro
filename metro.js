let metro = document.querySelector('.metro') || null;

if (metro !== null) {
    let stationTextActive = '#fff'; // Цвет выбранной станции
    let stationTextNotActive = '#999'; // Цвет не выбраной станции
    let stationTextHover = '#5947B3';
    let stationBgActive = '#5947B3'; // Цвет задника выбранной станции
    let stationBgNotActive = '#FFF'; // Цвет задника не выбраной станции
    let stationMarkerActive = '#5947B3'; // Цвет маркера при выбранной станции
    let stationMarkerNotActive = '#fff'; // Цвет маркера при выбранной станции
    let lineLableTextActive = '900'; // Жирность текста выбраной линии метро
    let lineLableTextNotActive = '400'; // Жирность текста не выбранной линии метро
    let transitionSpeed = '0.35s'; // Скорость анимаций
    let selStationsId = [];
    let selLinesId = []
    let selStationsText = [];
    let previousSelLinesId = [];

    const svgContainer = document.querySelector('.metro__map') || null;
    const svgImage = document.querySelector('.metro__map svg') || null;

    // Выбор станции/линии
    if (svgImage !== null && svgContainer !== null) {
        let allLines = svgImage.querySelectorAll('#MetroMap_lines .MetroMap_line_item')
        let allStationsGroup = svgImage.querySelectorAll('#MetroMap_stations .MetroMap_stations_group')
        let allTransits = svgImage.querySelectorAll('#MetroMap_stations #MetroMap_transit .MetroMap_transit_bg')
        let allStops = svgImage.querySelectorAll('#MetroMap_stops .MetroMap_stop')

        Array.from(allLines).forEach(line => {
            line.addEventListener('click', function (event) {
                let id = event.target.parentNode.parentNode.getAttribute('data-metro-map-node-id')
                setSelectedStationsFromLine(id);
            })
        })
    }

    // Перемещение и приближение
    const svgZoomIn = document.querySelector('.metro__zoomIn') || null;
    const svgZoomOut = document.querySelector('.metro__zoomOut') || null;

    if (svgImage !== null && svgContainer !== null) {
        let startPoint = { x: 0, y: 0 };
        let endPoint = { x: 0, y: 0 };
        let scale = 2;
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
            x: ((svgContainerSize.w - svgSize.w) / 2 + 352) * -1,
            y: ((svgContainerSize.h - svgSize.h) / 2 + 582) * -1,
        };
        let isPanning = false;

        setTransform(viewBox)
        // Пересчет scale для нормальной работы передвижения по карте
        scale = svgSize.w / viewBox.w;

        svgContainer.addEventListener('mousewheel', function (event) {
            event.preventDefault();
            if (event.wheelDelta >= 0) {
                if (scale >= 0.3) {
                    calculateZoom(-1, false, event)
                }
            } else {
                if (scale <= 2) {
                    calculateZoom(1, false, event)
                }
            }
        }, {passive: false})
        svgContainer.addEventListener('mousedown', function (event) {
            isPanning = true;
            startPoint = {
                x: event.x,
                y: event.y,
            };
        })
        svgContainer.addEventListener('mousemove', throttled(20, moveMap))
        svgContainer.addEventListener('mouseup', function (event) {
            if (isPanning) {
                svgContainer.style['cursor'] = 'default';
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
                isPanning = false;
            }
        })
        svgContainer.addEventListener('mouseleave',function (event) {
            svgContainer.style['cursor'] = 'default';
            isPanning = false;
        })

        // Функция перемещения карты
        function moveMap (event) {
            if (isPanning) {
                svgContainer.style['cursor'] = 'grabbing';
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

    // Selects
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
            optionsSelectedText: 'линии выбрано',
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
        selectLine.addEventListener('change', function () {
            console.log(this.value)
        })
    }

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

    function setSelectedStationsFromLine (id) {
        let line = svgImage.querySelector(`#MetroMap_lines .MetroMap_line_item[data-metro-map-node-id='${id}']`) || null;
        if (line === null) return
        let lineLabels = Array.from(line.querySelectorAll('.MetroMap_label')) || null;
        let lineStations = Array.from(svgImage.querySelectorAll(`#MetroMap_stations .MetroMap_stations_group[data-line='${id}'] .MetroMap_station_item`)) || null;

        if (selLinesId.indexOf(id) !== -1) {
            if (lineLabels !== null) {
                lineLabels.forEach(label => {
                    let circle = label.querySelector('.MetroMap_circle') || null;
                    if (circle !== null) {
                        circle.style['stroke'] = stationMarkerNotActive;
                        circle.style['transition'] = `all ${transitionSpeed}`;
                    }
                })
            }
            if (lineStations !== null) {
                lineStations.forEach(station => {
                    let stationId = Number(station.getAttribute('data-metro-map-node-id'));
                    let stationName = Array.from(station.querySelectorAll('text')) || null;
                    let stationBackground = station.querySelector('.MetroMap_bg') || null;
                    let stationStop = svgImage.querySelector(`#MetroMap_stops .MetroMap_stop[data-station='${stationId}']`) || null;
                    let name;

                    if (stationName !== null) {
                        stationName.forEach(text => {
                            text.style['fill'] = stationTextNotActive;
                            text.style['transition'] = `all ${transitionSpeed}`
                        })
                        name = getStationName(stationName);
                    }
                    if (stationBackground !== null) {
                        stationBackground.style['fill'] = stationBgNotActive;
                        stationBackground.style['opacity'] = 0;
                        stationBackground.style['transition'] = `all ${transitionSpeed}`;
                    }
                    if (stationStop !== null) {
                        let circle = stationStop.querySelector('.MetroMap_circle') || null;
                        if (circle !== null) {
                            circle.style['stroke'] = stationMarkerNotActive;
                            circle.style['transition'] = `all ${transitionSpeed}`;
                        }
                    }
                    if (selStationsText.indexOf(name) !== -1) {
                        selStationsText.splice(selStationsText.indexOf(name), 1);
                    }
                })
            }
            selLinesId.splice(selLinesId.indexOf(id), 1);
        }
        else {
            if (lineLabels !== null) {
                lineLabels.forEach(label => {
                    let circle = label.querySelector('.MetroMap_circle') || null;
                    if (circle !== null) {
                        circle.style['stroke'] = stationMarkerActive;
                        circle.style['transition'] = `all ${transitionSpeed}`;
                    }
                })
            }
            if (lineStations !== null) {
                lineStations.forEach(station => {
                    let stationId = Number(station.getAttribute('data-metro-map-node-id'));
                    let stationName = Array.from(station.querySelectorAll('text')) || null;
                    let stationBackground = station.querySelector('.MetroMap_bg') || null;
                    let stationStop = svgImage.querySelector(`#MetroMap_stops .MetroMap_stop[data-station='${stationId}']`) || null;
                    let name;

                    if (stationName !== null) {
                        stationName.forEach(text => {
                            text.style['fill'] = stationTextActive;
                            text.style['transition'] = `all ${transitionSpeed}`
                        })
                        name = getStationName(stationName);
                    }
                    if (stationBackground !== null) {
                        stationBackground.style['fill'] = stationBgActive;
                        stationBackground.style['opacity'] = 1;
                        stationBackground.style['transition'] = `all ${transitionSpeed}`;
                    }
                    if (stationStop !== null) {
                        let circle = stationStop.querySelector('.MetroMap_circle') || null;
                        if (circle !== null) {
                            circle.style['stroke'] = stationMarkerActive;
                            circle.style['transition'] = `all ${transitionSpeed}`;
                        }
                    }
                    if (selStationsText.indexOf(name) === -1) {
                        selStationsText.push(name);
                    }
                })
            }
            selLinesId.push(id);
        }
        console.log(selStationsText, selLinesId)
    }
}
