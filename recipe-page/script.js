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

const addBtn = document.getElementById('add-ing');
const ingList = document.getElementById('ingredients-list');

function bindCheckbox(li) {
    const cb = li.querySelector('.ing-check');
    if (!cb) return;
    cb.addEventListener('change', (e) => {
        li.classList.toggle('line-through', e.target.checked);
        persistChecked();
        updateCount();
    });
}

if (addBtn && ingList) {
    addBtn.addEventListener('click', () => {
        const text = prompt('New ingredient:');
        if (!text) return;
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<label><input type="checkbox" class="ing-check"> ${text}</label>`;
        ingList.appendChild(li);
        bindCheckbox(li);
        persistChecked();
        updateCount();
    });
}

// bind existing checkboxes
document.querySelectorAll('#ingredients-list li').forEach(bindCheckbox);
