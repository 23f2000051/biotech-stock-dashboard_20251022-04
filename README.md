# Biotech Company Stock Analysis Dashboard

## Summary
This dashboard displays a comprehensive analysis of stock data for a biotech company. It includes company information, stock metrics, a line chart showing shares outstanding, and a detailed data table.

## Setup
- Ensure the `shares_data.csv` and `company_info.json` files are located in the same directory as the `index.html` file.
- Open `index.html` in a web browser to view the dashboard.

## Usage
- The dashboard fetches stock and company data on page load.
- It displays metrics such as total shares, average shares, and share range.
- The chart represents max and min shares outstanding over time.
- Company details are shown in a card on the top left.
- Detailed stock data is displayed in a table layout.

## Code Explanation
- **index.html**: Sets up the page structure using Bootstrap and includes links to external libraries.
- **style.css**: Contains custom styles for layout and design consistency.
- **script.js**: Handles fetching and processing of CSV and JSON data, and updates the DOM accordingly.

## License
This project is licensed under the MIT License.
