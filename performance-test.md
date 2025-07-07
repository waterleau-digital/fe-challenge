# Performance Testing Instructions

## Prerequisites

First, switch to the large dataset to enable performance testing:

```bash
npm run dataset:large
```

## How to Reproduce Performance Issues

### 1. Start the Application
```bash
npm run dev:with-mock
```

### 2. Open Browser DevTools
- Press F12 or right-click → Inspect
- Go to **Performance** tab
- Go to **Network** tab to monitor data transfer

### 3. Test Scenarios

#### Initial Load Performance
1. **Record Performance**: Start recording in Performance tab
2. **Refresh Page**: Press F5 to reload
3. **Stop Recording**: Wait for page to fully load, then stop
4. **Expected Issues**: 
   - Long loading time (~2-5 seconds)
   - Large network payload (1.6MB)
   - Browser freezing during rendering

#### Filtering Performance  
1. **Open Performance tab** and start recording
2. **Type in search box** rapidly: "Raw"
3. **Stop recording** after typing
4. **Expected Issues**:
   - Input lag/delay
   - Long scripting time during filtering
   - Main thread blocking

#### Scrolling Performance
1. **Start Performance recording**
2. **Scroll rapidly** up and down through the table
3. **Stop recording**
4. **Expected Issues**:
   - Dropped frames (should be 60fps)
   - High memory usage
   - Janky scroll performance

#### Sorting Performance
1. **Start Performance recording**
2. **Click on column headers** to sort (Date, Value, etc.)
3. **Stop recording**
4. **Expected Issues**:
   - Long task blocking main thread
   - UI freezing during sort
   - High CPU usage

### 4. Memory Usage Test
1. **Go to Memory tab** in DevTools
2. **Take heap snapshot** before loading data
3. **Load the page** with 10k records
4. **Take another heap snapshot**
5. **Compare memory usage** - should see significant increase

## Expected Baseline Metrics (Before Optimization)

- **Initial Load**: 2-5 seconds
- **Network Payload**: ~1.6MB
- **Memory Usage**: 50-100MB increase
- **Rendering Time**: 1-3 seconds for table
- **Filter Response**: 200-500ms delay
- **Sort Time**: 500ms-2s blocking

## Optimization Goals

Candidates should aim for:
- **Initial Load**: <1 second
- **Network Payload**: <100KB (with pagination)
- **Memory Usage**: <20MB increase
- **Rendering Time**: <100ms
- **Filter Response**: <50ms
- **Sort Time**: <100ms non-blocking