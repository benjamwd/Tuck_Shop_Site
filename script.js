document.addEventListener("DOMContentLoaded", function() {
  const categoryTitles = document.querySelectorAll('.category-title');

  categoryTitles.forEach(function(title) {
    title.addEventListener('click', function() {
      const items = this.nextElementSibling;
      items.classList.toggle('show');
    });
  });
});