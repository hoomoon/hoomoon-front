// components/logout-button.tsx
'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error('Logout falhou', err)
    } finally {
      // leva pro login de qualquer forma
      router.push('/login')
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </button>
  )
}
