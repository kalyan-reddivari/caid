import CrudPage from '../../components/CrudPage.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const CATEGORIES = ['Backend', 'Frontend', 'Cloud', 'Integration', 'AI/ML', 'Data', 'Delivery', 'Other'];

export default function Skills() {
  const { can } = useAuth();
  const canWrite = can('SKILL_WRITE');
  return (
    <CrudPage
      title="Skills"
      intro="The skills catalogue employees choose from on their profiles."
      endpoint="/skills"
      singular="skill"
      canCreate={canWrite}
      canEdit={canWrite}
      canDelete={canWrite}
      columns={[
        { key: 'name', label: 'Skill' },
        { key: 'category', label: 'Category' },
      ]}
      fields={[
        { name: 'name', label: 'Skill name', required: true },
        { name: 'category', label: 'Category', type: 'select', required: true, defaultValue: 'Backend', options: CATEGORIES },
      ]}
    />
  );
}
