import { useEffect, useState } from 'react';
import { useProfileStore } from './profile.store';
import type { User } from './profile.types';

export function useProfile() {
  const { user, setUser } = useProfileStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) return;

    // mock temporário
    setLoading(true);
    setTimeout(() => {
      const mockUser: User = {
        id: 1,
        name: 'Usuário Teste',
        email: 'usuario@email.com',
        avatar_url: null,
      };
      setUser(mockUser);
      setLoading(false);
    }, 800);
  }, [user, setUser]);

  return { user, loading };
}
