import http from 'http';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 3001;

// Cache the large dataset to avoid re-reading
console.log('📁 Loading large dataset...');
const mockData = {};

try {
  mockData['inventory-records'] = JSON.parse(readFileSync(join(__dirname, 'mocks/api/inventory-records/GET.mock'), 'utf8').split('\n\n')[1]);
  mockData['categories'] = JSON.parse(readFileSync(join(__dirname, 'mocks/api/categories/GET.mock'), 'utf8').split('\n\n')[1]);
  mockData['themes'] = JSON.parse(readFileSync(join(__dirname, 'mocks/api/themes/GET.mock'), 'utf8').split('\n\n')[1]);
  mockData['design-systems'] = JSON.parse(readFileSync(join(__dirname, 'mocks/api/design-systems/GET.mock'), 'utf8').split('\n\n')[1]);
  mockData['presentation-modes'] = JSON.parse(readFileSync(join(__dirname, 'mocks/api/presentation-modes/GET.mock'), 'utf8').split('\n\n')[1]);
  
  console.log(`✅ Loaded ${mockData['inventory-records'].length} inventory records`);
} catch (error) {
  console.error('❌ Error loading mock data:', error);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const urlParts = req.url.split('?');
  const path = urlParts[0];
  const queryString = urlParts[1];
  
  // Parse query parameters
  const queryParams = {};
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  }
  
  if (path === '/api/inventory-records') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    let data = mockData['inventory-records'];
    
    // Handle pagination
    if (queryParams.offset || queryParams.limit) {
      const offset = parseInt(queryParams.offset) || 0;
      const limit = parseInt(queryParams.limit) || data.length;
      
      // Ensure offset is not negative
      const safeOffset = Math.max(0, offset);
      
      // Slice the data for pagination
      data = data.slice(safeOffset, safeOffset + limit);
    }
    
    res.end(JSON.stringify(data));
  } else if (path === '/api/categories') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockData['categories']));
  } else if (path === '/api/themes') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockData['themes']));
  } else if (path === '/api/design-systems') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockData['design-systems']));
  } else if (path === '/api/presentation-modes') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockData['presentation-modes']));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(port, () => {
  console.log(`🚀 Starting mock server on port ${port}`);
  console.log(`✅ Mock server running at http://localhost:${port}`);
  console.log('\nAvailable endpoints:');
  console.log('  GET /api/inventory-records - Inventory data (⚠️  Large dataset for performance testing)');
  console.log('  GET /api/categories - Product categories');
  console.log('  GET /api/themes - Theme configurations');
  console.log('  GET /api/design-systems - Design system options');
  console.log('  GET /api/presentation-modes - Presentation modes');
  console.log('\nPress Ctrl+C to stop the server');
});

server.on('error', (err) => {
  console.error('❌ Mock server error:', err);
});