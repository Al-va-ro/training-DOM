document.addEventListener("DOMContentLoaded", () => {
  let icon = document.querySelector(".fa-solid");
  let header = document.querySelector("h1");
  icon.addEventListener("click", () => {
    document.body.classList.toggle("betis");
    document.body.classList.toggle("sevilla");
    document.body.classList.toggle("tour");
    icon.classList.toggle("fa-football");
    icon.classList.toggle("fa-bicycle");
    icon.classList.toggle("spin");
    header.classList.toggle("smack");
    if (header.textContent == "Hay una leyenda que recorre el mundo entero...") {
      header.textContent = "Sevillista seré hasta la muerte...";
    } else {
      header.textContent = "Hay una leyenda que recorre el mundo entero...";
    }
  });
});
