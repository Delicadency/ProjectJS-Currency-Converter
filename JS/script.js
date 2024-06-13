document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".bar__button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => {
        btn.classList.remove("bar__button--active");
      });
      this.classList.add("bar__button--active");
    });
    if (index === 0) {
      button.classList.add("bar__button--active");
    }
  });
});

const countButton = document.querySelector(".count__button");
countButton.addEventListener("click", () => {
  const currencyButton = document.querySelector(".bar__button--active");
  const currency = currencyButton ? currencyButton.querySelector("p").id : null;
  const valueInput = document.querySelector(".input");
  const amount = parseFloat(valueInput.value);
  const apiURL = `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`;

  if (!currency || isNaN(amount)) {
    alert("Wybierz walutę i wprowadź poprawną kwotę.");
    return;
  }
  const spinnerContainer = document.querySelector("#spinnerContainer");
  spinnerContainer.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "project-body__container--spinner"
  );
  const spinner = document.createElement("div");
  spinner.classList.add("spinner-border", "spinner", "text-light");
  spinner.setAttribute("role", "status");
  spinnerContainer.appendChild(spinner);
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[0]?.mid;
      const convertedValue = (rate * amount).toFixed(2);
      document.querySelector(".output__paragraph--value").textContent =
        convertedValue;
      spinner.remove();
      spinnerContainer.removeAttribute("class");
    })
    .catch((error) => {
      console.error("Błąd pobierania danych z API: ", error);
      spinner.remove();
      spinnerContainer.removeAttribute("class");
      alert(
        "Wystąpił błąd podczas pobierania danych. Spróbuj ponownie później."
      );
    });
});
