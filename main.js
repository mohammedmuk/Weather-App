

let theInput = document.querySelector(".input input"),
  headerDay = document.querySelector("header h3"),
  headerDate = document.querySelector("header .date"),
  headerCountry = document.querySelector("header span"),
  iconDiv = document.querySelector(".data img"),
  tempDiv = document.querySelector(".data .text div"),
  satusDiv = document.querySelector(".data .text span"),
  pressureDiv = document.querySelector(".weather-detiles .pressure .span"),
  humdityDiv = document.querySelector(".weather-detiles .humdity .span"),
  windDiv = document.querySelector(".weather-detiles .wind .span"),
  cards = document.querySelectorAll(".output-data .output"),
  cardIcons = document.querySelectorAll(".output-data .output img"),
  cardDays = document.querySelectorAll(".output-data .output .day"),
  cardTemp = document.querySelectorAll(".output-data .output .temp_data "),
  number = -8;
theInput.addEventListener("keyup", function (v) {
  if (v.keyCode === 13) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${theInput.value}&appid=b28e831567a65700e811e6fcf35b7495`
    )
      .then((response) => response.json())
      .then((weather) => {
        let icon = weather.list[0].weather[0].icon;
        headerDay.textContent = new Date(weather.list[0].dt_txt)
          .toDateString()
          .slice(0, 3);
        headerDate.textContent = new Date(weather.list[0].dt_txt)
          .toDateString()
          .slice(3, 15);
        headerCountry.textContent = weather.city.name;
        tempDiv.textContent =
          Math.round(weather.list[0].main.temp) - 273 + " C";
        satusDiv.textContent = weather.list[0].weather[0].main;
        pressureDiv.textContent = weather.list[0].main.pressure;
        humdityDiv.textContent = weather.list[0].main.humidity + "%";
        windDiv.textContent = weather.list[0].wind.speed + " km/h";
        iconDiv.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        cardIcons.forEach((img) => {
          img.src = `https://openweathermap.org/img/wn/${
            weather.list[(number += 8)].weather[0].icon
          }@2x.png`;
        });
        animation();
        number = -8;
        cardDays.forEach((d) => {
          d.textContent = new Date(weather.list[(number += 8)].dt_txt)
            .toDateString()
            .slice(0, 3);
        });
        number = -8;
        cardTemp.forEach((t) => {
          t.textContent =
            Math.round(weather.list[(number += 8)].main.temp) - 273 + " C";
        });
        cards.forEach((card) => {
          card.classList.remove("active");
        });
        cards[0].classList.add("active");
        number = -8;
        let dateCard = [
            new Date(weather.list[0].dt_txt).toDateString().slice(3, 15),
            new Date(weather.list[8].dt_txt).toDateString().slice(3, 15),
            new Date(weather.list[16].dt_txt).toDateString().slice(3, 15),
            new Date(weather.list[24].dt_txt).toDateString().slice(3, 15),
          ],
          statusCard = [
            weather.list[0].weather[0].main,
            weather.list[8].weather[0].main,
            weather.list[16].weather[0].main,
            weather.list[24].weather[0].main,
          ],
          pressureInfo = [
            weather.list[0].main.pressure,
            weather.list[8].main.pressure,
            weather.list[16].main.pressure,
            weather.list[24].main.pressure,
          ],
          humdityInfo = [
            weather.list[0].main.humidity,
            weather.list[8].main.humidity,
            weather.list[16].main.humidity,
            weather.list[24].main.humidity,
          ],
          windInfo = [
            weather.list[0].wind.speed,
            weather.list[8].wind.speed,
            weather.list[16].wind.speed,
            weather.list[24].wind.speed,
          ];

        cards.forEach((card, index) => {
          card.onclick = function () {
            cards.forEach((card, index) => {
              card.classList.remove("active");
            });
            card.classList.add("active");
            if (card.classList.contains("active")) {
              headerDay.textContent = cardDays[index].textContent;
              iconDiv.src = cardIcons[index].src;
              tempDiv.textContent = cardTemp[index].textContent;
              headerDate.textContent = dateCard[index];
              satusDiv.textContent = statusCard[index];
              pressureDiv.textContent = pressureInfo[index];
              humdityDiv.textContent = humdityInfo[index] + "%";
              windDiv.textContent = windInfo[index] + " km/h";
            }
          };
        });
        number = -8;
      });
  }
});

function animation() {
  let timeLine = gsap.timeline();
  timeLine.to(".weather-card", { duration: 1, width: 350 });
  gsap.to(".weather-card header", { duration: 1, delay: 0.8, opacity: 1 });
  gsap.to(".data img", { duration: 1, y: 10, delay: 0.8, opacity: 1 });
  gsap.to(".data .text", { duration: 1, y: -5, delay: 0.8, opacity: 1 });
  timeLine.to(".output-data .output", {
    duration: 2,
    y: 10,
    stagger: {
      each: 0.1,
      from: "end",
    },
    opacity: 1,
    ease: "back",
  });
}
