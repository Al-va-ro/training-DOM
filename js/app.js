window.addEventListener("load", () => {
  //Variables
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let close = alert.firstElementChild;
  let input = document.querySelector("#task");
  let arrow = document.querySelector(".arrow");
  let done = document.querySelectorAll(".fa-circle-check");
  let trash = document.querySelectorAll(".fa-trash");
  let edit = document.querySelectorAll(".fa-pencil");
  let task = document.querySelectorAll(".task");

  //Eventos
  //Cerrar la alerta en el botón con la X
  close.addEventListener("click", () => {
    alert.classList.toggle("dismissible");
  });
  //Impedir la recarga de la página pulsando enter
  input.addEventListener("focus", () => {
    document.addEventListener("keydown", (event) => {
      if (event.code == "Enter" || event.code == "NumpadEnter") {
        event.preventDefault();
      }
    });
  });

  //ELimina los espacios al principio y al final de un string
  arrow.addEventListener("click", (event) => {
    if (input.value.trim() == "") {
      event.preventDefault(); //Para no enviar por defecto el formulario
      input.value = ""; //para evitar espacios al principio
      alert.classList.remove("dismissible");
    } else {
      let text = input.value;
      input.value = "";
      id =
        Number(document.querySelector("tbody")?.lastElementChild?.id) + 1 || 0;

      document.querySelector("tbody").appendChild(generateRow(id, text));
      if (!alert.classList.contains("dismissible")) {
        alert.classList.add("dismissible");
      }
    }
  });

  //Marcar la tarea como realizada
  done.forEach((item) => {
    item.addEventListener("click", (event) => {
      deleteTask(event);
    });
  });
  //Eliminar la fila
  trash.forEach((item) => {
    item.addEventListener("click", (event) => {
      removeRow(event, false);
    });
  });
  //Activar el modo edicion desde el icono
  edit.forEach((item) => {
    item.addEventListener("click", (event) => {
      editTask(event, false);
    });
  });
  //Activar el modo edicion desde la tarea
  task.forEach((item) => {
    item.addEventListener("focus", (event) => {
      editTask(event, true);
    });
  });
});

//Functions

//Edicion tarea
const editTask = (event, onFocus) => {
  let editable = event;
  if (onFocus) {
    editable.target.classList.add("editable");
    document.addEventListener("keydown", (event) => {
      if (event.code == "Escape") {
        editable.target.classList.remove("editable");
        editable.target.blur();
        if (editable.target.innerHTML == "") {
          removeRow(editable, true);
        }
      }
    });
    editable.target.addEventListener("blur", () => {
      editable.target.classList.remove("editable");
      if (editable.target.innerHTML == "") {
        removeRow(editable, true);
      }
    });
  } else {
    let editable =
      event.target.parentNode.parentNode.previousElementSibling
        .lastElementChild;
    editable.classList.add("editable");
    editable.focus();
  }
};

//Tachado de tarea
const deleteTask = (event) => {
  let task = event.target.nextElementSibling;
  text = task.innerHTML;

  if (text.includes("<del>")) {
    task.innerHTML = task.firstElementChild.textContent;
    task.setAttribute("data-completed", "false");
  } else {
    task.innerHTML = `<del>${text}</del>`;
    task.setAttribute("data-completed", "true");
  }
};

//Eliminacion de tarea
const removeRow = (e, editing) => {
  if (editing) {
    e.target.parentNode.parentNode.remove();
  } else {
    e.target.parentNode.parentNode.parentNode.remove();
  }
};

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
  //Tachado
  newRow.firstElementChild.firstElementChild.addEventListener(
    "click",
    (event) => {
      deleteTask(event);
    }
  );
  //Edicion desde tarea
  newRow.firstElementChild.lastElementChild.addEventListener(
    "click",
    (event) => {
      editTask(event, true);
    }
  );
  //Edicion desde icono
  newRow.firstElementChild.nextElementSibling.firstElementChild.addEventListener(
    "click",
    (event) => {
      editTask(event, false);
    }
  );
  //Eliminar fila
  newRow.lastElementChild.firstElementChild.addEventListener(
    "click",
    (event) => {
      removeRow(event, false);
    }
  );
  return newRow;
};
