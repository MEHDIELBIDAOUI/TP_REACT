import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename?: (project: Project) => void;
}

function Sidebar({ projects, isOpen, onRename }: SidebarProps) {
  console.log('Sidebar re-render');
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map(p => (
          <li key={p.id}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <NavLink
                to={`/projects/${p.id}`}
                className={({ isActive }) =>
                  `${styles.item} ${isActive ? styles.active : ''}`
                }
              >
                <span className={styles.dot} style={{ background: p.color }} />
                {p.name}
              </NavLink>
              {onRename && (
                <button
                  onClick={() => onRename(p)}
                  style={{ marginLeft: '10px', fontSize: '0.8rem' }}
                >
                  ✎
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default memo(Sidebar);
