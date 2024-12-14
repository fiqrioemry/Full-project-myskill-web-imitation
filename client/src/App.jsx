import Home from "./pages/Home";
import Learning from "./pages/Learning";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/ui/layout/MainLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthRoute from "./middleware/AuthRoute";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/ui/layout/DashboardLayout";
import Profile from "./pages/Profile";
import Purchase from "./pages/Purchase";
import Activity from "./pages/Activity";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />

        <Route
          path="/sign-up"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthRoute>
              <MainLayout />
            </AuthRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="e-learning" element={<Learning />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <DashboardLayout />
            </AuthRoute>
          }
        >
          <Route path="my-profile" element={<Profile />} />
          <Route path="my-purchase" element={<Purchase />} />
          <Route path="my-activity" element={<Activity />} />
          <Route path="my-transaction" element={<Transaction />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;