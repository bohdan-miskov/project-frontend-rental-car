# RentalCar Frontend

**RentalCar** is a modern, car rental platform built with React and TypeScript.
It allows users to browse available cars, view detailed information, and make
online bookings easily. The frontend communicates with a free backend API,
providing a seamless and interactive user experience without the need for
authentication.

---

## Description

This project focuses on delivering a fast and user-friendly car rental
experience. Users can:

- Browse a catalog of available cars with pagination and "Load More"
  functionality
- Filter cars by various criteria such as brand, mileage, and price
- View detailed information for each car, including images and specifications
- Book cars using a form that validates inputs (name, email, date, and optional
  comment)
- Add cars to a list of favorites for easier access later
- Receive real-time notifications for successful actions or errors

It leverages modern frontend technologies and libraries to maintain clean,
maintainable, and scalable code.

---

## Technologies Used

- **React** with **TypeScript** for building robust UI components
- **Vite** for fast development and optimized build
- **Redux Toolkit** for state management
- **Formik** + **Yup** for form handling and validation
- **react-datepicker** for user-friendly date selection
- **react-select** for advanced dropdowns and filter selection
- **react-hot-toast** for elegant toast notifications
- **CSS Modules** for modular and maintainable styling

---

## Features

- **Car Catalog:** Browse cars with high-quality images and essential
  information
- **Car Details:** View complete details of a selected car including mileage,
  location, and description
- **Booking System:** Fill out a validated form to book a car for a specific
  date
- **Filtering & Search:** Apply filters to find cars that match user preferences
- **Favorites:** Mark cars as favorites for easy reference
- **Notifications:** Real-time success and error messages improve user feedback

---

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/project-frontend-rental-car.git

cd project-frontend-rental-car

npm install

npm run dev
```

The app will run on the URL provided by Vite, typically http://localhost:5173.

## Notes

- **Public Backend:** The backend API is free, so some data may be limited.
- **Modular Styling:** Styling and layout are modularized using CSS Modules for
  easier maintenance.
- **Future Expansion:** The project can serve as a base for a larger rental
  platform with authentication and payment integration in the future.
