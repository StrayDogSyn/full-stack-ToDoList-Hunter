const reportWebVitals = (onPerfEntry) => {
  if (typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // List of vitals to report
      const vitals = [getCLS, getFID, getFCP, getLCP, getTTFB];
      
      vitals.forEach((metric) => metric(onPerfEntry)); // Report each metric
    }).catch((error) => {
      console.error("Error loading web-vitals:", error); // Handle the import error
    });
  }
};

export default reportWebVitals;
