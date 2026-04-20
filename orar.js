const days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri"];
const hours = 7;

/* =========================
   MATERII
========================= */
const subjects = [
  { name: "Limba și literatura română", color: "#ffb3b3" },
  { name: "Engleză", color: "#ffd699" },
  { name: "Franceză", color: "#ffccf2" },
  { name: "Limba latină", color: "#d9b3ff" },
  { name: "Matematică", color: "#b3d1ff" },
  { name: "Biologie", color: "#b3ffcc" },
  { name: "Fizică", color: "#c2f0f0" },
  { name: "Chimie", color: "#ffffb3" },
  { name: "Istorie", color: "#f2d9b3" },
  { name: "Geografie", color: "#d1ffb3" },
  { name: "Educație socială", color: "#e6ccff" },
  { name: "Religie", color: "#ffd9b3" },
  { name: "TIC", color: "#b3e6ff" },
  { name: "Educație muzicală", color: "#ffcce6" },
  { name: "Educație plastică", color: "#ffb3d9" },
  { name: "Educație fizică", color: "#b3ffb3" },
  { name: "Dirigenție", color: "#cccccc" }
];

/* =========================
   INIT
========================= */
buildSubjects();
buildTable();

/* =========================
   SIDEBAR
========================= */
function buildSubjects() {
  const box = document.getElementById("subjects");

  subjects.forEach(s => {
    const div = document.createElement("div");
    div.className = "subject";
    div.draggable = true;
    div.innerText = s.name;
    div.style.background = s.color;

    div.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", s.name);
    });

    box.appendChild(div);
  });
}

/* =========================
   TABLE
========================= */
function buildTable() {
  let html = "<tr><th>Ora</th>";

  days.forEach(d => html += `<th>${d}</th>`);
  html += "</tr>";

  for (let i = 1; i <= hours; i++) {
    html += "<tr>";
    html += `<td>Ora ${i}</td>`;

    for (let j = 0; j < days.length; j++) {
      html += "<td></td>";
    }

    html += "</tr>";
  }

  document.getElementById("table").innerHTML = html;

  enableDrop();
}

/* =========================
   DRAG & DROP + EDIT
========================= */
function enableDrop() {
  const cells = document.querySelectorAll("td");

  cells.forEach(cell => {

    cell.addEventListener("dragover", e => {
      e.preventDefault();
      cell.classList.add("hover");
    });

    cell.addEventListener("dragleave", () => {
      cell.classList.remove("hover");
    });

    cell.addEventListener("drop", e => {
      e.preventDefault();

      const name = e.dataTransfer.getData("text/plain");
      const subj = subjects.find(s => s.name === name);

      cell.innerText = name;
      cell.style.background = subj.color;
      cell.dataset.subject = name;

      cell.classList.remove("hover");
    });

    cell.addEventListener("click", () => {
      if (cell.dataset.subject) {
        cell.innerText = "";
        cell.style.background = "#f9f9f9";
        delete cell.dataset.subject;
        return;
      }

      let input = document.createElement("input");
      input.value = cell.innerText;

      input.onblur = () => {
        cell.innerText = input.value;
      };

      cell.innerHTML = "";
      cell.appendChild(input);
      input.focus();
    });

  });
}

/* =========================
   STYLE
========================= */
function applyStyle() {
  const font = document.getElementById("font").value;
  const theme = document.getElementById("themeColor").value;
  const grid = document.getElementById("gridColor").value;

  document.documentElement.style.setProperty("--font", font);
  document.documentElement.style.setProperty("--theme", theme);
  document.documentElement.style.setProperty("--grid", grid);
}

/* =========================
   PDF
========================= */
function downloadPDF() {
  const element = document.getElementById("table");

  html2pdf().set({
    margin: 0.3,
    filename: "orar.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { format: "a4", orientation: "landscape" }
  }).from(element).save();
}