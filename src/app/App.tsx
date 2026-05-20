import { useState } from 'react';
import FeriaLanding from './components/FeriaLanding';
import CatalogoProyectos from './components/CatalogoProyectos';
import FormularioRegistro from './components/FormularioRegistro';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import DashboardAlumno from './components/DashboardAlumno';
import DashboardEmpresa from './components/DashboardEmpresa';
import DashboardAdmin from './components/DashboardAdmin';
import ContratoDigital from './components/ContratoDigital';
import VerificacionQR from './components/VerificacionQR';
import VacantesAlumno from './components/VacantesAlumno';
import ConfiguracionAlumno from './components/ConfiguracionAlumno';
import AlumnosEmpresa from './components/AlumnosEmpresa';
import VacantesEmpresa from './components/VacantesEmpresa';
import ConfiguracionEmpresa from './components/ConfiguracionEmpresa';
import EstadisticasEmpresa from './components/EstadisticasEmpresa';
import AlumnosAdmin from './components/AlumnosAdmin';
import EmpresasAdmin from './components/EmpresasAdmin';
import VacantesAdmin from './components/VacantesAdmin';
import Auditoria from './components/Auditoria';
import ConfiguracionAdmin from './components/ConfiguracionAdmin';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [userType, setUserType] = useState<'alumno' | 'empresa' | 'admin' | null>(null);

  const handleNavigate = (view: string) => {
    // Track user type based on dashboard visits
    if (view === 'dashboard-alumno') setUserType('alumno');
    if (view === 'dashboard-empresa') setUserType('empresa');
    if (view === 'dashboard-admin') setUserType('admin');

    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      // Feria views (new landing and flow)
      case 'landing':
        return <FeriaLanding onNavigate={handleNavigate} />;
      case 'catalogo':
        return <CatalogoProyectos onNavigate={handleNavigate} />;
      case 'registro':
        return <FormularioRegistro onNavigate={handleNavigate} />;

      // Old system views (for testing)
      case 'old-landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;

      // Alumno views
      case 'dashboard-alumno':
        return <DashboardAlumno onNavigate={handleNavigate} />;
      case 'vacantes-alumno':
        return <VacantesAlumno onNavigate={handleNavigate} />;
      case 'contrato':
        return <ContratoDigital onNavigate={handleNavigate} />;
      case 'qr-alumno':
        return <VerificacionQR onNavigate={handleNavigate} />;

      // Empresa views
      case 'dashboard-empresa':
        return <DashboardEmpresa onNavigate={handleNavigate} />;
      case 'alumnos-empresa':
        return <AlumnosEmpresa onNavigate={handleNavigate} />;
      case 'vacantes-empresa':
        return <VacantesEmpresa onNavigate={handleNavigate} />;
      case 'estadisticas-empresa':
        return <EstadisticasEmpresa onNavigate={handleNavigate} />;

      // Admin views
      case 'dashboard-admin':
        return <DashboardAdmin onNavigate={handleNavigate} />;
      case 'alumnos-admin':
        return <AlumnosAdmin onNavigate={handleNavigate} />;
      case 'empresas-admin':
        return <EmpresasAdmin onNavigate={handleNavigate} />;
      case 'vacantes-admin':
        return <VacantesAdmin onNavigate={handleNavigate} />;
      case 'auditoria':
        return <Auditoria onNavigate={handleNavigate} />;

      // Settings (determines which config page based on user type)
      case 'settings':
        if (userType === 'alumno') {
          return <ConfiguracionAlumno onNavigate={handleNavigate} />;
        } else if (userType === 'empresa') {
          return <ConfiguracionEmpresa onNavigate={handleNavigate} />;
        } else {
          return <ConfiguracionAdmin onNavigate={handleNavigate} />;
        }

      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="size-full">
      {renderView()}
    </div>
  );
}
