document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button[data-target]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});