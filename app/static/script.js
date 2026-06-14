const form = document.getElementById("eventoForm");
const timelineEl = document.getElementById("timeline");
const countEl = document.getElementById("eventCount");

// Set datetime-local default to now
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
document.getElementById("data").value = now.toISOString().slice(0, 16);

// Count existing items on load
atualizarContador();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const dataRaw = document.getElementById("data").value;

  if (!titulo || !dataRaw) return;

  const payload = {
    titulo,
    descricao: descricao || null,
    data: new Date(dataRaw).toISOString()
  };

  try {
    const resp = await fetch("/eventos/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) throw new Error("Erro ao criar evento");

    const ev = await resp.json();
    inserirEvento(ev, true);
    form.reset();

    // Reset datetime to now
    const n = new Date();
    n.setMinutes(n.getMinutes() - n.getTimezoneOffset());
    document.getElementById("data").value = n.toISOString().slice(0, 16);

  } catch (err) {
    console.error(err);
    alert("Falha ao salvar o evento. Verifique o console.");
  }
});

function inserirEvento(ev, isNew = false) {
  // Remove empty state if present
  const empty = document.getElementById("emptyState");
  if (empty) empty.remove();

  const data = new Date(ev.data);
  const dia = data.toLocaleDateString("pt-BR");
  const hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const item = document.createElement("div");
  item.className = "tl-item" + (isNew ? " new" : "");
  item.dataset.id = ev.id;

  item.innerHTML = `
    <div class="tl-connector">
      <div class="tl-dot">
        <svg width="10" height="10" viewBox="0 0 12 10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1.5,5 4.5,8.5 10.5,1.5"/>
        </svg>
      </div>
      <div class="tl-line"></div>
    </div>
    <div class="tl-content">
      <div class="tl-meta">
        <span class="tl-date">${dia}</span>
        <span class="tl-time">${hora}</span>
      </div>
      <h3 class="tl-title">${escapeHtml(ev.titulo)}</h3>
      ${ev.descricao ? `<p class="tl-desc">${escapeHtml(ev.descricao)}</p>` : ""}
    </div>
  `;

  // Insert sorted by date
  const items = [...timelineEl.querySelectorAll(".tl-item")];
  const inserted = items.find(el => {
    const existingId = parseInt(el.dataset.id);
    return existingId > ev.id;
  });

  if (inserted) {
    timelineEl.insertBefore(item, inserted);
  } else {
    timelineEl.appendChild(item);
  }

  atualizarContador();
}

function atualizarContador() {
  const n = timelineEl.querySelectorAll(".tl-item").length;
  countEl.textContent = n === 0 ? "—" : `${n} evento${n !== 1 ? "s" : ""}`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}