function showsidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (window.innerWidth < 800) {
    sidebar.style.display = "flex";
  }
}
function hidesidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

document.body
  .getElementsByClassName("sidebar")[0]
  .addEventListener("click", () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  });
