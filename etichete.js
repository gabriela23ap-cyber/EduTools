/* =========================
   DATA
========================= */
let studentsList = [];

/* =========================
   PARSE
========================= */
function parseList(text) {
  return text
    .split("\n")
    .map(l => l.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
}

/* =========================
   GENERATE
========================= */
function generate() {

  const title = document.getElementById("title").value;

  const lines = document.getElementById("students").value
    .split("\n")
    .map(l => l.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

  const container = document.getElementById("labels");
  container.innerHTML = "";

  lines.forEach(line => {

    // split pe |
    const parts = line.split("/").map(p => p.trim());

    const name = parts[0] || "";
    const className = parts[1] || "";
    const school = parts[2] || "";
    const work = parts[3] || "";

    const div = document.createElement("div");
    div.className = "label";

    div.innerHTML = `
      ${title ? `<div style="font-size:11px; text-align:center; margin-bottom:4px;">${title}</div>` : ""}
      <b>${name}</b><br>
      Clasa: ${className}<br>
      Școala: ${school}<br>
      Lucrare: ${work}
    `;

    container.appendChild(div);
  });
}

/* =========================
   SORT
========================= */
function sortNames() {

  let lines = document.getElementById("students").value
    .split("\n")
    .map(l => l.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

  lines.sort((a, b) => {
    const nameA = a.split("|")[0].trim();
    const nameB = b.split("|")[0].trim();
    return nameA.localeCompare(nameB, 'ro', { sensitivity: 'base' });
  });

  document.getElementById("students").value = lines.join("\n");

  generate();
}