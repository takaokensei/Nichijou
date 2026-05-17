// api.ts — Responsável por comunicar com o Backend FastAPI (Task 5.1 & 5.2)

const API_BASE_URL = 'http://localhost:8000/api';
let cachedToken: string | null = localStorage.getItem('nexus:token');

async function getAuthToken(): Promise<string | null> {
  if (cachedToken) return cachedToken;
  
  // Se não temos o token, pede a senha nativamente para evitar construir tela de login por enquanto
  const password = window.prompt("🔒 NEXUS System Locked\nEntre com a senha de administrador:");
  if (!password) return null;

  try {
    const params = new URLSearchParams();
    params.append('username', 'admin');
    params.append('password', password);

    const res = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      body: params
    });

    if (res.ok) {
      const data = await res.json();
      cachedToken = data.access_token;
      localStorage.setItem('nexus:token', data.access_token);
      return cachedToken;
    } else {
      window.alert("❌ Senha incorreta.");
      return null;
    }
  } catch (e) {
    console.error("Backend offline", e);
    return null;
  }
}

export async function checkBackendStatus(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/status`);
    if (!res.ok) return false;
    const data = await res.json();
    return data.database === 'connected' && data.auth === 'enabled';
  } catch {
    return false;
  }
}

/**
 * Envia o estado atual de checkins de UM dia para o servidor.
 */
export async function syncDayCheckins(dateStr: string, data: Record<number, string | null>) {
  const token = await getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/checkins`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ date: dateStr, data })
    });
    
    if (res.status === 401) {
      localStorage.removeItem('nexus:token');
      cachedToken = null;
    }
    
    return res.ok;
  } catch (error) {
    console.warn('⚠️ Falha ao sincronizar com backend (offline)', error);
    return false;
  }
}

/**
 * Envia TODOS os checkins que estão no localStorage (batch sync inicial)
 */
export async function syncAllCheckinsBatch(allCheckinsByDate: Record<string, Record<number, string>>) {
  const token = await getAuthToken();
  if (!token) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/checkins/sync`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(allCheckinsByDate)
    });
    return res.ok;
  } catch (error) {
    console.warn('⚠️ Falha no sync em lote (offline)', error);
    return false;
  }
}
