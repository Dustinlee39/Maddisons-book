let pages = [];
let current = 0;

fetch("chapters.json")
    .then(res => res.json())
    .then(data => {
        pages = data.chapters;
        render();
    });

function render() {
    const content = pages[current];
    const title = content.split("\n")[0];
    const body = content.split("\n").slice(1).join("<br><br>");

    document.getElementById("page").innerHTML =
        `<h1>${title}</h1>
         <div>${body}</div>
         <div class="page-number">Page ${current + 1} of ${pages.length}</div>`;
}

function nextPage() {
    if (current < pages.length - 1) {
        current++;
        render();
    }
}

function prevPage() {
    if (current > 0) {
        current--;
        render();
    }
}
