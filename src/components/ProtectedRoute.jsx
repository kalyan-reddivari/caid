import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Keeps signed-out visitors out of the portal, and hides pages the user's role cannot use.
 * `permission` is a permission name or a list of names (any one is enough). This is a convenience:
 * the server refuses the underlying requests regardless.
 */
export default function ProtectedRoute({ children, permission, roles }) {
  const { user, ready, can } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  if (permission) {
    if (!ready) return <p className="muted">Loading…</p>;
    if (!can(...[].concat(permission))) return <NoAccess role={user.role} />;
  }
  if (roles && !roles.includes(user.role)) return <NoAccess role={user.role} />;
  return children;
}

function NoAccess({ role }) {
  return (
    <div className="panel">
      <h2>No access</h2>
      <p className="muted">Your role ({role.toLowerCase().replace(/_/g, ' ')}) cannot open this page. Ask an administrator if you need access.</p>
    </div>
  );
}
