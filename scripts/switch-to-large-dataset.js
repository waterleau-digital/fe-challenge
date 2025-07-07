#!/usr/bin/env node

import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const smallDatasetPath = join(projectRoot, 'mocks/api/inventory-records/GET.mock');
const largeDatasetPath = join(projectRoot, 'mocks/api/inventory-records/GET-large.mock');
const backupPath = join(projectRoot, 'mocks/api/inventory-records/GET-small.mock');

try {
  // Check if large dataset exists
  if (!existsSync(largeDatasetPath)) {
    console.error('❌ Large dataset not found. Please run generate-large-dataset.js first.');
    process.exit(1);
  }

  // Backup current small dataset if not already backed up
  if (!existsSync(backupPath)) {
    copyFileSync(smallDatasetPath, backupPath);
    console.log('💾 Backed up small dataset');
  }

  // Switch to large dataset
  copyFileSync(largeDatasetPath, smallDatasetPath);
  
  console.log('✅ Switched to large dataset (10,000 records)');
  console.log('📊 Performance testing mode enabled');
  console.log('⚠️  Application will experience performance issues - this is intentional!');
  console.log('');
  console.log('To switch back to small dataset, run:');
  console.log('  npm run dataset:small');

} catch (error) {
  console.error('❌ Error switching datasets:', error.message);
  process.exit(1);
}