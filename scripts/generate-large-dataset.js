#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const categories = [
  "Raw Materials",
  "Finished Products", 
  "Equipment",
  "Packaging",
  "Tools",
  "Consumables",
  "Electronics",
  "Chemicals",
  "Textiles",
  "Automotive Parts",
  "Building Materials",
  "Office Supplies",
  "Safety Equipment",
  "Maintenance Items",
  "Food & Beverages"
];

const statuses = ["pending", "approved", "rejected"];

const responsiblePersons = [
  "John Smith", "Maria Johnson", "Carlos Rodriguez", "Anna Williams", 
  "Peter Brown", "Linda Davis", "Robert Wilson", "Sarah Thompson",
  "Michael Garcia", "Jennifer Martinez", "David Anderson", "Lisa Taylor",
  "James Wilson", "Patricia Moore", "Christopher Jackson", "Michelle White",
  "Matthew Harris", "Elizabeth Martin", "Anthony Thompson", "Nancy Garcia",
  "Mark Rodriguez", "Karen Lewis", "Donald Clark", "Betty Robinson",
  "Steven Walker", "Helen Perez", "Kenneth Hall", "Sandra Allen",
  "Joshua Young", "Donna Hernandez", "Kevin King", "Carol Wright",
  "Brian Lopez", "Ruth Hill", "George Scott", "Sharon Green",
  "Edward Adams", "Michelle Baker", "Ronald Gonzalez", "Laura Nelson",
  "Timothy Carter", "Cynthia Mitchell", "Jason Perez", "Amy Roberts",
  "Jeffrey Turner", "Angela Phillips", "Ryan Campbell", "Brenda Parker",
  "Jacob Evans", "Emma Edwards", "Nicholas Collins", "Olivia Stewart"
];

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function generateInventoryRecords(count) {
  const records = [];
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2025-12-31');
  
  for (let i = 1; i <= count; i++) {
    const record = {
      id: i.toString(),
      date: formatDate(getRandomDate(startDate, endDate)),
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.floor(Math.random() * 50000) + 100, // $100 to $50,100
      responsible: responsiblePersons[Math.floor(Math.random() * responsiblePersons.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
    records.push(record);
  }
  
  return records;
}

// Generate 10,000 records to create performance issues
const largeDataset = generateInventoryRecords(10000);

// Create the mock file content with HTTP headers
const mockFileContent = `HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *

${JSON.stringify(largeDataset, null, 2)}`;

// Write to the large dataset file
const largeDatasetPath = join(projectRoot, 'mocks/api/inventory-records/GET-large.mock');
writeFileSync(largeDatasetPath, mockFileContent);

console.log(`✅ Generated ${largeDataset.length} inventory records`);
console.log(`📊 File size: ${(mockFileContent.length / 1024 / 1024).toFixed(2)} MB`);
console.log(`💾 Saved to: GET-large.mock`);
console.log('');
console.log('🎯 Performance issues this dataset will create:');
console.log('  - Large JSON parsing (~1.6MB)');
console.log('  - Heavy DOM rendering (10k+ elements)');
console.log('  - Slow filtering/sorting');
console.log('  - High memory consumption');
console.log('  - Poor scroll performance');
console.log('');
console.log('To switch to this dataset, run:');
console.log('  npm run dataset:large');