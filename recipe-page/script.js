document.addEventListener('DOMContentLoaded', () => {
    const checks = document.querySelectorAll('.ing-check');
    checks.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const li = e.target.closest('li');
            if (li) li.classList.toggle('line-through', e.target.checked);
        });
    });

    const steps = document.querySelectorAll('#instructions-list li');
    steps.forEach(step => {
        step.style.cursor = 'pointer';
        step.addEventListener('click', () => {
            step.classList.toggle('line-through');
        });
    });
});
