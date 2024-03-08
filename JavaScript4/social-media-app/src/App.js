import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";

import HomePage from "./pages/HomePage/index.js";
import PostListPage from "./pages/PostListPage/index.js";
import PostFormPage from "./pages/PostFormPage/index.js";
import PostItemPage from "./pages/PostItemPage/index.js";

import PreferencesPage from "./pages/PreferencesPage/index.js";

import AboutUsPage from "./pages/AboutUsPage/index.js";
import AboutUsMissionPage from "./pages/AboutUsPage/Mission.js";
import AboutUsPrivacyPage from "./pages/AboutUsPage/Pivacy.js";

import NotFoundPage from "./pages/NotFoundPage/index.js";

import { Routes, Route } from "react-router-dom";
import AboutUsIntroductionPage from "./pages/AboutUsPage/Introduction.js";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/add" element={<PostFormPage />} />
        <Route path="/posts/:id" element={<PostItemPage />} />

        <Route path="/preferences" element={<PreferencesPage />} />

        <Route path="/about-us" element={<AboutUsPage />}>
          <Route path="" element={<AboutUsIntroductionPage />} />
          <Route path="mission" element={<AboutUsMissionPage />} />
          <Route path="privacy" element={<AboutUsPrivacyPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  );
}
