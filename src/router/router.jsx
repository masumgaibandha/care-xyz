import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import ServiceDetails from "../pages/ServiceDetails";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../routes/PrivateRoute";
import BookingDetails from "../BookingDetails";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/service/:service_id", element: <ServiceDetails /> },
            { path: "/booking/:service_id", element: <PrivateRoute><Booking /></PrivateRoute> },
            { path: "/my-bookings", element: <PrivateRoute><MyBookings /></PrivateRoute> },
            {
                path: "/my-bookings/:bookingId",
                element: (<PrivateRoute>
                    <BookingDetails />
                </PrivateRoute>
                ),
            },
            { path: "/my-bookings/:bookingId", element: <PrivateRoute><BookingDetails /></PrivateRoute> },

            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
