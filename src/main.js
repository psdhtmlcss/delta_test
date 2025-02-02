import './style.css';
import { data } from './mock';
import { createTable, createRow } from './utils';
import { TagName, ClassName } from './const';

tableWrapper.insertAdjacentHTML('beforeend', createTable(data));

const onTableClick = (evt) => {
  if (evt.target.tagName === TagName.TABLE || evt.target.parentElement.id === ClassName.ROW_0) {
    return;
  }
  createRow(evt.target.parentElement);
};

(function setHandler() {
  const table = document.querySelector('.js-table');
  if (table) {
    table.addEventListener('click', onTableClick);
  }
})();