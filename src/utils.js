export const STORAGE_KEY = 'focuslab.tasks.v1';
export const THEME_KEY = 'focuslab.theme.v1';

export function localDay(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(day, count) {
  const [year, month, date] = day.split('-').map(Number);
  return localDay(new Date(year, month - 1, date + count));
}

export function prettyDate(day) {
  if (!day) return 'Sin fecha';
  const [year, month, date] = day.split('-').map(Number);
  return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short' }).format(new Date(year, month - 1, date));
}

export function isValidTask(task) {
  return task && typeof task.id === 'string' && typeof task.title === 'string' &&
    typeof task.done === 'boolean' && typeof task.date === 'string' &&
    ['Alta', 'Media', 'Baja'].includes(task.priority) && typeof task.category === 'string';
}

export function makeStarterTasks(today = localDay()) {
  return [
    { id: 'demo-1', title: 'Repasar fundamentos de ciberseguridad', category: 'Seguridad', date: today, priority: 'Alta', done: false },
    { id: 'demo-2', title: 'Avanzar proyecto de programación', category: 'Desarrollo', date: addDays(today, 1), priority: 'Media', done: false },
    { id: 'demo-3', title: 'Organizar apuntes de la semana', category: 'Universidad', date: addDays(today, 2), priority: 'Baja', done: true },
    { id: 'demo-4', title: 'Practicar comandos de Linux', category: 'Seguridad', date: addDays(today, 4), priority: 'Media', done: false },
  ];
}

export function taskStats(tasks, today = localDay()) {
  const completed = tasks.filter(task => task.done).length;
  const pending = tasks.length - completed;
  const todayCount = tasks.filter(task => task.date === today && !task.done).length;
  const upcoming = tasks.filter(task => !task.done && task.date > today).length;
  const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  return { completed, pending, todayCount, upcoming, percent };
}

export function monthDays(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const count = new Date(year, monthIndex + 1, 0).getDate();
  return [...Array(startOffset).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
}
