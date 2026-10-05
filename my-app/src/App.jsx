import React, { useState, useEffect } from 'react';
import { 
  Code, 
  FolderGit2, 
  User, 
  Mail, 
  Menu, 
  X, 
  ExternalLink, 
  Download, 
  Send 
} from 'lucide-react';
import profileImage from './assets/zoro.png';
import { 
  fetchHome, 
  fetchProjects, 
  fetchSkills, 
  fetchAbout, 
  fetchContactInfo, 
  sendContactMessage 
} from './services/api';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // CMS Data States from Django API
  const [homeData, setHomeData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [contactData, setContactData] = useState(null);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Fetch data from Django backend using api.js helper functions
  useEffect(() => {
    fetchHome()
      .then(res => setHomeData(res.data[0] || res.data))
      .catch(err => console.log('Home API error:', err));

    fetchProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.log('Projects API error:', err));

    fetchSkills()
      .then(res => {
        const allSkills = res.data.flatMap(category => category.skills || []);
        setSkills(allSkills);
      })
      .catch(err => console.log('Skills API error:', err));

    fetchAbout()
      .then(res => setAboutData(res.data[0] || res.data))
      .catch(err => console.log('About API error:', err));

    fetchContactInfo()
      .then(res => setContactData(res.data[0] || res.data))
      .catch(err => console.log('Contact API error:', err));
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      subject: "New Message from Portfolio"
    };

    sendContactMessage(payload)
      .then(() => {
        setSubmitMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setSubmitting(false);
      })
      .catch((err) => {
        console.error('Contact submission error details:', err.response?.data);
        setSubmitMessage('Failed to send message. Please check console for details.');
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white selection:bg-blue-500 selection:text-white font-sans">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b0b0b]/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-xl font-bold tracking-wider text-white">
            Sahil <span className="text-blue-500">Portfolio</span>
          </span>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            {['home', 'projects', 'skills', 'about', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setActiveSection(section)}
                className={`capitalize transition duration-200 hover:text-blue-500 ${
                  activeSection === section ? 'text-blue-500 font-semibold' : ''
                }`}
              >
                {section}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#121212] border-b border-neutral-800 px-6 py-4 space-y-3">
            {['home', 'projects', 'skills', 'about', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => {
                  setActiveSection(section);
                  setIsMenuOpen(false);
                }}
                className="block text-neutral-300 hover:text-blue-500 capitalize py-1"
              >
                {section}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-44 md:pb-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-blue-500 font-semibold tracking-wide uppercase text-sm bg-blue-500/10 px-3 py-1 rounded-full">
              {homeData?.welcome_text || "Welcome to My Personal Portfolio"}
            </span>
            <h2 className="text-xl text-neutral-300">Hello! there</h2>
            <div className="flex items-center gap-3 text-4xl md:text-6xl font-extrabold text-white">
              <span>I'M</span>
              <span className="text-blue-500 inline-block">Sahil Karki</span>
            </div>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
              {homeData?.bio || "I'm a passionate web developer and designer who loves creating amazing digital experiences."}
            </p>

            {/* Resume Button & Social Icons */}
            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href={homeData?.resume_file || "#"}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => {
                  if (!homeData?.resume_file) {
                    e.preventDefault();
                    alert("Please upload your resume PDF in the Django Admin panel under Home CMS!");
                  }
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition duration-200 inline-flex items-center gap-2"
              >
                <Download size={18} /> Download Resume
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 border border-neutral-800 hover:bg-blue-600 hover:border-blue-600 text-neutral-300 hover:text-white rounded-xl transition duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 border border-neutral-800 hover:bg-blue-600 hover:border-blue-600 text-neutral-300 hover:text-white rounded-xl transition duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 border border-neutral-800 hover:bg-pink-600 hover:border-pink-600 text-neutral-300 hover:text-white rounded-xl transition duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="p-3 bg-neutral-900 border border-neutral-800 hover:bg-green-600 hover:border-green-600 text-neutral-300 hover:text-white rounded-xl transition duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-neutral-800 bg-neutral-900 shadow-2xl">
              <img 
                src={homeData?.profile_image || profileImage} 
                alt="Sahil Karki" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = profileImage; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="flex items-center gap-3 mb-12">
          <FolderGit2 className="text-blue-500" size={28} />
          <h3 className="text-3xl font-bold">My Projects</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition duration-300">
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-white">{project.title}</h4>
                  <p className="text-neutral-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                </div>
                
                {/* Links Container */}
                <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/60 mt-auto">
                  {(project.github_link || project.github_url) && (
                    <a 
                      href={project.github_link || project.github_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      GitHub <ExternalLink size={16} />
                    </a>
                  )}
                  {project.live_demo_url && (
                    <a 
                      href={project.live_demo_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium"
                    >
                      Live Demo <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-500">No projects added yet. Add them in the Django admin panel!</p>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="flex items-center gap-3 mb-12">
          <Code className="text-blue-500" size={28} />
          <h3 className="text-3xl font-bold">My Skills</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div key={skill.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-center hover:border-blue-500/50 transition duration-200">
                <span className="font-medium text-neutral-200">{skill.name}</span>
              </div>
            ))
          ) : (
            <p className="text-neutral-500">No skills added yet. Add them in the Django admin panel!</p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="flex items-center gap-3 mb-12">
          <User className="text-blue-500" size={28} />
          <h3 className="text-3xl font-bold">About Me</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio Paragraphs */}
          <div className="space-y-4 text-neutral-400 text-base leading-relaxed">
            {aboutData?.bio_p1 ? (
              <p>{aboutData.bio_p1}</p>
            ) : (
              <p className="text-neutral-500">Bio coming soon...</p>
            )}
            {aboutData?.bio_p2 && <p>{aboutData.bio_p2}</p>}
          </div>

          {/* Dynamic Education List */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white mb-4">Education</h4>
            {aboutData?.educations && aboutData.educations.length > 0 ? (
              aboutData.educations.map((edu) => (
                <div 
                  key={edu.id} 
                  className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-5 hover:border-blue-500/50 transition duration-300"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h5 className="text-lg font-semibold text-white">{edu.title}</h5>
                    
                    {edu.pursuing && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full font-medium shrink-0">
                        Pursuing
                      </span>
                    )}
                  </div>
                  
                  <p className="text-blue-400 text-sm mt-1">{edu.institution}</p>
                  
                  {/* Badges for Years, CGPA, and Percentage */}
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="text-xs text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-full">
                      {edu.years}
                    </span>
                    {edu.cgpa && (
                      <span className="text-xs text-neutral-300 bg-neutral-800 px-2.5 py-1 rounded-full">
                        CGPA: <strong className="text-white">{edu.cgpa}</strong>
                      </span>
                    )}
                    {edu.percentage && (
                      <span className="text-xs text-neutral-300 bg-neutral-800 px-2.5 py-1 rounded-full">
                        Percentage: <strong className="text-white">{edu.percentage}</strong>
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 text-sm">No education entries added yet. Add them in the Django admin panel!</p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 max-w-7xl mx-auto border-t border-neutral-900">
        <div className="flex items-center gap-3 mb-12">
          <Mail className="text-blue-500" size={28} />
          <h3 className="text-3xl font-bold">Contact Me</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-neutral-400 text-lg leading-relaxed">
              Have a project in mind or want to collaborate? Feel free to reach out directly or fill out the contact form.
            </p>
            <div className="space-y-3 text-neutral-300">
              <p><strong className="text-white">Email:</strong> {contactData?.email || "sahil@example.com"}</p>
              <p><strong className="text-white">Phone:</strong> {contactData?.phone || "+91 9876543210"}</p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Your Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="Sahil Karki"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Your Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="sahil@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-400 mb-1">Your Message</label>
              <textarea 
                rows="4" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Let's build something great..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2"
            >
              <Send size={18} /> {submitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitMessage && (
              <p className="text-center text-sm text-blue-400 mt-2">{submitMessage}</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-900 text-center text-neutral-500 text-sm">
        <p>© {new Date().getFullYear()} Sahil Karki. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;