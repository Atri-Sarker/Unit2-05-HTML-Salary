// Script for Area of Triangle
"use strict";

// Elements
const hoursWorkedInput = document.getElementById('hoursWorkedInput');
const hourlyRateInput = document.getElementById('hourlyRateInput');
const resultHolder = document.getElementById('resultHolder');


// Clamp function, since JS does not have one by default
function clamp(minimum, value, maximum) {
  return Math.min(Math.max(value, minimum), maximum)
}

// Federal Tax Rates; via 
/*
15% on the first $53,359 of taxable income
20.5% on portion over $53,359
26% on portion over $106,717
29% on the portion over $165,430
33% of taxable income over $235,675

Stats from: https://www.legalline.ca/legal-answers/tax-rates-much-pay/#:~:text=Ontario
*/

// Function to calculate federal tax
function calculateFederalTax(income) {
  // There's probably a better way to do this
  let portion1 = Math.min(income, 53_359) * 15;
  let portion2 = clamp(0, income - 53_359, 106_717 - 53_359) * 20.5;
  let portion3 = clamp(0, income - 106_717, 165_430 - 106, 717) * 26;
  let portion4 = clamp(0, income - 165430, 235675 - 165430) * 29;
  let portion5 = Math.max(income - 235675, 0) * 33;

  // Sum of All Portions
  let portionSum = portion1 + portion2 + portion3 + portion4 + portion5;
  // Divide by 100, due to percentage(%)
  let totalFederalTax = portionSum / 100;
  return totalFederalTax.toFixed(2);
}

// Ontario Tax Rates
/*
5.05% on the first $49,231 of taxable income
9.15% on portion over $49,231 up-to $98,463
11.16% on portion over $98,463 up-to $150,000
12.16% on portion over $150,000 up-to $220,000
13.16% on the amount over $220,000

Stats from: https://www.legalline.ca/legal-answers/tax-rates-much-pay/#:~:text=Ontario
*/

// Function to calculate ontario tax
function calculateOntarioTax(income) {
  let portion1 = Math.min(income, 49_231) * 5.05;
  let portion2 = clamp(0, income - 49_231, 98_463 - 49_231) * 9.15;
  let portion3 = clamp(0, income - 98_463, 150_000 - 98_463) * 11.1;
  let portion4 = clamp(0, income - 150_000, 220_000 - 150_000) * 12.16;
  let portion5 = Math.max(income - 220_000, 0) * 13.16;

  // Sum of All Portions
  let portionSum = portion1 + portion2 + portion3 + portion4 + portion5;
  // Divide by 100, due to percentage(%)
  let totalOntarioTax = portionSum / 100;
  return totalOntarioTax.toFixed(2);
}


// Calculate Button
const calculateBtn = document.getElementById('CalculateBtn');

// Code for calculating salary
function Calculate() {

  // Get Inputs
  const hoursWorked = Number(hoursWorkedInput.value);
  const hourlyRate = Number(hourlyRateInput.value);

  // Total Taxable Income
  let totalIncome = hoursWorked * hourlyRate;

  let totalFederalTax = calculateFederalTax(totalIncome);
  let totalOntarioTax = calculateOntarioTax(totalIncome);

  let finalIncome = totalIncome - totalFederalTax - totalOntarioTax;

  // Make Result String
  // toLocaleString() formats numbers using commas
  let result = `
  <p>Total Taxable Income : $${totalIncome.toLocaleString()}</p>
  <p>Federal Tax : $${totalFederalTax.toLocaleString()}</p>
  <p>Ontario Tax : $${totalOntarioTax.toLocaleString()}</p>
  
  <b>Final Pay : $${finalIncome.toLocaleString()}</b>
  `;

  // Display Result
  resultHolder.innerHTML = result;
}

// Connect button click to the Calculate() function
calculateBtn.onclick = Calculate
