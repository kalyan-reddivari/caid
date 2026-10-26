import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import PortalLayout from './components/PortalLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Home from './pages/site/Home.jsx';
import Services from './pages/site/Services.jsx';
import AIAdoption from './pages/site/AIAdoption.jsx';
import AIEngineering from './pages/site/AIEngineering.jsx';
import Process from './pages/site/Process.jsx';
import Academy from './pages/site/Academy.jsx';
import Products from './pages/site/Products.jsx';
import About from './pages/site/About.jsx';
import Careers from './pages/site/Careers.jsx';
import Contact from './pages/site/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

import Login from './pages/portal/Login.jsx';
import Dashboard from './pages/portal/Dashboard.jsx';
import Profile from './pages/portal/Profile.jsx';
import Employees from './pages/portal/Employees.jsx';
import Projects from './pages/portal/Projects.jsx';
import Clients from './pages/portal/Clients.jsx';
import Skills from './pages/portal/Skills.jsx';
import Jobs from './pages/portal/Jobs.jsx';
import Documents from './pages/portal/Documents.jsx';
import Payroll from './pages/portal/Payroll.jsx';
import Inquiries from './pages/portal/Inquiries.jsx';

// `permission` is one permission name or a list (any one is enough). The server enforces the same rules.
const guard = (element, permission) => <ProtectedRoute permission={permission}>{element}</ProtectedRoute>;

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="process" element={<Process />} />
        <Route path="ai-engineering" element={<AIEngineering />} />
        <Route path="ai-adoption" element={<AIAdoption />} />
        <Route path="ai-academy" element={<Academy />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="login" element={<Login />} />

      <Route path="portal" element={guard(<PortalLayout />)}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="documents" element={guard(<Documents />, ['SELF_WORKSPACE', 'DOCUMENT_MANAGE_ALL'])} />
        <Route path="payroll" element={guard(<Payroll />, ['SELF_WORKSPACE', 'PAYROLL_READ_ALL'])} />
        <Route path="projects" element={guard(<Projects />, ['PROJECT_READ_ALL', 'PROJECT_READ_CLIENT', 'SELF_WORKSPACE'])} />
        <Route path="clients" element={guard(<Clients />, 'CLIENT_READ')} />
        <Route path="inquiries" element={guard(<Inquiries />, 'INQUIRY_MANAGE')} />
        <Route path="employees" element={guard(<Employees />, 'EMPLOYEE_READ')} />
        <Route path="skills" element={guard(<Skills />, 'SKILL_READ')} />
        <Route path="jobs" element={guard(<Jobs />, ['JOB_READ', 'APPLICATION_MANAGE'])} />
      </Route>
    </Routes>
  );
}
