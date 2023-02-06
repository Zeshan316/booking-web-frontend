import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./components/User/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import SysAdmin from "./components/SysAdmin";
import AppAdmin from "./components/AppAdmin";
import User from "./components/User";
import UserProfile from "./components/User/UserProfile";
import RideHistory from "./components/User/RideHistory";
import NotFound from "./components/NotFound/NotFound";
import { ROLE } from "./roles";

function App(): JSX.Element {
  React.useEffect(() => {}, []);
  let role = "Admin";

  return (
    <BrowserRouter>
      <Routes>
        {role === ROLE.User ? (
          <Route
            path="/"
            element={
              <ProtectedRoute roles={[ROLE.User]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
        ) : (
          <Route
            path="/"
            element={
              <ProtectedRoute roles={[ROLE.Admin]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        )}

        <Route path="profile" element={<UserProfile />} />
        {/* Ride History */}
        <Route path="history" element={<RideHistory />} />

        <Route
          path="/"
          element={
            <ProtectedRoute roles={[ROLE.Admin]}>
              <Login />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/users" element={<ProtectedRoute />}> */}
        {/* Should show all users in a table */}
        <Route path="" element={<User />} />
        {/* Should show form to create a user */}
        <Route path="add" element={<SysAdmin />} />
        {/* Should show filled user data form */}
        <Route path="edit" element={<SysAdmin />} />

        <Route path="appadmin">
          <Route path="" element={<AppAdmin />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );

  /* return (
		<BrowserRouter>
			<Navbar />
			<br />
			<Routes>
				<Route path='/' element={<>main</>} loader={() => '....'} /> 
				<Route path='/' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route
					path='articles'
					element={
						<>
							<h4>All article listing...</h4>
							<Outlet />
						</>
					}
				>
					<Route index path='' element={<AllArticle />} />
					<Route path=':id' element={<ArticleDetail />} />
				</Route>

				<Route
					path='sysadmin'
					element={
						<ProtectedRoute
							{...defaultProtectedRouteProps}
							outlet={<AllArticle />}
						/>
					}
				>
					<Route path='' element={<SysAdmin />} />
				</Route>

				<Route path='appadmin'>
					<Route path='' element={<AppAdmin />} />
				</Route>

				<Route path='user'>
					<Route path='' element={<User />} />
				</Route>

				<Route path='*' element={<h4>oops 404</h4>} />
			</Routes>
		</BrowserRouter>
	) */
}

export default App;
