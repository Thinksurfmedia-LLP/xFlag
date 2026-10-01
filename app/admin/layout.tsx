import AdminShell from './AdminShell';
import './cms.css';

export const metadata = {
  title: 'XFlag CMS',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
