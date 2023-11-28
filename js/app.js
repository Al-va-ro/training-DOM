window.addEventListener("load", () => {
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let close = alert.firstElementChild;
  let input = document.querySelector("#task");
  let arrow = document.querySelector(".arrow");
  close.addEventListener("click", () => {
    alert.classList.add("dismissible");
  });
  input.addEventListener("focus", () => {
    document.addEventListener("keydown", (event) => {
      // console.log(event.code);
      //Desde la linea 10 hasta la 11, es para que
      //salga por consola la tecla que hemos pulsado
      //al pulsar en focus (barra verde).
      if (event.code == "Enter" || event.code == "numpadEnter") {
        event.preventDefault();
      }
    });
  });
  arrow.addEventListener("click", (event) => {
    if (input.value.trim() == "") {
      //ELimina los espacios
      //al principio y al final de un string
      console.log("empty");
      event.preventDefault(); //Para no enviar por defecto el formulario
      input.value = ""; //para evitar espacios al principio
      alert.classList.remove("dismissible");
    } else {
      let text = input.value;
      input.value = "";
      id = Number(document.querySelector("tbody").lastElementChild.id) + 1 || 0;

      document.querySelector("tbody").appendChild(generateRow(id, text));
      if (!alert.classList.contains("dismissible")) {
        alert.classList.add("dismissible");
      }
    }
  });
});
//Refactorizamos el codigo encapsulando la funcion
const generateRow = (id, text) => {
  //Creando una nueva fila
  let newRow = document.createElement("tr");
  newRow.setAttribute("id", id);
  newRow.innerHTML = `
  <td>
  <i class="fa-solid fa-circle-check fa-2xl"></i>
  <span class="task" contenteditable="true">${text}</span>
</td>
<td>
  <span class="fa-stack fa-2x">
    <i class="fa-solid fa-square fa-stack-2x"></i>
    <i class="fa-solid fa-pencil fa-stack-1x fa-inverse"></i>
  </span>
</td>
<td>
  <span class="fa-stack fa-2x">
    <i class="fa-solid fa-square fa-stack-2x"></i>
    <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i>
  </span>
</td>
  `;
  return newRow;
};
