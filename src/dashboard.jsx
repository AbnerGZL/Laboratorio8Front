import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './dashboard.module.css';

function Dashboard() {
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const msg = searchParams.get('message');
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = decodeURIComponent(value);
        return acc;
    }, {});
    if (!cookies.token) {
        navigate('/');
      }
    if (msg) {
      setMessage(decodeURIComponent(msg));
    }
  }, [searchParams]);

  const handleLogout = (e) => {
    e.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
    navigate('/');
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Panel de Control</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            <path fillRule="evenodd" d="M10.146 8.354a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 11.293l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          </svg>
          Cerrar sesión
        </button>
      </header>

      <div className={styles.dashboardContent}>
        <div className={styles.welcomeCard}>
          <h2 className={styles.welcomeTitle}>¡Bienvenido a tu panel de control!</h2>
          <p>Aquí puedes gestionar tu cuenta y acceder a todas las funcionalidades.</p>
        </div>

        {message && (
          <div className={styles.messageCard}>
            <h3 className={styles.messageTitle}>Mensaje del servidor:</h3>
            <h2 className={styles.messageContent}>{message}</h2>
          </div>
        )}

        <div className={styles.dashboardMain}>
          <aside className={styles.sidebar}>
            <h3>Menú</h3>
            <ul>
              <li>Perfil</li>
              <li>Configuración</li>
              <li>Notificaciones</li>
              <li>Ayuda</li>
            </ul>
          </aside>

          <main className={styles.mainContent}>
            <h2>Resumen</h2>
            <p>Contenido principal del dashboard XDDDD</p>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;