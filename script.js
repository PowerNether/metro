// let allStation = new Array();
// let selStation = new Array();
// let selLine = new Array();
// let isPanning = false;

// let stationTextActive = "#fff"; // Цвет выбранной станции
// let stationTextNotActive = "#999"; // Цвет не выбраной станции
// let stationTextHover = "#5947B3";

// let stationBgActive = "#5947B3"; // Цвет задника выбранной станции
// let stationBgNotActive = "#FFDE5A"; // Цвет задника не выбраной станции

// let stationMarkerActive = "#5947B3"; // Цвет маркера при выбранной станции
// let stationMarkerNotActive = "#fff"; // Цвет маркера при выбранной станции

// let lineLableTextActive = "900"; // Жирность текста выбраной линии метро
// let lineLableTextNotActive = "400"; // Жирность текста не выбранной линии метро

// let transitionSpeed = "0.35s"; // Скорость анимаций

// // Get all id
// function getAllStation() {
//   let allElementsById = $("[data-metro-map-node-id]");
//   for (let i = 0; i < allElementsById.length; i++) {
//     const el = allElementsById[i];
//     allStation.push($(el).attr("data-metro-map-node-id"));
//   }
//   // Array.from(allElementsById).forEach(el => {
//   //     const tspans = $(el).children('text');
//   //     let text = '';
//   //     Array.from(tspans).forEach(elem => {
//   //         let elemText = $(elem).children('tspan').text();
//   //         if (!elemText.includes('-')) {
//   //             elemText += ' '
//   //         }
//   //         text += elemText;
//   //     })
//   //     allStation.push(text.trim())
//   // })
// }

// function getStationName(stationNameText) {
//   let text = "";
//   Array.from(stationNameText).forEach((el) => {
//     const tspans = $(el).children("tspan");
//     Array.from(tspans).forEach((elem) => {
//       let elemText = $(elem).text();
//       if (!elemText.includes("-")) {
//         elemText += " ";
//       }
//       text += elemText;
//     });
//   });
//   return text.trim();
// }

// function getSelectedStation(e) {
//   let stationId = e.target.parentNode.parentNode.getAttribute("data-metro-map-node-id"); // Получение id станции

//   let targetStationText = e.target.parentNode.parentNode.querySelector(".text"); // Выбор текста станции
//   let targetStationBg = e.target.parentNode.parentNode.querySelector(".MetroMap_bg"); // Выбор задника текста станции
//   let stationMarker = document.querySelector(`[data-station="${stationId}"]`); // Получение маркерка к станции

//   let markerId = e.target.parentNode.getAttribute("data-station"); // ПОлучение id станции привязаной к маркеру
//   let targetMarkerParent = e.target.parentNode; // Получение родителя маркера
//   let markerStation = document.querySelector(`[data-metro-map-node-id="${markerId}"]`); // Получение маркерка к станции

//   let lineId = e.target.parentNode.getAttribute("data-metro-map-node-id"); // Получение id линни
//   let targetLineLable = e.target.parentNode.parentNode.querySelector(".MetroMap_label .text"); // Получение навзания линии
//   let lineStation = document.querySelector("[data-line]"); // Список станций по ID Линии

//   let stationNameText = document.querySelector(`[data-metro-map-node-id="${stationId}"] .text`);
//   let stationNameMarked = document.querySelector(`[data-metro-map-node-id="${markerId}"] .text`);

//   if (allStation.indexOf(stationId) != -1) {
//     let stationName = getStationName(stationNameText);

//     if (selStation.indexOf(stationName) != -1) {
//       targetStationText.style['fill'] = stationTextNotActive;
//       targetStationText.style['transition'] = `all ${transitionSpeed}`;

//       targetStationBg.style['fill'] = stationBgNotActive;
//       targetStationBg.style['opacity'] = 0;
//       targetStationBg.style['transition'] = `all ${transitionSpeed}`;

//       stationMarker.style['stroke'] = stationMarkerNotActive;
//       stationMarker.style['transition'] = `all ${transitionSpeed}`;

//       selStation.splice(selStation.indexOf(stationName), 1);
//     } else {
//       targetStationText.style['fill'] = stationTextActive;
//       targetStationText.style['transition'] = `all ${transitionSpeed}`;

//       targetStationBg.style['fill'] = stationBgActive;
//       targetStationBg.style['opacity'] = 1;
//       targetStationBg.style['transition'] = `all ${transitionSpeed}`;

//       stationMarker.style['stroke'] = stationMarkerActive;
//       stationMarker.style['transition'] = `all ${transitionSpeed}`;

//       selStation.push(stationName);
//     }
//   } else if (allStation.indexOf(lineId) != -1) {
//     if (selLine.indexOf(lineId) != -1) {
//       targetLineLable.style["font-weight"] = ineLableTextNotActive;

//       for (let i = 0; i < lineStation.length; i++) {
//         const el = lineStation[i];

//         if ($(el).attr("data-line") == lineId) {
//           let elChildren = el.childNodes;

//           for (let index = 0; index < elChildren.length; index++) {
//             const element = elChildren[index];
//             let elementId = element.getAttribute("data-metro-map-node-id");

//             let stationNameLine = document.querySelector(`[data-metro-map-node-id="${elementId}"] .text`);
//             let stationName = getStationName(stationNameLine);

//             element.querySelector(".MetroMap_bg").style['fill'] = stationBgNotActive;
//             element.querySelector(".MetroMap_bg").style['opacity'] = 0;
//             element.querySelector(".MetroMap_bg").style['transition'] = `all ${transitionSpeed}`;

//             document.querySelector(`[data-station="${elementId}"]`).style['stroke'] = stationMarkerNotActive;
//             document.querySelector(`[data-station="${elementId}"]`).style['transition'] = `all ${transitionSpeed}`;

//             if (selStation.indexOf(stationName) != -1) {
//               selStation.splice(selStation.indexOf(stationName), 1);
//             }
//           }

//           for (let index = 0; index < elChildren.length; index++) {
//             const element = elChildren[index].querySelector('.text');

//             element.style['fill'] = stationTextNotActive;
//             element.style['transition'] = `all ${transitionSpeed}`;
//           }
//         }
//       }

//       selLine.splice(selLine.indexOf(lineId), 1);
//     } else {
//       targetLineLable.style["font-weight"] = lineLableTextActive;

//       for (let i = 0; i < lineStation.length; i++) {
//         const el = lineStation[i];

//         if ($(el).attr("data-line") == lineId) {
//           let elChildren = el.childNodes;

//           for (let index = 0; index < elChildren.length; index++) {
//             const element = elChildren[index];
//             let elementId = element.getAttribute("data-metro-map-node-id");

//             let stationNameLine = document.querySelector(`[data-metro-map-node-id="${elementId}"] .text`);
//             let stationName = getStationName(stationNameLine);

//             element.querySelector(".MetroMap_bg").style['fill'] = stationBgActive;
//             element.querySelector(".MetroMap_bg").style['opacity'] = 1;
//             element.querySelector(".MetroMap_bg").style['transition'] = `all ${transitionSpeed}`;

//             document.querySelector(`[data-station="${elementId}"]`).style['stroke'] = stationMarkerActive;
//             document.querySelector(`[data-station="${elementId}"]`).style['transition'] = `all ${transitionSpeed}`;

//             if (selStation.indexOf(stationName) == -1) {
//               selStation.push(stationName);
//             }
//           }

//           for (let index = 0; index < elChildren.length; index++) {
//             const element = elChildren[index].querySelector('.text');
//             element.style['fill'] = stationTextNotActive;
//             element.style['transition'] = `all ${transitionSpeed}`;
//           }
//         }
//       }

//       selLine.push(lineId);
//     }
//   } else if (allStation.indexOf(markerId) != 1) {
//     let stationName = getStationName(stationNameMarked);

//     if (selStation.indexOf(stationName) != -1) {
//       markerStation.querySelector('.text').style['fill'] = stationTextNotActive;
//       markerStation.querySelector('.text').style['transition'] = `all ${transitionSpeed}`;

//       markerStation.querySelector('.MetroMap_bg').style['fill'] = stationBgNotActive;
//       markerStation.querySelector('.MetroMap_bg').style['opacity'] = 0;
//       markerStation.querySelector('.MetroMap_bg').style['transition'] = `all ${transitionSpeed}`;

//       targetMarkerParent.querySelector('.text').style['fill'] = stationMarkerNotActive;
//       targetMarkerParent.querySelector('.text').style['transition'] = `all ${transitionSpeed}`;

//       selStation.splice(selStation.indexOf(stationName), 1);
//     } else if (typeof markerId != "undefined") {
//       markerStation.querySelector('.text').style['fill'] = stationTextActive;
//       markerStation.querySelector('.text').style['transition'] = `all ${transitionSpeed}`;

//       markerStation.querySelector('.MetroMap_bg').style['fill'] = stationBgActive;
//       markerStation.querySelector('.MetroMap_bg').style['opacity'] = 0;
//       markerStation.querySelector('.MetroMap_bg').style['transition'] = `all ${transitionSpeed}`;

//       targetMarkerParent.querySelector('.text').style['fill'] = stationMarkerActive;
//       targetMarkerParent.querySelector('.text').style['transition'] = `all ${transitionSpeed}`;

//       selStation.push(stationName);
//     }
//   }

//   if (selStation.length !== 0) {
//     console.log(selStation);
//   }
// }

// $(window).on("load", function () {
//   getAllStation();
//   $(".MetroMap_line_item").css("cursor", "pointer");
//   $(".MetroMap_circle").css("cursor", "pointer");
//   $(".MetroMap_station_item").css("cursor", "pointer");

//   $(".MetroMap_line_item").hover(
//     function () {
//       let lineId = $(this).attr("data-metro-map-node-id");
//       let lineStation = $("[data-line]");
//       if (selStation.indexOf(lineId) == -1) {
//         for (let index = 0; index < lineStation.length; index++) {
//           const el = lineStation[index];
//           if ($(el).attr("data-line") == lineId) {
//             let elChildren = $(el).children();
//             for (let index = 0; index < elChildren.length; index++) {
//               const element = elChildren[index];
//               let elementId = $(element).attr("data-metro-map-node-id");
//               if (selStation.indexOf($(element).attr("data-metro-map-node-id")) == -1) {
//                 $(element)
//                   .children(".text")
//                   .css({
//                     fill: stationTextHover,
//                     transition: `all ${transitionSpeed}`,
//                   });
//                 $(`[data-station="${elementId}"]`)
//                   .attr({
//                     "stroke-width": 2,
//                   })
//                   .css({
//                     transition: `all ${transitionSpeed}`,
//                   });
//               }
//             }
//           }
//         }
//       }
//     },
//     function () {
//       let lineId = $(this).attr("data-metro-map-node-id");
//       let lineStation = $("[data-line]");
//       if (selStation.indexOf(lineId) == -1) {
//         for (let index = 0; index < lineStation.length; index++) {
//           const el = lineStation[index];
//           if ($(el).attr("data-line") == lineId) {
//             let elChildren = $(el).children();
//             for (let index = 0; index < elChildren.length; index++) {
//               const element = elChildren[index];
//               let elementId = $(element).attr("data-metro-map-node-id");
//               if (selStation.indexOf($(element).attr("data-metro-map-node-id")) == -1) {
//                 $(element)
//                   .children(".text")
//                   .css({
//                     fill: stationTextNotActive,
//                     transition: `all ${transitionSpeed}`,
//                   });
//                 $(`[data-station="${elementId}"]`)
//                   .attr({
//                     "stroke-width": 4,
//                   })
//                   .css({
//                     transition: `all ${transitionSpeed}`,
//                   });
//               }
//             }
//           }
//         }
//       }
//     }
//   );
//   $(".MetroMap_circle").hover(
//     function () {
//       let stationId = $(this).parent().attr("data-station");
//       if (selStation.indexOf(stationId) == -1) {
//         $(this)
//           .parent()
//           .attr({
//             "stroke-width": 2,
//           })
//           .css({
//             cursor: "pointer",
//             transition: `all ${transitionSpeed}`,
//           });
//         $(`[data-metro-map-node-id=${stationId}]`)
//           .children(".text")
//           .css({
//             fill: stationTextHover,
//             transition: `all ${transitionSpeed}`,
//           });
//       }
//     },
//     function () {
//       let stationId = $(this).parent().attr("data-station");
//       if (selStation.indexOf(stationId) == -1) {
//         $(this)
//           .parent()
//           .attr({
//             "stroke-width": 4,
//           })
//           .css({
//             transition: `all ${transitionSpeed}`,
//           });
//         $(`[data-metro-map-node-id=${stationId}]`)
//           .children(".text")
//           .css({
//             fill: stationTextNotActive,
//             transition: `all ${transitionSpeed}`,
//           });
//       }
//     }
//   );
//   $(".MetroMap_station_item").hover(
//     function () {
//       let stationId = $(this).attr("data-metro-map-node-id");
//       if (selStation.indexOf(stationId) == -1) {
//         $(this)
//           .children(".text")
//           .css({
//             fill: stationTextHover,
//             transition: `all ${transitionSpeed}`,
//           });
//         $(`[data-station=${stationId}]`)
//           .attr({
//             "stroke-width": 2,
//           })
//           .css({
//             transition: `all ${transitionSpeed}`,
//           });
//       }
//     },
//     function () {
//       let stationId = $(this).attr("data-metro-map-node-id");
//       if (selStation.indexOf(stationId) == -1) {
//         $(this)
//           .children(".text")
//           .css({
//             fill: stationTextNotActive,
//             transition: `all ${transitionSpeed}`,
//           });
//         $(`[data-station=${stationId}]`)
//           .attr({
//             "stroke-width": 4,
//           })
//           .css({
//             transition: `all ${transitionSpeed}`,
//           });
//       }
//     }
//   );
// });

// let drag = false;
// let click = false;

// document.onmousedown = function (e) {
//   drag = false;
//   if (e.type === 'mousedown') {
//     click = true;
//   }
// };
// document.onmouseup = function (e) {
//   console.log(drag)
//   if (e.type === 'mouseup') {
//     click = false;
//     drag = false;
//   }
// };
// document.onmousemove = function (e) {
//   if (e.type === 'mousemove' && click) {
//     drag = true
//   } else if (e.type === 'mousemove' && !click) {
//     drag = false
//   }
// }

// window.onload = function () {
//   const svgImage = document.querySelector(".mertro-map svg") || null;
//   const svgContainer = document.querySelector(".mertro-map") || null;
//   const svgZoomIn = document.querySelector('.metro-zoomIn') || null;
//   const svgZoomOut = document.querySelector('.metro-zoomOut') || null;

//   if (svgImage === null && svgContainer === null) return

//   let viewBox = {
//     x: 0,
//     y: 0,
//     w: svgImage.clientWidth,
//     h: svgImage.clientHeight,
//   };
//   svgImage.setAttribute('viewBox', `${ viewBox.x } ${ viewBox.y } ${ viewBox.w } ${ viewBox.h }`);
//   const svgSize = {
//     w: svgImage.clientWidth,
//     h: svgImage.clientHeight,
//   };
//   let startPoint = { x: 0, y: 0 };
//   let endPoint = { x: 0, y: 0 };;
//   let scale = 1;

//   svgContainer.onmousewheel = function (e) {
//     e.preventDefault();
//     let w = viewBox.w;
//     let h = viewBox.h;
//     let mx = e.offsetX;
//     let my = e.offsetY;
//     let dw = w * Math.sign(e.deltaY) * 0.1;
//     let dh = h * Math.sign(e.deltaY) * 0.1;
//     let dx = dw * mx / svgSize.w;
//     let dy = dh * my / svgSize.h;
//     if (e.wheelDelta >= 0) {
//       if (scale >= 0.3) {
//         viewBox = {
//           x: viewBox.x + dx,
//           y: viewBox.y + dy,
//           w: viewBox.w - dw,
//           h: viewBox.h - dh,
//         };
//         scale = svgSize.w / viewBox.w;
//         svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
//       }
//     }
//     else {
//       if (scale <= 2) {
//         viewBox = {
//           x: viewBox.x + dx,
//           y: viewBox.y + dy,
//           w: viewBox.w - dw,
//           h: viewBox.h - dh,
//         };
//         scale = svgSize.w / viewBox.w;
//         svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
//       }
//     }
//   }

//   svgContainer.onmousedown = function (e) {
//     isPanning = true;
//     startPoint = {
//       x: e.x,
//       y: e.y
//     };
//   }

//   svgContainer.onmousemove = function (e) {
//     if (isPanning && drag) {
//       svgContainer.style['cursor'] = 'grabbing'
//       endPoint = {
//         x: e.x,
//         y: e.y,
//       };
//       let dx = (startPoint.x - endPoint.x) / scale;
//       let dy = (startPoint.y - endPoint.y) / scale;
//       let movedViewBox = {
//         x: viewBox.x + dx,
//         y: viewBox.y + dy,
//         w: viewBox.w,
//         h: viewBox.h,
//       };
//       svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
//     }
//   }

//   svgContainer.onmouseup = function (e) {
//     if (isPanning) {
//       svgContainer.style['cursor'] = 'default'
//       endPoint = {
//         x: e.x,
//         y: e.y,
//       };
//       let dx = (startPoint.x - endPoint.x) / scale;
//       let dy = (startPoint.y - endPoint.y) / scale;
//       viewBox = {
//         x: viewBox.x + dx,
//         y: viewBox.y + dy,
//         w: viewBox.w,
//         h: viewBox.h,
//       };
//       svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
//       isPanning = false;
//     }
//   }

//   svgContainer.onmouseleave = function (e) {
//     isPanning = false;
//   }

//   if (svgZoomIn !== null && svgZoomOut !== null) {
//     svgZoomIn.addEventListener('click', function () {
//       let w = viewBox.w;
//       let h = viewBox.h;
//       let mx = svgContainer.getBoundingClientRect().width / 2;
//       let my = svgContainer.getBoundingClientRect().height / 2;
//       let dw = w * 1 * 0.1;
//       let dh = h * 1 * 0.1;
//       let dx = dw * mx / svgSize.w;
//       let dy = dh * my / svgSize.h;
//       if (scale <= 2) {
//         viewBox = {
//           x: viewBox.x + dx,
//           y: viewBox.y + dy,
//           w: viewBox.w - dw,
//           h: viewBox.h - dh,
//         };
//         scale = svgSize.w / viewBox.w;
//         svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
//       }
//     })
//     svgZoomOut.addEventListener('click', function () {
//       let w = viewBox.w;
//       let h = viewBox.h;
//       let mx = svgContainer.getBoundingClientRect().width / 2;
//       let my = svgContainer.getBoundingClientRect().height / 2;
//       let dw = w * -1 * 0.1;
//       let dh = h * -1 * 0.1;
//       let dx = dw * mx / svgSize.w;
//       let dy = dh * my / svgSize.h;
//       if (scale >= 0.3) {
//         viewBox = {
//           x: viewBox.x + dx,
//           y: viewBox.y + dy,
//           w: viewBox.w - dw,
//           h: viewBox.h - dh,
//         };
//         scale = svgSize.w / viewBox.w;
//         svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
//       }
//     })
//   }
// }

// document.onmouseup = function (e) {
//   console.log(drag)
//   if (e.target.tagName !== 'svg' && drag === false) {
//     getSelectedStation(e);
//   }
// }

function metroInit() {
  const svgContainer = document.querySelector(".mertro-map") || null;

  if (svgContainer !== null) {
    let allStation = new Array();
    let selStation = new Array();
    let selLine = new Array();
    let isPanning = false;
    let selectLineId;

    let stationTextActive = "#fff"; // Цвет выбранной станции
    let stationTextNotActive = "#999"; // Цвет не выбраной станции
    let stationTextHover = "#5947B3";

    let stationBgActive = "#5947B3"; // Цвет задника выбранной станции
    let stationBgNotActive = "#FFF"; // Цвет задника не выбраной станции

    let stationMarkerActive = "#5947B3"; // Цвет маркера при выбранной станции
    let stationMarkerNotActive = "#fff"; // Цвет маркера при выбранной станции

    let lineLableTextActive = "900"; // Жирность текста выбраной линии метро
    let lineLableTextNotActive = "400"; // Жирность текста не выбранной линии метро

    let transitionSpeed = "0.35s"; // Скорость анимаций

    // Get all id
    function getAllStation() {
      let allElementsById = $("[data-metro-map-node-id]");
      for (let i = 0; i < allElementsById.length; i++) {
        const el = allElementsById[i];
        allStation.push($(el).attr("data-metro-map-node-id"));
      }
    }

    function getStationName(stationNameText) {
      let text = "";
      Array.from(stationNameText).forEach((el) => {
        const tspans = $(el).children("tspan");
        Array.from(tspans).forEach((elem) => {
          let elemText = $(elem).text();
          if (!elemText.includes("-")) {
            elemText += " ";
          }
          text += elemText;
        });
      });
      return text.trim();
    }

    function getSelectedStation(e) {
      console.log(1)
      let stationId = $(e.target).parents(".MetroMap_station_item").attr("data-metro-map-node-id"); // Получение id станции

      let targetStationText = $(e.target).parents(".MetroMap_station_item").children(".text"); // Выбор текста станции
      let targetStationBg = $(e.target).parents(".MetroMap_station_item").children(".MetroMap_bg"); // Выбор задника текста станции
      let stationMarker = $(`[data-station="${stationId}"]`); // Получение маркерка к станции

      let markerId = $(e.target).parents(".MetroMap_stop").attr("data-station"); // ПОлучение id станции привязаной к маркеру
      let targetMarkerParent = $(e.target).parents(".MetroMap_stop"); // Получение родителя маркера
      let markerStation = $(`[data-metro-map-node-id="${markerId}"]`); // Получение маркерка к станции

      let lineId = $(e.target).parents(".MetroMap_line_item").attr("data-metro-map-node-id"); // Получение id линни
      let targetLineLable = $(e.target).parents(".MetroMap_line_item").children(".MetroMap_label").children("text"); // Получение навзания линии
      let lineStation = $("[data-line]"); // Список станций по ID Линии

      let stationNameText = $(`[data-metro-map-node-id="${stationId}"]`).children("text");
      let stationNameMarked = $(`[data-metro-map-node-id="${markerId}"]`).children("text");

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
            stroke: stationMarkerNotActive,
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
            stroke: stationMarkerActive,
            transition: `all ${transitionSpeed}`,
          });

          selStation.push(stationName);
        }
      } else if (allStation.indexOf(lineId) != -1) {
        if (selLine.indexOf(lineId) != -1) {
          let value = document.querySelector("#sample-select").value;
          value.splice(value.indexOf(lineId), 1);
          document.querySelector("#sample-select").setValue(value);

          targetLineLable.css("font-weight", lineLableTextNotActive);

          for (let i = 0; i < lineStation.length; i++) {
            const el = lineStation[i];
            if ($(el).attr("data-line") == lineId) {
              let elChildren = $(el).children();
              for (let index = 0; index < elChildren.length; index++) {
                const element = elChildren[index];
                let elementId = $(element).attr("data-metro-map-node-id");

                let stationNameLine = $(`[data-metro-map-node-id="${elementId}"]`).children("text");
                let stationName = getStationName(stationNameLine);

                $(element)
                  .children(".MetroMap_bg")
                  .css({
                    fill: stationBgNotActive,
                    opacity: 0,
                    transition: `all ${transitionSpeed}`,
                  });
                $(`[data-station="${elementId}"]`).css({
                  stroke: stationMarkerNotActive,
                  transition: `all ${transitionSpeed}`,
                });

                if (selStation.indexOf(stationName) != -1) {
                  selStation.splice(selStation.indexOf(stationName), 1);
                }
              }

              $(el)
                .children()
                .children("text")
                .css({
                  fill: stationTextNotActive,
                  transition: `all ${transitionSpeed}`,
                });
            }
          }

          selLine.splice(selLine.indexOf(lineId), 1);
        } else {
          let value = document.querySelector("#sample-select").value;
          value.push(lineId);
          document.querySelector("#sample-select").setValue(value);

          targetLineLable.css("font-weight", lineLableTextActive);

          for (let i = 0; i < lineStation.length; i++) {
            const el = lineStation[i];
            if ($(el).attr("data-line") == lineId) {
              let elChildren = $(el).children();

              for (let index = 0; index < elChildren.length; index++) {
                const element = elChildren[index];
                let elementId = $(element).attr("data-metro-map-node-id");

                let stationNameLine = $(`[data-metro-map-node-id="${elementId}"]`).children("text");
                let stationName = getStationName(stationNameLine);

                $(element)
                  .children(".MetroMap_bg")
                  .css({
                    fill: stationBgActive,
                    opacity: 1,
                    transition: `all ${transitionSpeed}`,
                  });
                $(`[data-station="${elementId}"]`).css({
                  stroke: stationMarkerActive,
                  transition: `all ${transitionSpeed}`,
                });
                if (selStation.indexOf(stationName) == -1) {
                  selStation.push(stationName);
                }
              }

              $(el)
                .children()
                .children("text")
                .css({
                  fill: stationTextActive,
                  transition: `all ${transitionSpeed}`,
                });
            }
          }

          selLine.push(lineId);
        }
      } else if (allStation.indexOf(markerId) != 1) {
        let stationName = getStationName(stationNameMarked);

        if (selStation.indexOf(stationName) != -1) {
          markerStation.children(".text").css({
            fill: stationTextNotActive,
            transition: `all ${transitionSpeed}`,
          });
          markerStation.children(".MetroMap_bg").css({
            fill: stationBgNotActive,
            opacity: 0,
            transition: `all ${transitionSpeed}`,
          });
          targetMarkerParent.css({
            stroke: stationMarkerNotActive,
            transition: `all ${transitionSpeed}`,
          });

          selStation.splice(selStation.indexOf(stationName), 1);
        } else if (typeof markerId != "undefined") {
          markerStation.children(".text").css({
            fill: stationTextActive,
            transition: `all ${transitionSpeed}`,
          });
          markerStation.children(".MetroMap_bg").css({
            fill: stationBgActive,
            opacity: 1,
            transition: `all ${transitionSpeed}`,
          });
          targetMarkerParent.css({
            stroke: stationMarkerActive,
            transition: `all ${transitionSpeed}`,
          });

          selStation.push(stationName);
        }
      }
      // if (selStation.length !== 0) {
      //   console.log(selStation);
      // }
      console.log(selStation);
    }

    getAllStation();
    $(".MetroMap_line_item").css("cursor", "pointer");
    $(".MetroMap_circle").css("cursor", "pointer");
    $(".MetroMap_station_item").css("cursor", "pointer");

    $(".MetroMap_line_item").hover(
      function () {
        let lineId = $(this).attr("data-metro-map-node-id");
        let lineStation = $("[data-line]");
        if (selStation.indexOf(lineId) == -1) {
          for (let index = 0; index < lineStation.length; index++) {
            const el = lineStation[index];
            if ($(el).attr("data-line") == lineId) {
              let elChildren = $(el).children();
              for (let index = 0; index < elChildren.length; index++) {
                const element = elChildren[index];
                let elementId = $(element).attr("data-metro-map-node-id");
                if (selStation.indexOf($(element).attr("data-metro-map-node-id")) == -1) {
                  $(element)
                    .children(".text")
                    .css({
                      fill: stationTextHover,
                      transition: `all ${transitionSpeed}`,
                    });
                  $(`[data-station="${elementId}"]`)
                    .attr({
                      "stroke-width": 2,
                    })
                    .css({
                      transition: `all ${transitionSpeed}`,
                    });
                }
              }
            }
          }
        }
      },
      function () {
        let lineId = $(this).attr("data-metro-map-node-id");
        let lineStation = $("[data-line]");
        if (selStation.indexOf(lineId) == -1) {
          for (let index = 0; index < lineStation.length; index++) {
            const el = lineStation[index];
            if ($(el).attr("data-line") == lineId) {
              let elChildren = $(el).children();
              for (let index = 0; index < elChildren.length; index++) {
                const element = elChildren[index];
                let elementId = $(element).attr("data-metro-map-node-id");
                if (selStation.indexOf($(element).attr("data-metro-map-node-id")) == -1) {
                  $(element)
                    .children(".text")
                    .css({
                      fill: stationTextNotActive,
                      transition: `all ${transitionSpeed}`,
                    });
                  $(`[data-station="${elementId}"]`)
                    .attr({
                      "stroke-width": 4,
                    })
                    .css({
                      transition: `all ${transitionSpeed}`,
                    });
                }
              }
            }
          }
        }
      }
    );
    $(".MetroMap_circle").hover(
      function () {
        let stationId = $(this).parent().attr("data-station");
        if (selStation.indexOf(stationId) == -1) {
          $(this)
            .parent()
            .attr({
              "stroke-width": 2,
            })
            .css({
              cursor: "pointer",
              transition: `all ${transitionSpeed}`,
            });
          $(`[data-metro-map-node-id=${stationId}]`)
            .children(".text")
            .css({
              fill: stationTextHover,
              transition: `all ${transitionSpeed}`,
            });
        }
      },
      function () {
        let stationId = $(this).parent().attr("data-station");
        if (selStation.indexOf(stationId) == -1) {
          $(this)
            .parent()
            .attr({
              "stroke-width": 4,
            })
            .css({
              transition: `all ${transitionSpeed}`,
            });
          $(`[data-metro-map-node-id=${stationId}]`)
            .children(".text")
            .css({
              fill: stationTextNotActive,
              transition: `all ${transitionSpeed}`,
            });
        }
      }
    );
    $(".MetroMap_station_item").hover(
      function () {
        let stationId = $(this).attr("data-metro-map-node-id");
        if (selStation.indexOf(stationId) == -1) {
          $(this)
            .children(".text")
            .css({
              fill: stationTextHover,
              transition: `all ${transitionSpeed}`,
            });
          $(`[data-station=${stationId}]`)
            .attr({
              "stroke-width": 2,
            })
            .css({
              transition: `all ${transitionSpeed}`,
            });
        }
      },
      function () {
        let stationId = $(this).attr("data-metro-map-node-id");
        if (selStation.indexOf(stationId) == -1) {
          $(this)
            .children(".text")
            .css({
              fill: stationTextNotActive,
              transition: `all ${transitionSpeed}`,
            });
          $(`[data-station=${stationId}]`)
            .attr({
              "stroke-width": 4,
            })
            .css({
              transition: `all ${transitionSpeed}`,
            });
        }
      }
    );

    let drag = false;
    let click = false;
    $(document).on("mousedown", function (e) {
      if (e.type === "mousedown") {
        click = true;
      }
    });
    $(document).on("mouseup", function (e) {
      if (e.type === "mouseup") {
        click = false;
      }
    });
    $(document).on("mousemove", function (e) {
      if (e.type === "mousemove" && click) {
        drag = true;
      } else if (e.type === "mousemove" && !click) {
        drag = false;
      }
    });

    const svgImage = document.querySelector(".mertro-map svg") || null;
    // const svgContainer = document.querySelector(".mertro-map") || null;
    const svgZoomIn = document.querySelector(".metro-zoomIn") || null;
    const svgZoomOut = document.querySelector(".metro-zoomOut") || null;

    if (svgImage === null && svgContainer === null) return;
    let viewBox = {
      x: 145,
      y: 525,
      w: 2988,
      h: 3600,
    };
    svgImage.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    const svgSize = {
      w: svgImage.clientWidth,
      h: svgImage.clientHeight,
    };
    let startPoint = { x: 0, y: 0 };
    let endPoint = { x: 0, y: 0 };
    let scale = 1;

    svgContainer.onmousewheel = function (e) {
      e.preventDefault();
      let w = viewBox.w;
      let h = viewBox.h;
      let mx = e.offsetX;
      let my = e.offsetY;
      let dw = w * Math.sign(e.deltaY) * 0.1;
      let dh = h * Math.sign(e.deltaY) * 0.1;
      let dx = (dw * mx) / svgSize.w;
      let dy = (dh * my) / svgSize.h;
      if (e.wheelDelta >= 0) {
        if (scale >= 0.3) {
          viewBox = {
            x: viewBox.x + dx,
            y: viewBox.y + dy,
            w: viewBox.w - dw,
            h: viewBox.h - dh,
          };
          scale = svgSize.w / viewBox.w;
          svgImage.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }
      } else {
        if (scale <= 2) {
          viewBox = {
            x: viewBox.x + dx,
            y: viewBox.y + dy,
            w: viewBox.w - dw,
            h: viewBox.h - dh,
          };
          scale = svgSize.w / viewBox.w;
          svgImage.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }
      }
    };

    svgContainer.onmousedown = function (e) {
      isPanning = true;
      startPoint = {
        x: e.x,
        y: e.y,
      };
    };

    svgContainer.onmousemove = function (e) {
      if (isPanning && drag) {
        svgContainer.style["cursor"] = "grabbing";
        endPoint = {
          x: e.x,
          y: e.y,
        };
        let dx = (startPoint.x - endPoint.x) / scale;
        let dy = (startPoint.y - endPoint.y) / scale;
        let movedViewBox = {
          x: viewBox.x + dx,
          y: viewBox.y + dy,
          w: viewBox.w,
          h: viewBox.h,
        };
        svgImage.setAttribute("viewBox", `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
      }
    };

    svgContainer.onmouseup = function (e) {
      if (isPanning) {
        svgContainer.style["cursor"] = "default";
        endPoint = {
          x: e.x,
          y: e.y,
        };
        let dx = (startPoint.x - endPoint.x) / scale;
        let dy = (startPoint.y - endPoint.y) / scale;
        viewBox = {
          x: viewBox.x + dx,
          y: viewBox.y + dy,
          w: viewBox.w,
          h: viewBox.h,
        };
        svgImage.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        isPanning = false;
      }
    };

    svgContainer.onmouseleave = function (e) {
      isPanning = false;
    };

    if (svgZoomIn !== null && svgZoomOut !== null) {
      svgZoomIn.addEventListener("click", function () {
        let w = viewBox.w;
        let h = viewBox.h;
        let mx = svgContainer.getBoundingClientRect().width / 2;
        let my = svgContainer.getBoundingClientRect().height / 2;
        let dw = w * 1 * 0.1;
        let dh = h * 1 * 0.1;
        let dx = (dw * mx) / svgSize.w;
        let dy = (dh * my) / svgSize.h;
        if (scale <= 2) {
          viewBox = {
            x: viewBox.x + dx,
            y: viewBox.y + dy,
            w: viewBox.w - dw,
            h: viewBox.h - dh,
          };
          scale = svgSize.w / viewBox.w;
          svgImage.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }
      });
      svgZoomOut.addEventListener("click", function () {
        let w = viewBox.w;
        let h = viewBox.h;
        let mx = svgContainer.getBoundingClientRect().width / 2;
        let my = svgContainer.getBoundingClientRect().height / 2;
        let dw = w * -1 * 0.1;
        let dh = h * -1 * 0.1;
        let dx = (dw * mx) / svgSize.w;
        let dy = (dh * my) / svgSize.h;
        if (scale >= 0.3) {
          viewBox = {
            x: viewBox.x + dx,
            y: viewBox.y + dy,
            w: viewBox.w - dw,
            h: viewBox.h - dh,
          };
          scale = svgSize.w / viewBox.w;
          svgImage.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }
      });
    }

    $(window).on("mouseup", function (e) {
      if (e.target.tagName !== "svg" && drag === false) {
        getSelectedStation(e);
      }
    });

    VirtualSelect.init({
      ele: "#sample-select",
      search: true,
      multiple: true,
      disableSelectAll: true,
      placeholder: "Выбрать линию",
      noSearchResultsText: "Ничего не найдено",
      searchPlaceholderText: "Поиск",
      optionsSelectedText: "линии выбрано",
      optionSelectedText: "линия выбрана",
      allOptionsSelectedText: "Выбраны все линии",
      options: [
        { label: "Сокольническая линия", value: "632" },
        { label: "Замоскворецкая линия", value: "629" },
        { label: "Арбатско-Покровская линия", value: "633" },
        { label: "Филёвская линия", value: "634" },
        { label: "Кольцевая линия", value: "635" },
        { label: "Калужско-Рижская линия", value: "631" },
        { label: "Таганско-Краснопресненская линия", value: "625" },
        { label: "Калининская линия", value: "628" },
        { label: "Солнцевская линия", value: "623" },
        { label: "Серпуховско-Тимирязевская линия", value: "622" },
        { label: "Люблинско-Дмитровская линия", value: "626" },
        { label: "Большая кольцевая линия / 1", value: "624" },
        { label: "Большая кольцевая линия / 2", value: "627" },
        { label: "Бутовская линия", value: "630" },
        { label: "Московское центральное кольцо", value: "621" },
        { label: "Некрасовская линия", value: "619" },
        { label: "МЦД-1", value: "620" },
        { label: "МЦД-2", value: "618" },
      ],
    });

    function setSelectedStations (input) {
      let stations = Array.from(input);

      stations.forEach(station => {
        if (selStation.indexOf(station) === -1) {
          selStation.push(station);
        } else {
          selStation.splice(selStation.indexOf(station), 1)
        }
      })
      console.log(selStation)
    }

    document.querySelector("#sample-select").addEventListener("change", function () {
      let allLineStationBackrounds = Array.from(document.querySelectorAll(".MetroMap_bg"));
      let allLineStationMarkers = Array.from(document.querySelectorAll(".MetroMap_stop"));
      let allLineStationTexts = Array.from(document.querySelectorAll(".MetroMap_station_item .text"));
      let allLineLabels = Array.from(document.querySelectorAll(".MetroMap_line_item .MetroMap_text"));

      allLineStationBackrounds.forEach((background) => {
        background.style["fill"] = stationBgNotActive;
        background.style["opacity"] = 0;
        background.style["transition"] = `all ${transitionSpeed}`;
      });
      allLineStationMarkers.forEach((marker) => {
        marker.style["stroke"] = stationMarkerNotActive;
        marker.style["transition"] = `all ${transitionSpeed}`;
      });
      allLineStationTexts.forEach((text) => {
        text.style["fill"] = stationTextNotActive;
        text.style["transition"] = `all ${transitionSpeed}`;
      });
      allLineLabels.forEach((label) => {
        label.style["font-weight"] = lineLableTextNotActive;
        label.style["transition"] = `all ${transitionSpeed}`;
      });

      this.value.forEach((id) => {
        let line = document.querySelector(`[data-line='${id}']`);
        let lineStations = Array.from(line.children);
        let lineStationsName = Array();
        let lineLabels = Array.from(document.querySelectorAll(`[data-metro-map-node-id='${id}'] .MetroMap_label .MetroMap_text`));

        lineLabels.forEach((label) => {
          label.style["font-weight"] = lineLableTextActive;
          label.style["transition"] = `all ${transitionSpeed}`;
        });

        lineStations.forEach((station) => {
          let stationBackground = Array.from(station.querySelectorAll(".MetroMap_bg"));
          let stationMarker = Array.from(document.querySelectorAll(`[data-station="${station.getAttribute("data-metro-map-node-id")}"]`));
          let stationText = Array.from(station.querySelectorAll(".text"));
          let stationName = getStationName(stationText);

          stationBackground.forEach((background) => {
            background.style["fill"] = stationBgActive;
            background.style["opacity"] = 1;
            background.style["transition"] = `all ${transitionSpeed}`;
          });
          stationMarker.forEach((marker) => {
            marker.style["stroke"] = stationMarkerActive;
            marker.style["transition"] = `all ${transitionSpeed}`;
          });
          stationText.forEach((text) => {
            text.style["fill"] = stationTextActive;
            text.style["transition"] = `all ${transitionSpeed}`;
          });

          lineStationsName.push(stationName)
        });
        setSelectedStations(lineStationsName)
        // console.log(selStation)
      });
    });
  }
}

metroInit();
