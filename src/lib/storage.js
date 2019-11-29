const LOCALSTORAGE_KEY = 'finished_lectures';

export function loadLectures() {
  const finishedJSON = localStorage.getItem(LOCALSTORAGE_KEY);
  const finished = JSON.parse(finishedJSON) || [];
  return finished;
}

export function save(slug) {
  const finished = loadLectures();
  finished.push(slug);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(finished));
}

export function finish(slug) {
  const finished = loadLectures();
  return finished.includes(slug);
}
