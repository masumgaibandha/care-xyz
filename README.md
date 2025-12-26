# Care.xyz / Care.IO — Baby Sitting & Elderly Care Service Platform

A caregiving service platform where users can view services, book services based on duration & location, and track booking status.

## Live Link
https://care-xyz-d1ce7.web.app

## GitHub Repo
https://github.com/masumgaibandha/care-xyz

---

## Assignment Requirements (Implemented)
- ✅ Responsive Design (Mobile / Tablet / Desktop)
- ✅ Authentication: Email/Password + Google
- ✅ Services Overview: Baby Care, Elderly Care, Sick Care
- ✅ Service Details Page (`/service/:service_id`)
- ✅ Booking Page (Private) (`/booking/:service_id`)
  - Duration selection
  - Location: Division, District, City, Area + Address
  - Auto total cost calculation (duration × rate)
  - Booking status saved as **Pending**
  - Email invoice (mailto draft)
- ✅ My Bookings Page (Private) (`/my-bookings`)
  - List bookings with status
  - View Details
  - Cancel booking
- ✅ 404 Not Found Page
- ✅ Environment variables for Firebase config
- ✅ Metadata (SEO) on Home + Service Details

---

## Tech Stack
- React + Vite
- React Router DOM
- Firebase Authentication
- TailwindCSS + DaisyUI
- react-helmet-async (SEO metadata)

---

## How to Run Locally
1. Clone the repo
2. Install dependencies
   ```bash
   npm install --legacy-peer-deps
