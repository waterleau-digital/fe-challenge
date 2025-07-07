#!/usr/bin/env node

import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const currentDatasetPath = join(projectRoot, 'mocks/api/inventory-records/GET.mock');
const smallDatasetPath = join(projectRoot, 'mocks/api/inventory-records/GET-small.mock');

try {
  // Check if small dataset backup exists
  if (!existsSync(smallDatasetPath)) {
    console.log('⚠️  Small dataset backup not found, dataset may already be small');
    console.log('✅ Current dataset is likely the small version (8 records)');
    process.exit(0);
  }

  // Switch to small dataset
  copyFileSync(smallDatasetPath, currentDatasetPath);
  
  console.log('✅ Switched to small dataset (8 records)');
  console.log('🚀 Normal development mode');
  console.log('💡 Good performance expected');
  console.log('');
  console.log('To switch back to large dataset for performance testing, run:');
  console.log('  npm run dataset:large');

} catch (error) {
  console.error('❌ Error switching datasets:', error.message);
  process.exit(1);
}