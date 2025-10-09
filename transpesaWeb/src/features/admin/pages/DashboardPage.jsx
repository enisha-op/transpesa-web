import React, { useState, useEffect } from 'react';
import useApi from '@/hooks/useApi';
import { Briefcase, FileText, Newspaper, Mail, UserCheck, TrendingUp, Edit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// --- Sub-componentes para organizar el dashboard ---

// Tarjeta de estadísticas
const StatCard = ({ icon, title, value, color }) => {
  const Icon = icon;
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-5 border-l-4" style={{ borderColor: color }}>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-7 h-7" style={{ color: color }} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

// Gráfico de Puestos Populares
const PopularJobsChart = ({ data }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg h-80">
    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
      <TrendingUp className="w-5 h-5 text-indigo-500" />
      Puestos Más Populares
    </h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" allowDecimals={false} />
        <YAxis dataKey="title" type="category" width={100} tick={{ fontSize: 12 }} />
        <Tooltip cursor={{ fill: '#f3f4f6' }}/>
        <Bar dataKey="count" fill="#ef4444" barSize={20} name="Postulaciones" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// Lista de Actividad Reciente
const RecentActivityList = ({ title, items, icon, emptyText }) => {
    const Icon = icon;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon className="w-5 h-5 text-red-500" />
                {title}
            </h3>
            <ul className="space-y-4">
                {items.length > 0 ? items.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                        <div className="bg-gray-100 p-2 rounded-full">{item.icon}</div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-700">{item.primary}</p>
                            <p className="text-gray-500">{item.secondary}</p>
                        </div>
                        <span className="text-xs text-gray-400">{item.date}</span>
                    </li>
                )) : <p className="text-sm text-gray-500 py-4 text-center">{emptyText}</p>}
            </ul>
        </div>
    );
};


// --- Componente Principal del Dashboard ---

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useApi();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/dashboard/stats');
        setData(response);
      } catch (err) {
        setError('No se pudo cargar la información del dashboard.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [api]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg">{error}</div>;
  }

  const { stats_cards, recent_applications, popular_jobs, recent_posts } = data;

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={FileText} title="Nuevas Postulaciones (Hoy)" value={stats_cards.new_applications_today} color="#3b82f6" />
        <StatCard icon={Briefcase} title="Puestos Activos" value={stats_cards.active_job_postings} color="#22c55e" />
        <StatCard icon={Newspaper} title="Artículos Publicados" value={stats_cards.published_posts} color="#8b5cf6" />
        <StatCard icon={Mail} title="Consultas (Hoy)" value={stats_cards.new_contacts_today} color="#f97316" />
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
            <RecentActivityList
                title="Últimas Postulaciones"
                icon={UserCheck}
                emptyText="No hay nuevas postulaciones hoy."
                items={recent_applications.map(app => ({
                    icon: <FileText className="w-5 h-5 text-blue-500" />,
                    primary: app.first_name,
                    secondary: `Postuló para: ${app.job_title}`,
                    date: app.date
                }))}
            />
            <RecentActivityList
                title="Artículos Recientes"
                icon={Edit}
                emptyText="No se han creado o actualizado artículos recientemente."
                items={recent_posts.map(post => ({
                    icon: <Newspaper className="w-5 h-5 text-purple-500" />,
                    primary: post.title,
                    secondary: post.isPublished ? 'Publicado' : 'Borrador',
                    date: format(parseISO(post.date), 'dd/MM/yy', { locale: es })
                }))}
            />
        </div>
        <div className="space-y-6">
            <PopularJobsChart data={popular_jobs} />
        </div>
      </div>
    </div>
  );
}

