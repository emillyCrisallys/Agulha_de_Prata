import React, { useEffect, useState } from "react";

import api from "../utils/api";

interface User {
  id: number;
  name: string;
  email: string;
  document: string;
}

const UserPerfil: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("Usuário não logado.");
        return;
      }
      try {
        const { data } = await api.get(`/users/${userId}`);
        setUser(data);
      } catch (error) {
        setError("Erro ao buscar perfil.");
        console.error("Erro ao buscar perfil:", error);
      }
    };
    fetchUser();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>CPF:</strong> {user.document}</p>
    </div>
  );
};

export default UserPerfil;