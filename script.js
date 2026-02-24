
  const menuToggle = document.getElementById('menu-toggle');
  const searchToggle = document.getElementById('search-toggle');
  const menu = document.getElementById('menu');

  // Function to toggle dropdown
  function toggleMenu(e) {
    e.stopPropagation(); // Prevent closing immediately
    menu.classList.toggle('show');
  }

  // Show menu when either icon is clicked
  menuToggle.addEventListener('click', toggleMenu);
  searchToggle.addEventListener('click', toggleMenu);

    // Toggle search input visibility
  const toggle = document.getElementById('search-toggle');
  const input = document.getElementById('search-input');
  toggle.addEventListener('click', () => input.classList.toggle('show'));

  // Hide menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      !menu.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      !searchToggle.contains(e.target)
    ) {
      menu.classList.remove('show');
    }
  });

document.addEventListener('DOMContentLoaded', async () => {
  const input = document.getElementById('dropdown-search');
  const resultsBox = document.getElementById('search-results');

  let posts = [];

  // Load local JSON only once
  try {
    const res = await fetch('/data/articles.json');
    posts = await res.json();
  } catch (err) {
    console.error('Failed to load local JSON:', err);
  }

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      resultsBox.innerHTML = '';
      return;
    }

    const matches = posts
      .filter(post => post.title.toLowerCase().includes(query))
      .slice(0, 5);

    resultsBox.innerHTML = matches
      .map(item => `<a href="/articles/${item.slug}" class="result-item">${item.title}</a>`)
      .join('');
  });
});

async function copier(source) {
const clipIcon = document.getElementById("clip");
let textToCopy = "";

if (typeof source === "string") {
    const el = document.getElementById(source);

    if (el) {
        // Copy text from element
        textToCopy = el.textContent || el.innerText || "";

        // Show "Copied!" feedback (only for element)
        clipIcon.className = "";     
        clipIcon.textContent = "Copied!";

        setTimeout(() => {
            clipIcon.className = "fa fa-clipboard clipboard"; 
            clipIcon.textContent = "";
        }, 1000);
    } else {
        // Copy the string itself (raw text/link)
        textToCopy = source;
        // No UI change
    }
} else if (source instanceof HTMLElement) {
    textToCopy = source.textContent || source.innerText || "";

    // Show "Copied!" feedback (only for element)
    clipIcon.className = "";     
    clipIcon.textContent = "Copied!";

    setTimeout(() => {
        clipIcon.className = "fa fa-clipboard clipboard"; 
        clipIcon.textContent = "";
    }, 1000);
} else {
    console.error("Invalid source for copier");
    return;
}

try {
    await navigator.clipboard.writeText(textToCopy);
    console.log("Copied:", textToCopy);
} catch (err) {
    console.error("Couldn't Copy", err);
}
}


// Floating icons
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 600);
});

backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});
