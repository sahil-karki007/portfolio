import axios from 'axios';

const API_BASE_URL = 'https://sahil-portfolio-backend-o0bv.onrender.com/api/';

export const fetchHome = () => axios.get(`${API_BASE_URL}home/`);
export const fetchProjects = () => axios.get(`${API_BASE_URL}projects/`);
export const fetchSkills = () => axios.get(`${API_BASE_URL}skills-categories/`);
export const fetchAbout = () => axios.get(`${API_BASE_URL}about/`);
export const fetchContactInfo = () => axios.get(`${API_BASE_URL}contact-info/`);
export const sendContactMessage = (data) => axios.post(`${API_BASE_URL}contact-messages/`, data);