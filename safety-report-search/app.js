const searchInput = document.getElementById("searchInput");
const clearButton = document.getElementById("clearButton");
const resultCount = document.getElementById("resultCount");
const cardGrid = document.getElementById("cardGrid");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");

let chapters = [];

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  })[char]);
}

function stripMarkdown(value) {
  return String(value).replace(/\*\*/g, "");
}

function highlight(value, keyword) {
  const plain = stripMarkdown(value);
  if (!keyword) return escapeHTML(plain);

  const escapedText = escapeHTML(plain);
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedKeyword})`, "gi");
  return escapedText.replace(regex, "<mark>$1</mark>");
}

function formatBody(body, keyword) {
  return String(body)
    .split(/\n\s*\n/)
    .map((paragraph) => `<p>${highlight(paragraph, keyword)}</p>`)
    .join("");
}

function render() {
  const keyword = searchInput.value.trim();
  const normalizedKeyword = keyword.toLocaleLowerCase("ko-KR");

  const filtered = chapters.filter((item) => {
    if (!normalizedKeyword) return true;

    const title = String(item.제목 ?? "").toLocaleLowerCase("ko-KR");
    const body = stripMarkdown(item.본문 ?? "").toLocaleLowerCase("ko-KR");

    return title.includes(normalizedKeyword) || body.includes(normalizedKeyword);
  });

  resultCount.textContent = `결과 ${filtered.length}건`;
  clearButton.hidden = keyword.length === 0;
  emptyState.hidden = filtered.length !== 0;

  cardGrid.innerHTML = filtered.map((item) => `
    <article class="report-card">
      <div class="card-head">
        <span class="chapter-badge">제${escapeHTML(item.장)}장</span>
        <h2>${highlight(item.제목, keyword)}</h2>
      </div>
      <div class="card-body">
        ${formatBody(item.본문, keyword)}
      </div>
    </article>
  `).join("");
}

async function loadChapters() {
  try {
    const response = await fetch("./장데이터.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("장데이터.json 형식이 올바뉴지 않습니다.");
    }

    chapters = data;
    errorState.hidden = true;
    render();
  } catch (error) {
    console.error(error);
    chapters = [];
    cardGrid.innerHTML = "";
    resultCount.textContent = "결과 0건";
    emptyState.hidden = true;
    errorState.hidden = false;
  }
}

searchInput.addEventListener("input", render);

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  render();
  searchInput.focus();
});

loadChapters();
