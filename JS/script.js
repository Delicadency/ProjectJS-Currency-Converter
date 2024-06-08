document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.bar__button');
    buttons.forEach((button, index) => {
      button.addEventListener('click', function() {
        buttons.forEach((btn) => {
          btn.classList.remove('bar__button--active');
        });
        this.classList.add('bar__button--active');
      });
      if (index === 0) {
        button.classList.add('bar__button--active');
      }
    });
  });