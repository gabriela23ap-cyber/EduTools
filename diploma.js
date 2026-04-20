document.addEventListener("input", update);

function update() {
  document.getElementById("outName").innerText = document.getElementById("name").value;
  document.getElementById("outClass").innerText = document.getElementById("class").value;
  document.getElementById("outSchool").innerText = document.getElementById("school").value;
  document.getElementById("outCity").innerText = document.getElementById("city").value;
  document.getElementById("outReason").innerText = document.getElementById("reason").value;
  document.getElementById("outDir").innerText = document.getElementById("director").value;
  document.getElementById("outTeach").innerText = document.getElementById("teacher").value;
}

/* THEME */
function setTheme(color) {
  document.documentElement.style.setProperty("--main", color);
}
function setBorder(type) {
  const border = document.querySelector(".border");

  border.classList.remove("solid", "dashed", "dotted", "double", "soft");

  border.classList.add(type);
}
/* PDF */
function downloadPDF() {
  const el = document.getElementById("diploma");

  html2pdf().set({
    margin: 0,
    filename: "diploma.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { format: "a4", orientation: "landscape" }
  }).from(el).save();
}

/* init */
update();