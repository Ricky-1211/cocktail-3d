const MockData = {
  testCategories: [
    { id: 1, name: "Blood Tests" },
    { id: 2, name: "Imaging" },
    // ...more categories
  ],
  tests: [
    { id: 1, name: "CBC", description: "Complete Blood Count", price: 20, categoryId: 1 },
    { id: 2, name: "MRI", description: "MRI Scan", price: 100, categoryId: 2 },
    // ...more tests
  ],
  locations: [
    { id: 1, name: "Wellify Main Lab", address: "123 Main St" },
    { id: 2, name: "Wellify Imaging Center", address: "456 Imaging Rd" },
    // ...more locations
  ],
  timeSlots: [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"
    // ...more slots
  ]
};

export default MockData;