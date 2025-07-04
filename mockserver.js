import http from 'http';
import mockserver from 'mockserver';

const port = process.env.PORT || 3001;
const mockPath = './mocks';

console.log(`🚀 Starting mock server on port ${port}`);
console.log(`📁 Mock files path: ${mockPath}`);

const server = http.createServer(mockserver(mockPath));

server.listen(port, () => {
  console.log(`✅ Mock server running at http://localhost:${port}`);
  console.log('\nAvailable endpoints:');
  console.log('  GET /api/inventory-records - Inventory data');
  console.log('  GET /api/categories - Product categories');
  console.log('  GET /api/themes - Theme configurations');
  console.log('  GET /api/design-systems - Design system options');
  console.log('  GET /api/presentation-modes - Presentation modes');
  console.log('\nPress Ctrl+C to stop the server');
});

server.on('error', (err) => {
  console.error('❌ Mock server error:', err);
});