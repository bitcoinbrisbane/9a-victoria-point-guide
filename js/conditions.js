/* =========================================================
   Bay conditions widget — 9A Edinburgh St
   ---------------------------------------------------------
   SAMPLE DATA ONLY for now. The values below are generated
   locally so the widget looks alive. To wire up real data
   later, replace getConditions() with a fetch() to an API
   (e.g. BOM / Open-Meteo / WillyWeather) and return the same
   shape: { tempC, windKmh, windDir, sky, tideState, tideTime }.
   ========================================================= */

(function () {
  "use strict";

  // ---- Sample generator (deterministic-ish, varies by time of day) ----
  function getConditions() {
    var now = new Date();
    var hour = now.getHours();

    // Temperature: cooler overnight, warmer mid-afternoon (Redlands-ish)
    var base = 19 + 7 * Math.sin(((hour - 8) / 24) * 2 * Math.PI);
    var tempC = Math.round(base + (now.getMinutes() % 3)); // tiny wobble

    // Wind: a gentle bay sea-breeze that picks up in the afternoon
    var windKmh = Math.round(8 + Math.max(0, (hour - 10)) * 1.3);
    if (windKmh > 28) windKmh = 28;
    var dirs = ["NE", "E", "ESE", "SE", "NNE"];
    var windDir = dirs[(now.getDate() + hour) % dirs.length];

    // Sky: sunny by day, clear/partly at dusk, clear at night
    var sky;
    if (hour >= 6 && hour < 17) sky = (now.getDate() % 4 === 0) ? "cloud" : "sun";
    else if (hour >= 17 && hour < 19) sky = "dusk";
    else sky = "night";

    // Tide: ~2 highs and 2 lows a day. Fake a ~6h12m cycle.
    var minutesOfDay = hour * 60 + now.getMinutes();
    var cyclePos = (minutesOfDay % 372) / 372; // 0..1 within a 6h12m cycle
    var rising = cyclePos < 0.5;
    var tideState = rising ? "Rising" : "Falling";
    // Next turn time (rough, illustrative only)
    var minsToTurn = Math.round((rising ? 0.5 - cyclePos : 1 - cyclePos) * 372);
    var turn = new Date(now.getTime() + minsToTurn * 60000);
    var tideTime = turn.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    return {
      tempC: tempC,
      windKmh: windKmh,
      windDir: windDir,
      sky: sky,
      tideState: tideState,
      tideTime: tideTime
    };
  }

  var SKY_ICON = { sun: "☀️", cloud: "⛅", dusk: "🌇", night: "🌙" };

  function render() {
    var c = getConditions();
    var $ = function (id) { return document.getElementById(id); };
    if (!$("conditions")) return;

    $("cond-sky").textContent = SKY_ICON[c.sky] || "☀️";
    $("cond-temp").textContent = c.tempC + "°";
    $("cond-wind").textContent = c.windKmh + " km/h " + c.windDir;
    $("cond-tide").textContent = c.tideState + " · turns " + c.tideTime;

    $("conditions").setAttribute(
      "title",
      "Sample conditions for Victoria Point (illustrative only). " +
      "Temp " + c.tempC + "°C, wind " + c.windKmh + " km/h " + c.windDir + ", tide " + c.tideState + "."
    );
  }

  // Render now, then refresh every 5 minutes so it feels live.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
  setInterval(render, 5 * 60 * 1000);
})();
