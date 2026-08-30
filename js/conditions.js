/* =========================================================
   Bay conditions widget — 9A Edinburgh St
   ---------------------------------------------------------
   Temp + wind + sky: LIVE from Open-Meteo (free, no API key).
   Tide: illustrative estimate only (no free keyless tide API);
         the Tides & Weather section links to BOM for real tides.
   ========================================================= */

(function () {
  "use strict";

  // Victoria Point, QLD
  var LAT = -27.58;
  var LON = 153.31;
  var API =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" + LAT + "&longitude=" + LON +
    "&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day" +
    "&wind_speed_unit=kmh&timezone=Australia%2FBrisbane";

  var $ = function (id) { return document.getElementById(id); };

  // ---- Helpers ----
  function degToCompass(deg) {
    var pts = ["N","NNE","NE","ENE","E","ESE","SE","SSE",
               "S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return pts[Math.round(deg / 22.5) % 16];
  }

  // WMO weather code -> sky icon (day/night aware)
  function skyIcon(code, isDay) {
    if (code === 0 || code === 1) return isDay ? "☀️" : "🌙";      // clear / mainly clear
    if (code === 2) return isDay ? "⛅" : "☁️";                     // partly cloudy
    if (code === 3) return "☁️";                                    // overcast
    if (code === 45 || code === 48) return "🌫️";                    // fog
    if (code >= 51 && code <= 67) return "🌦️";                     // drizzle / rain
    if (code >= 71 && code <= 77) return "🌨️";                     // snow (unlikely here)
    if (code >= 80 && code <= 82) return "🌧️";                     // rain showers
    if (code >= 95) return "⛈️";                                    // thunderstorm
    return isDay ? "☀️" : "🌙";
  }

  // Illustrative tide estimate (NOT real data — see BOM link in the guide).
  function estimateTide() {
    var now = new Date();
    var minutesOfDay = now.getHours() * 60 + now.getMinutes();
    var cyclePos = (minutesOfDay % 372) / 372; // ~6h12m cycle
    var rising = cyclePos < 0.5;
    var minsToTurn = Math.round((rising ? 0.5 - cyclePos : 1 - cyclePos) * 372);
    var turn = new Date(now.getTime() + minsToTurn * 60000);
    return {
      state: rising ? "Rising" : "Falling",
      time: turn.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    };
  }

  function paintTide() {
    var t = estimateTide();
    if ($("cond-tide")) $("cond-tide").textContent = t.state + " · ~" + t.time;
  }

  function paintWeather(cur) {
    var temp = Math.round(cur.temperature_2m);
    var wind = Math.round(cur.wind_speed_10m);
    var dir = degToCompass(cur.wind_direction_10m);
    if ($("cond-sky")) $("cond-sky").textContent =
      skyIcon(cur.weather_code, cur.is_day === 1);
    if ($("cond-temp")) $("cond-temp").textContent = temp + "°";
    if ($("cond-wind")) $("cond-wind").textContent = wind + " km/h " + dir;
    if ($("conditions")) $("conditions").setAttribute(
      "title",
      "Live conditions for Victoria Point via Open-Meteo. Temp " + temp +
      "°C, wind " + wind + " km/h " + dir + ". Tide shown is an estimate — " +
      "see the Tides & Weather section for official BOM times."
    );
  }

  function load() {
    if (!$("conditions")) return;
    paintTide(); // instant, so the widget is never empty

    fetch(API, { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(function (data) {
        if (data && data.current) paintWeather(data.current);
      })
      .catch(function () {
        // Offline / API down: leave placeholders, note it in the tooltip.
        if ($("cond-temp") && $("cond-temp").textContent === "—")
          $("cond-temp").textContent = "–";
        if ($("conditions"))
          $("conditions").setAttribute("title",
            "Live weather unavailable right now. Tide shown is an estimate.");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
  // Refresh weather every 10 min; tick the tide estimate every 5 min.
  setInterval(load, 10 * 60 * 1000);
  setInterval(paintTide, 5 * 60 * 1000);
})();
