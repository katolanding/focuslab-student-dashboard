import test from 'node:test';
import assert from 'node:assert/strict';
import { addDays, filterTasks, isValidTask, localDay, makeStarterTasks, monthDays, taskStats } from '../src/utils.js';

test('local day uses ISO-like format and handles calendar rollover', () => {
  assert.equal(localDay(new Date(2026, 0, 2)), '2026-01-02');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
});
test('starter data has unique IDs and valid entries', () => {
  const tasks = makeStarterTasks('2026-11-12');
  assert.equal(new Set(tasks.map(t => t.id)).size, tasks.length);
  assert.ok(tasks.every(isValidTask));
});
test('task statistics correctly count completion and upcoming items', () => {
  const tasks = makeStarterTasks('2026-11-12');
  const result = taskStats(tasks, '2026-11-12');
  assert.deepEqual(result, { completed: 1, pending: 3, todayCount: 1, upcoming: 2, percent: 25 });
});
test('empty task list gives zero progress', () => {
  assert.deepEqual(taskStats([], '2026-11-12'), { completed: 0, pending: 0, todayCount: 0, upcoming: 0, percent: 0 });
});
test('calendar aligns first day to monday and includes leap day', () => {
  const days = monthDays(2024, 1);
  assert.equal(days.filter(x => x !== null).length, 29);
  assert.equal(days.indexOf(1), 3);
});
test('invalid persisted tasks are rejected', () => {
  assert.equal(isValidTask({ id: 'a', title: 'x' }), false);
});

const searchTasks = [
  { id: 'done', title: 'Revisar apuntes', category: 'Matemáticas', date: '2026-11-12', done: true },
  { id: 'pending', title: 'Práctica de programación', category: 'Matemáticas', date: '2026-11-14', done: false },
  { id: 'other', title: 'Leer', category: 'Personal', date: '2026-11-13', done: false },
];

test('task search matches partial titles and categories regardless of case or accents', () => {
  assert.deepEqual(filterTasks(searchTasks, 'Todas', '  PROGRAMACION  '), [searchTasks[1]]);
  assert.deepEqual(filterTasks(searchTasks, 'Todas', 'MATEMAT'), [searchTasks[1], searchTasks[0]]);
  assert.deepEqual(filterTasks(searchTasks, 'Todas', 'LÉER'), [searchTasks[2]]);
  assert.deepEqual(filterTasks(searchTasks, 'Todas', 'Seguridad'), []);
});

test('task search combines with pending and completed filters', () => {
  assert.deepEqual(filterTasks(searchTasks, 'Pendientes', 'matematicas'), [searchTasks[1]]);
  assert.deepEqual(filterTasks(searchTasks, 'Completadas', 'matematicas'), [searchTasks[0]]);
  assert.deepEqual(filterTasks(searchTasks, 'Completadas', 'programacion'), []);
});

test('clearing task search keeps the selected filter and existing sort order', () => {
  assert.deepEqual(filterTasks(searchTasks, 'Pendientes', '  '), [searchTasks[2], searchTasks[1]]);
  assert.deepEqual(filterTasks(searchTasks, 'Todas'), [searchTasks[2], searchTasks[1], searchTasks[0]]);
});
