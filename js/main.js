const box = document.querySelector(".box");

const state = fetch("https://restcountries.com/v3.1/all");
state
  .then((state) => {
    if (state.status === 200) {
      return state.json();
    }
  })
  .then((datas) => {
    const country = (countries) => {
      box.innerHTML = "";
      countries.forEach((data) => {
        const div = document.createElement("div");
        const info = document.createElement("div");
        const flags = document.createElement("img");
        const name = document.createElement("p");
        const population = document.createElement("p");
        const region = document.createElement("p");
        const capital = document.createElement("p");
        const area = document.createElement("p");

        flags.src = data.flags.svg;
        flags.alt = `${data.name.common} flag`;
        name.textContent = `${data.name.common}`;
        population.textContent = `Population: ${data.population
          .toLocaleString("en-US", { useGrouping: true })
          .replace(/,/g, " ")}`;
        region.textContent = `Region: ${data.region}`;
        capital.textContent = `Capital: ${data.capital}`;
        area.textContent = `Area: ${data.area
          .toLocaleString("en-US", { useGrouping: true })
          .replace(/,/g, " ")}`;

        div.classList.add("div");
        flags.classList.add("img");
        name.classList.add("name");
        region.classList.add("region");
        capital.classList.add("capital");
        area.classList.add("area");
        info.classList.add("info");

        info.appendChild(flags);
        info.appendChild(name);
        info.appendChild(population);
        info.appendChild(region);
        info.appendChild(capital);
        info.appendChild(area);
        div.appendChild(info);
        box.appendChild(div);
      });
    };

    country(datas);

    const europe = document.querySelector(".europe");
    europe.addEventListener("click", () => {
      const regionFilterBtn = datas.filter(
        (country) => country.region === "Europe"
      );
      country(regionFilterBtn);
    });

    const africa = document.querySelector(".africa");
    africa.addEventListener("click", () => {
      const regionFilterBtn = datas.filter(
        (country) => country.region === "Africa"
      );
      country(regionFilterBtn);
    });

    const asia = document.querySelector(".asia");
    asia.addEventListener("click", () => {
      const regionFilterBtn = datas.filter(
        (country) => country.region === "Asia"
      );
      country(regionFilterBtn);
    });

    const americas = document.querySelector(".americas");
    americas.addEventListener("click", () => {
      const regionFilterBtn = datas.filter(
        (country) => country.region === "Americas"
      );
      country(regionFilterBtn);
    });

    const menu = document.querySelector(".menu");
    const filterMenu = document.querySelector(".filter__menu");
    const regionMenu = document.querySelector(".filter-region-menu");

    menu.addEventListener("click", () => {
      filterMenu.classList.toggle("menu1");
    });

    const filterBtn = document.querySelector(".filter-btn");
    filterBtn.addEventListener("click", () => {
      const filteredCountry = datas.sort((a, b) => b.population - a.population);
      country(filteredCountry);
    });

    const area = document.querySelector(".area-btn");
    area.addEventListener("click", () => {
      const areaSorted = datas.sort((a, b) => b.area - a.area);
      country(areaSorted);
    });
  })
  .catch((error) => console.log(error));

const btn = document.querySelector(".btn");
const body = document.querySelector("body");
const mode = document.getElementById("dark-btn");
const light = document.getElementById("lght-btn");

const modeLocal = localStorage.getItem("mode");

if (modeLocal) {
  body.classList.add("bg-color");
  mode.classList.toggle("hidden");
  light.classList.toggle("hidden");
}

const toggleModeBtn = () => {
  mode.classList.toggle("hidden");
  light.classList.toggle("hidden");
  body.classList.toggle("bg-color");
};

mode.addEventListener("click", () => {
  toggleModeBtn();
  localStorage.setItem("mode", "bg-color");
});
light.addEventListener("click", () => {
  toggleModeBtn();
  localStorage.setItem("mode", "");
});
