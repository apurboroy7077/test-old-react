import React, { useEffect, useState } from "react";
import ProjectBanner from "../components/ProjectBanner";
import WhatWeDo from "../components/WhatWeDo";
import BrandDirection from "../components/BrandDirection";
import Gallery from "../components/HomeGallery";
import SeamlessBooking from "../components/SeamlessBooking";
import ProjectVerticle from "../components/ProjectVerticle";
import MoreProjectSlider from "../components/MoreProjectSlider";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import SingleProjectGallery from "../components/SingleProjectGallery";
import FeaturedWorkSlider from "../components/FeaturedWorkSlider";
import Header from "../components/Header";
import Footer from "../components/Footer";

function App() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [brandSection, setBrandSection] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/admin/get-project/${id}`,
          { withCredentials: true }
        );
        setProject(response.data); // Set the fetched project details
      } catch (err) {
        setError("Failed to fetch project details");
      }
    };
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/admin/get-bookings/${id}`,
          { withCredentials: true }
        );
        setBookings(response.data); // Set the fetched bookings
      } catch (err) {
        setError("Failed to fetch bookings");
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/admin/get-projects`,
          { withCredentials: true }
        );
        setProjects(response.data); // Set the fetched projects to state
      } catch (err) {
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    const fetchBrandSection = async () => {
      try {
        const response = await axios.get(
          `${config.BASE_URL}/api/admin/brandsection`
        );
        setBrandSection(response.data);
      } catch (err) {
        setBrandSection(null);
      }
    };

    fetchBrandSection();
    fetchProjectDetails();
    fetchBookings();
    fetchProjects();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!isAdminRoute && <Header />}
      <ProjectBanner project={project} />
      <WhatWeDo project={project} />
      <BrandDirection project={project} brandSection={brandSection} />
      <SingleProjectGallery />
      <SeamlessBooking project={project} />
      <ProjectVerticle bookings={bookings} />
      <FeaturedWorkSlider projects={projects} title="MORE PROJECTS" />
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
