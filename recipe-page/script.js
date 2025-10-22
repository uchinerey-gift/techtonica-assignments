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

const STORAGE_KEY = 'recipe-checked-v1';

function persistChecked() {
    const data = [];
    document.querySelectorAll('#ingredients-list li').forEach(li => {
        const label = li.textContent.trim();
        const checked = li.classList.contains('line-through');
        data.push({ label, checked });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function restoreChecked() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        const items = Array.from(document.querySelectorAll('#ingredients-list li'));
        data.forEach(({ label, checked }) => {
            const match = items.find(li => li.textContent.trim() === label);
            if (match) {
                match.classList.toggle('line-through', checked);
                const cb = match.querySelector('.ing-check');
                if (cb) cb.checked = checked;
            }
        });
    } catch { }
}

restoreChecked();
updateCount && updateCount();
