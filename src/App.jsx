import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import {
  About, Academy, AIAdoption, AIEngineering, Careers, Contact, Home, Platform, Privacy, Process, Products, Services, Terms,
} from '@site-pages';
import NotFound from './pages/NotFound.jsx';

// The employee portal loads on demand, so visitors to the public site never download it.
const Login = lazy(() => import('./pages/portal/Login.jsx'));
const Dashboard = lazy(() => import('./pages/portal/Dashboard.jsx'));
const Profile = lazy(() => import('./pages/portal/Profile.jsx'));
const Employees = lazy(() => import('./pages/portal/Employees.jsx'));
const Projects = lazy(() => import('./pages/portal/Projects.jsx'));
const Clients = lazy(() => import('./pages/portal/Clients.jsx'));
const Skills = lazy(() => import('./pages/portal/Skills.jsx'));
const Jobs = lazy(() => import('./pages/portal/Jobs.jsx'));
const Documents = lazy(() => import('./pages/portal/Documents.jsx'));
const Payroll = lazy(() => import('./pages/portal/Payroll.jsx'));
const Inquiries = lazy(() => import('./pages/portal/Inquiries.jsx'));
const PortalLayout = lazy(() => import('./components/PortalLayout.jsx'));

const portal = (element) => <Suspense fallback={<div className="portal-loading">Loading…</div>}>{element}</Suspense>;

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
        <Route path="platform" element={<Platform />} />
        <Route path="about" element={<About />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="login" element={portal(<Login />)} />

      <Route path="portal" element={portal(guard(<PortalLayout />))}>
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
