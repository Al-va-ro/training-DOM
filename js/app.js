document.addEventListener("DOMContentLoaded", () => {
    let icon = document.querySelector(".fa-solid");
    let header = document.querySelector("h1");
    icon.addEventListener("click", () => {
      document.body.classList.toggle("light");
      document.body.classList.toggle("dark");
      document.body.classList.toggle("tour");
      icon.classList.toggle("fa-sun");
      icon.classList.toggle("fa-moon");
      icon.classList.toggle("spin");
      header.classList.toggle("smack");
      if (header.textContent == "Good Morning!") {
        header.textContent = "Good Night!";
      } else {
        header.textContent = "Good Morning!";
      }
    });
  });
  