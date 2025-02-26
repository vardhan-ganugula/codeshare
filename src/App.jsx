import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import { Header, Footer } from "./components";
const Homepage = React.lazy(() => import("./pages/Homepage"));
const ViewCode = React.lazy(() => import("./pages/ViewCode"));
const CreateCode = React.lazy(() => import("./pages/CreateCode"));
const EditCode = React.lazy(() => import("./pages/EditCode"));
const CreateGroup = React.lazy(() => import("./pages/CreateGroup"));
const SearchGroup = React.lazy(() => import("./pages/SearchGroup"));

import NotFound from "./pages/NotFound";
import Loading from "./components/Loading";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          element={
            <Suspense fallback={<Loading classNames="h-screen bg-gray-100 " />}>
              <Homepage />
            </Suspense>
          }
          path="/"
        />
        <Route
          element={
            <Suspense fallback={<Loading classNames="h-screen bg-gray-100 " />}>
              <CreateCode />
            </Suspense>
          }
          path="/create"
        />
        <Route
          element={
            <Suspense fallback={<Loading classNames="h-screen bg-gray-100 " />}>
              <CreateGroup />
            </Suspense>
          }
          path="/create-group"
        />
        <Route
          element={
            <Suspense fallback={<Loading classNames="h-screen bg-gray-100 " />}>
              <SearchGroup />
            </Suspense>
          }
          path="/search-group"
        />
        <Route
          element={
            <Suspense fallback={<Loading classNames="h-screen bg-gray-100 " />}>
              <ViewCode />
            </Suspense>
          }
          path="/view"
        />
        <Route
          element={
            <Suspense fallback={<Loading classNames="h-screen bg-gray-100 " />}>
              <EditCode />
            </Suspense>
          }
          path="/edit/:code"
        />

        <Route Component={NotFound} path="*" />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
