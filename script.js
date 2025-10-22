// JavaScript
async function fetchData() {
    try {
        const csvResponse = await fetch('shares_data.csv');
        if (!csvResponse.ok) throw new Error('Failed to load shares data');
        const csvText = await csvResponse.text();
        const jsonResponse = await fetch('company_info.json');
        if (!jsonResponse.ok) throw new Error('Failed to load company info');
        const companyInfo = await jsonResponse.json();
        processCSVData(csvText);
        displayCompanyInfo(companyInfo);
    } catch (error) {
        displayError(error.message);
    }
}

document.addEventListener('DOMContentLoaded', fetchData);

function processCSVData(csvText) {
    const rows = csvText.trim().split('\n');
    const headers = rows[0].split(',');
    const data = rows.slice(1).map(row => {
        const values = row.split(',');
        return headers.reduce((obj, header, i) => {
            obj[header.trim()] = values[i]?.trim() || '0';
            return obj;
        }, {});
    });
    displayMetrics(data);
    displayChart(data);
    renderTable(data);
}

function displayMetrics(data) {
    const totalShares = data.reduce((sum, record) => sum + parseInt(record.max_shares, 10) || 0, 0);
    const averageShares = totalShares / data.length;
    const metricsHtml = `
        <li class="list-group-item">Total Shares: ${totalShares}</li>
        <li class="list-group-item">Average Shares: ${averageShares.toFixed(2)}</li>
        <li class="list-group-item">Share Range: ${Math.min(...data.map(record => parseInt(record.min_shares, 10) || 0))} - ${Math.max(...data.map(record => parseInt(record.max_shares, 10) || 0))}</li>
    `;
    document.getElementById('key-metrics').innerHTML = metricsHtml;
}

function displayCompanyInfo(info) {
    const infoHtml = `
        <strong>Name:</strong> ${info.name}<br>
        <strong>Founded:</strong> ${info.founded}<br>
        <strong>CEO:</strong> ${info.ceo}<br>
        <strong>Headquarters:</strong> ${info.headquarters}<br>
    `;
    document.getElementById('company-info').innerHTML = infoHtml;
}

function displayChart(data) {
    const ctx = document.getElementById('shares-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(record => record.date),
            datasets: [
                {
                    label: 'Max Shares',
                    data: data.map(record => parseInt(record.max_shares, 10) || 0),
                    borderColor: '#007bff',
                    borderWidth: 2,
                },
                {
                    label: 'Min Shares',
                    data: data.map(record => parseInt(record.min_shares, 10) || 0),
                    borderColor: '#28a745',
                    borderWidth: 2,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
        }
    });
}

function renderTable(data) {
    const tbody = document.getElementById('stock-table').querySelector('tbody');
    const rowsHtml = data.map(record => `
        <tr>
            <td>${record.date}</td>
            <td>${record.max_shares}</td>
            <td>${record.min_shares}</td>
        </tr>
    `).join('');
    tbody.innerHTML = rowsHtml;
    document.getElementById('loading').classList.add('d-none');
    document.getElementById('content').classList.remove('d-none');
}

function displayError(errorMessage) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = errorMessage;
    errorEl.classList.remove('d-none');
    document.getElementById('loading').classList.add('d-none');
}
