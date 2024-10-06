const input = document.getElementById("input__information");
const btn = document.getElementById("btn");
const box = document.getElementById("box");
const overlay = document.getElementById("overlay"); // Loader elementi

btn.addEventListener("click", () => {
  const countriesInf = input.value.trim();

  if (countriesInf === "") {
    box.innerHTML = "Please fill in the field.";
    box.classList.add("error");
    return;
  }

  const url = `https://restcountries.com/v3.1/name/${countriesInf}`;

  // Loaderni ko'rsatish
  overlay.style.display = "flex";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      box.innerHTML = "";

      // Davlalar rasimlari
      const img = document.createElement("img");
      img.src = data[0].flags.png;
      img.alt = `${countriesInf} bayrog'i`;
      img.style.width = "200px";
      img.style.height = "150px";
      img.style.margin = "10px";

      const region = document.createElement("span");
      region.innerText = `Region: ${data[0].region}`;
      region.className = "info";

      // Davlat nomi
      const nameText = data[0].name.common;
      const nameDiv = document.createElement("div");
      nameDiv.innerText = `Name: ${nameText}`;
      nameDiv.className = "info";

      // Davlalar qo'shnilari
      const borders = document.createElement("span");
      borders.innerText = `Borders: ${
        data[0].borders ? data[0].borders.join(", ") : "None"
      }`;
      borders.className = "info";

      // Davlatlar tillari
      const languagesText = Object.values(data[0].languages).join(", ");
      const languageDiv = document.createElement("div");
      languageDiv.innerText = `Languages: ${languagesText}`;
      languageDiv.className = "info";

      // Davlatlar valyutasi
      const currencies = data[0].currencies;
      const currenciesText = Object.values(currencies)
        .map((currency) => `${currency.name} (${currency.symbol})`)
        .join(", ");
      const currenciesDiv = document.createElement("div");
      currenciesDiv.innerText = `Currencies: ${currenciesText}`;
      currenciesDiv.className = "info";

      // Davlatlar aholisi
      const population = document.createElement("span");
      population.innerText = `Population:  ${data[0].population
        .toLocaleString("en-US", { useGrouping: true })
        .replace(/,/g, " ")}`;

      population.className = "info";

      // Davlatlar shaxari
      const capital = document.createElement("span");
      capital.innerText = `Capital: ${data[0].capital}`;
      capital.className = "info";

      box.appendChild(img);
      box.appendChild(nameDiv);
      box.appendChild(region);
      box.appendChild(borders);
      box.appendChild(languageDiv);
      box.appendChild(currenciesDiv);
      box.appendChild(population);
      box.appendChild(capital);
      box.classList.remove("error");
    })
    .catch((error) => {
      console.error("Ma'lumotlarni olishda xato:", error);
      box.innerHTML = "Information not found or an error occurred!";
      box.classList.add("error");
    })
    .finally(() => {
      overlay.style.display = "none";
    });

  input.value = "";
});
