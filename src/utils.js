import { rowHeaing, ClassName } from './const';
import Chart from 'chart.js/auto';
import { ChartData } from './mock';

const createChart = () => {
  let chart;
  const ctx = tableWrapper.querySelector('#tableChart');
  return function(tr) {
    let label = tr.querySelector('th').textContent;
    if (chart) {
      chart.destroy();
    }
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ChartData.LABELS,
        datasets: [{
          label: label,
          data: ChartData.DATA,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
};

const removeRow = () => {
  const chartRow = tableWrapper.querySelector('.js-chart');
  if (chartRow) {
    chartRow.remove();
  }
};

export const createRow = (tr) => {
  removeRow();
  tr.insertAdjacentHTML('afterend', '<tr class="js-chart"><td colspan="4" class="bg-white"><canvas id="tableChart"></canvas</td></tr>')
  createChart()(tr);
};

export const createTable = (data) => {
  let table = '<table class="table js-table"><tbody>';
  for (let i = 0; i < Object.values(data[0]).length; i++) {
    table += `<tr id="row-${i}">`;
    table += `<th>${rowHeaing[i]}</th>`;
    for (let j = 0; j < data.length; j++) {
      let str;
      let diff = Object.values(data[j])[i].diff;
      let cellClass = ClassName.BG_DEFAULT;
      
      if (typeof Object.values(data[j])[i] === 'object') {
        str = `${Object.values(data[j])[i].count}`;
        if (diff) {
          cellClass = Number(diff) < 0 ? ClassName.BG_DANGER : ClassName.BG_SUCCESS;
          if (Number(diff) === 0) {
            cellClass = ClassName.BG_DEFAULT;
          }
          str += `<strong class="${Number(diff) < 0 ? ClassName.TEXT_DANGER : ClassName.TEXT_SUCCESS}">${diff}%</strong>`;
        }
      }
      else {
        str = Object.values(data[j])[i];
      }
      table += `<td class="${cellClass}">${str}</td>`;
    }
    table += '</tr>'
  }
  table += '</tbody></table>';
  return table;
};

