import { redirect } from 'next/navigation';

// Logos now live in the Header and Footer editors (Logos tab).
export default function LogosAdminPage() {
  redirect('/admin/header');
}
