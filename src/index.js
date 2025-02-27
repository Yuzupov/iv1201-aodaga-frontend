if (process.env.NODE_ENV === "development") {
    const { worker } = require("../mocks/browser");
    worker.start();
    console.log("Mock Service Worker is running in development mode.");
  }
  
  
  
