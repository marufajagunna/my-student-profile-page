const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('#year');
yearElements.forEach((yearElement) => {
  yearElement.textContent = currentYear;
});

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

const skillData = [
  { title: 'Network Security', detail: 'Protecting systems, traffic, and endpoints' },
  { title: 'Threat Analysis', detail: 'Identifying and evaluating cyber risks' },
  { title: 'Ethical Hacking', detail: 'Testing systems with secure, responsible methods' },
  { title: 'Linux', detail: 'Command-line operations and system exploration' },
  { title: 'Python', detail: 'Automation, scripting, and security tooling' },
  { title: 'Cyber Awareness', detail: 'Promoting safe digital habits and resilience' },
];

const renderSkills = () => {
  const skillContainer = document.querySelector('[data-skill-list]');

  if (!skillContainer) {
    return;
  }

  skillContainer.innerHTML = skillData
    .map(
      (skill) => `
        <article class="skill-item">
          <strong>${skill.title}</strong>
          <span>${skill.detail}</span>
        </article>
      `
    )
    .join('');
};

const plannerStorageKey = 'student-planner-tasks';

const getTasks = () => {
  const savedTasks = localStorage.getItem(plannerStorageKey);
  if (!savedTasks) {
    return [
      { id: 1, text: 'Submit web assignment', completed: false },
      { id: 2, text: 'Prepare for software engineering quiz', completed: true },
      { id: 3, text: 'Review project mock-up', completed: false },
    ];
  }

  try {
    return JSON.parse(savedTasks);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  localStorage.setItem(plannerStorageKey, JSON.stringify(tasks));
};

const updateTaskCounts = (tasks) => {
  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  const pendingElement = document.getElementById('pendingCount');
  const completedElement = document.getElementById('completedCount');

  if (pendingElement) pendingElement.textContent = String(pendingCount);
  if (completedElement) completedElement.textContent = String(completedCount);
};

const renderTasks = () => {
  const taskList = document.getElementById('taskList');
  if (!taskList) {
    return;
  }

  const tasks = getTasks();
  updateTaskCounts(tasks);

  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="task-item"><span class="task-text">No tasks yet. Add one to begin.</span></li>';
    return;
  }

  taskList.innerHTML = tasks
    .map(
      (task) => `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
          <div class="task-main">
            <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task as complete" />
            <span class="task-text">${task.text}</span>
          </div>
          <div class="task-actions">
            <button type="button" class="icon-btn delete" aria-label="Delete task">✕</button>
          </div>
        </li>
      `
    )
    .join('');
};

const initializePlanner = () => {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');

  if (!taskForm || !taskInput) {
    return;
  }

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = taskInput.value.trim();

    if (!text) {
      taskInput.focus();
      return;
    }

    const tasks = getTasks();
    tasks.push({
      id: Date.now(),
      text,
      completed: false,
    });

    saveTasks(tasks);
    taskInput.value = '';
    renderTasks();
  });

  const taskList = document.getElementById('taskList');
  if (taskList) {
    taskList.addEventListener('change', (event) => {
      const checkbox = event.target;
      if (!(checkbox instanceof HTMLInputElement)) {
        return;
      }

      const taskItem = checkbox.closest('.task-item');
      if (!taskItem) {
        return;
      }

      const taskId = Number(taskItem.dataset.id);
      const tasks = getTasks();
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: checkbox.checked } : task
      );
      saveTasks(updatedTasks);
      renderTasks();
    });

    taskList.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('.delete');
      if (!deleteButton) {
        return;
      }

      const taskItem = deleteButton.closest('.task-item');
      if (!taskItem) {
        return;
      }

      const taskId = Number(taskItem.dataset.id);
      const tasks = getTasks().filter((task) => task.id !== taskId);
      saveTasks(tasks);
      renderTasks();
    });
  }

  renderTasks();
};

const setFieldError = (fieldName, message) => {
  const errorElement = document.querySelector(`[data-error-for="${fieldName}"]`);
  if (errorElement) {
    errorElement.textContent = message;
  }
};

const validateForm = () => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  if (!name || !email || !phone || !message) {
    return false;
  }

  let isValid = true;

  if (name.value.trim() === '') {
    setFieldError('name', 'Name is required.');
    isValid = false;
  } else {
    setFieldError('name', '');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === '') {
    setFieldError('email', 'Email is required.');
    isValid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    setFieldError('email', 'Please enter a valid email address.');
    isValid = false;
  } else {
    setFieldError('email', '');
  }

  const phonePattern = /^\d+$/;
  if (phone.value.trim() === '') {
    setFieldError('phone', 'Phone number is required.');
    isValid = false;
  } else if (!phonePattern.test(phone.value.trim())) {
    setFieldError('phone', 'Phone number must contain only digits.');
    isValid = false;
  } else {
    setFieldError('phone', '');
  }

  if (message.value.trim() === '') {
    setFieldError('message', 'Message is required.');
    isValid = false;
  } else {
    setFieldError('message', '');
  }

  return isValid;
};

const initializeContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) {
    return;
  }

  const statusMessage = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      if (statusMessage) {
        statusMessage.textContent = 'Please fix the highlighted fields and try again.';
        statusMessage.className = 'form-status error';
      }
      return;
    }

    contactForm.reset();

    if (statusMessage) {
      statusMessage.textContent = 'Your message has been sent successfully!';
      statusMessage.className = 'form-status success';
    }
  });
};

const initializePage = () => {
  renderSkills();
  initializePlanner();
  initializeContactForm();
};

document.addEventListener('DOMContentLoaded', initializePage);
