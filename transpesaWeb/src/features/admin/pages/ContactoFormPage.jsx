import React, { useState, useEffect } from "react";
import { Trash2, Mail, Save, AlertCircle, CheckCircle, X, ChevronDown } from "lucide-react";
import useApi from "@/hooks/useApi";

// Componente para una fila de tarjeta en móvil
const CardRow = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-500">{label}</p>
    <p className="text-sm text-gray-800">{value || "-"}</p>
  </div>
);

export default function ContactoFormPage() {
  const [contacts, setContacts] = useState([]);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const api = useApi();

  // Fetch contacts from API
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await api.get("/admin/contacts");
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      showMessage("error", error.message || "Error al cargar los mensajes de contacto");
    } finally {
      setLoading(false);
    }
  };

  // Fetch notification email setting
  const fetchNotificationEmail = async () => {
    try {
      const data = await api.get("/admin/settings/notification_email");
      setNotificationEmail(data.value || "");
      setTempEmail(data.value || "");
    } catch (error) {
      console.error("Error fetching notification email:", error);
    }
  };

  // Update notification email
  const updateNotificationEmail = async () => {
    if (!tempEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempEmail)) {
      showMessage("error", "Por favor ingresa un correo electrónico válido");
      return;
    }
    try {
      await api.put("/admin/settings/notification_email", { value: tempEmail });
      setNotificationEmail(tempEmail);
      setEditingEmail(false);
      showMessage("success", "Correo de notificación actualizado correctamente");
    } catch (error) {
      console.error("Error updating email:", error);
      showMessage("error", error.message || "Error al actualizar el correo");
    }
  };

  // Delete contact
  const deleteContact = async (contactId) => {
    try {
      await api.delete(`/admin/contacts/${contactId}`);
      setContacts(contacts.filter((c) => c.id !== contactId));
      showMessage("success", "Mensaje eliminado correctamente");
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting contact:", error);
      showMessage("error", error.message || "Error al eliminar el mensaje");
    }
  };

  // Show message helper
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  useEffect(() => {
    fetchContacts();
    fetchNotificationEmail();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mensajes de Contacto</h1>
          <p className="text-sm sm:text-base text-gray-600">Gestiona los mensajes recibidos desde el formulario de contacto</p>
        </div>

        {/* Alert Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-start justify-between ${message.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <div className="flex items-start gap-3">
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              )}
              <p className={`text-sm font-medium ${message.type === "success" ? "text-green-800" : "text-red-800"}`}>
                {message.text}
              </p>
            </div>
            <button onClick={() => setMessage({ type: "", text: "" })} className="text-gray-400 hover:text-gray-600 ml-4">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Email Settings Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Configuración de Notificaciones</h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo de notificación</label>
              {editingEmail ? (
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@tuempresa.com"
                />
              ) : (
                <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-900 font-medium truncate">{notificationEmail || "No configurado"}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-7">
              {editingEmail ? (
                <>
                  <button onClick={updateNotificationEmail} className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" /> Guardar
                  </button>
                  <button onClick={() => { setEditingEmail(false); setTempEmail(notificationEmail); }} className="flex-1 md:flex-none px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Cancelar
                  </button>
                </>
              ) : (
                <button onClick={() => setEditingEmail(true)} className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Editar
                </button>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-3">Los mensajes del formulario de contacto se enviarán a este correo electrónico.</p>
        </div>

        {/* Contacts Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Mensajes Recibidos ({contacts.length})</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
              <p className="mt-4 text-gray-600">Cargando mensajes...</p>
            </div>
          ) : contacts.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No hay mensajes de contacto aún.</p>
            </div>
          ) : (
            <div>
              {/* TABLE VIEW for lg screens and up */}
              <div className="overflow-x-auto hidden lg:block">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalles</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <React.Fragment key={contact.id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-gray-500">{contact.company || "Sin empresa"}</p>
                          </td>
                          <td className="px-6 py-4">
                             <p className="font-medium text-gray-800">{contact.email}</p>
                             <p className="text-gray-500">{contact.phone || "Sin teléfono"}</p>
                          </td>
                           <td className="px-6 py-4 whitespace-nowrap text-gray-600">{formatDate(contact.created_at)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => setDeleteConfirm(contact.id)} className="text-red-600 hover:text-red-800" title="Eliminar mensaje">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                        <tr className="bg-gray-50/50">
                          <td colSpan="4" className="px-6 py-4">
                              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Consulta:</p>
                              <p className="text-gray-700 whitespace-pre-wrap p-3 bg-white rounded border border-gray-200">
                                {contact.query}
                              </p>
                              <div className="mt-3 flex gap-4 text-xs text-gray-500">
                               <span>Términos: {contact.terms_accepted ? "✓ Sí" : "✗ No"}</span>
                               <span>Marketing: {contact.marketing_accepted ? "✓ Sí" : "✗ No"}</span>
                              </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CARDS VIEW for screens smaller than lg */}
              <div className="lg:hidden p-4 space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                       <div className="flex justify-between items-start">
                           <div>
                              <p className="font-bold text-base text-gray-900">{contact.name}</p>
                              <p className="text-sm text-gray-500">{contact.company || 'Sin empresa'}</p>
                           </div>
                           <button onClick={() => setDeleteConfirm(contact.id)} className="text-red-600 hover:text-red-800 flex-shrink-0 ml-4" title="Eliminar mensaje">
                              <Trash2 className="w-5 h-5" />
                           </button>
                       </div>
                       <p className="text-sm text-gray-600 mt-2">{formatDate(contact.created_at)}</p>
                    </div>
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <CardRow label="Email" value={contact.email} />
                       <CardRow label="Teléfono" value={contact.phone} />
                    </div>
                     <div className="p-4 border-t border-gray-200">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Consulta</p>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-200">
                           {contact.query}
                        </p>
                        <div className="mt-3 flex gap-4 text-xs text-gray-500">
                           <span>Términos: {contact.terms_accepted ? "✓ Sí" : "✗ No"}</span>
                           <span>Marketing: {contact.marketing_accepted ? "✓ Sí" : "✗ No"}</span>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirmar eliminación</h3>
                  <p className="text-sm text-gray-600">Esta acción no se puede deshacer.</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">¿Estás seguro de que deseas eliminar este mensaje?</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                  Cancelar
                </button>
                <button onClick={() => deleteContact(deleteConfirm)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}