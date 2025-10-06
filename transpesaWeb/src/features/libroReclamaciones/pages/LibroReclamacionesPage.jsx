import React, { useState } from 'react';
import FormField from '../components/FormField';
import FormSelect from '../components/FormSelect';
import FormRadioGroup from '../components/FormRadioGroup';

// Icono simple para el título
const IconoLibro = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-5.495-9.494h10.99M3.75 9.75h16.5m-16.5 4.5h16.5M2.25 6.75h19.5M2.25 17.25h19.5" />
  </svg>
);


export default function LibroReclamacionesPage() {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
    dni: '',
    telefono: '',
    correo: '',
    tipoBien: 'Servicio',
    moneda: 'Soles',
    montoReclamado: '',
    descripcionBien: '',
    tipoReclamacion: 'Reclamo',
    descripcionReclamacion: '',
    numeroPedido: '',
    detalleProveedor: 'El proveedor deberá dar respuesta al reclamo en un plazo no mayor a 15 días hábiles.',
    archivo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, archivo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos a tu backend
    console.log('Datos del formulario:', formData);
    alert('Reclamo enviado con éxito.');
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* --- CABECERA --- */}
        <div className="bg-red-600 text-white p-6 rounded-t-lg shadow-lg flex items-center">
          <IconoLibro />
          <div>
            <h1 className="text-2xl font-bold">Libro de Reclamaciones</h1>
            <p className="text-red-100">Conforme a lo establecido en el D.S. N° 011-2011-PCM.</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-b-lg shadow-lg space-y-8">
          
          {/* --- SECCIÓN 1: IDENTIFICACIÓN DEL CONSUMIDOR --- */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-500 pb-2">
              1. Identificación del Consumidor Reclamante
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Nombre Completo" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
              <FormField label="DNI / CE" name="dni" value={formData.dni} onChange={handleChange} required />
              <FormSelect label="Departamento" name="departamento" value={formData.departamento} onChange={handleChange} options={['Seleccionar', 'Lima', 'La Libertad', 'Arequipa']} required />
              <FormSelect label="Provincia" name="provincia" value={formData.provincia} onChange={handleChange} options={['Seleccionar', 'Lima', 'Trujillo', 'Arequipa']} required />
              <FormSelect label="Distrito" name="distrito" value={formData.distrito} onChange={handleChange} options={['Seleccionar', 'San Isidro', 'Miraflores', 'El Porvenir']} required />
              <FormField label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} required />
              <FormField label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} required />
              <FormField label="Correo Electrónico" name="correo" type="email" value={formData.correo} onChange={handleChange} required />
            </div>
          </div>

          {/* --- SECCIÓN 2: IDENTIFICACIÓN DEL BIEN --- */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-500 pb-2">
              2. Identificación del Bien Contratado
            </h2>
            <FormRadioGroup name="tipoBien" value={formData.tipoBien} onChange={handleChange} options={['Servicio', 'Producto']} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <FormRadioGroup label="Tipo de Moneda" name="moneda" value={formData.moneda} onChange={handleChange} options={['Soles', 'Dólares']} inline />
                <FormField label="Monto Reclamado" name="montoReclamado" type="number" value={formData.montoReclamado} onChange={handleChange} />
            </div>
            <FormField label="Descripción" name="descripcionBien" type="textarea" value={formData.descripcionBien} onChange={handleChange} />
          </div>

          {/* --- SECCIÓN 3: DETALLE DE LA RECLAMACIÓN --- */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-500 pb-2">
              3. Detalle de la Reclamación y Pedido
            </h2>
            <FormRadioGroup label="Tipo" name="tipoReclamacion" value={formData.tipoReclamacion} onChange={handleChange} options={['Reclamo', 'Queja']} />
            <FormField label="Descripción" name="descripcionReclamacion" type="textarea" value={formData.descripcionReclamacion} onChange={handleChange} required />
            <FormField label="Número de Pedido (Opcional)" name="numeroPedido" value={formData.numeroPedido} onChange={handleChange} />
          </div>
          
           {/* --- SECCIÓN 4: OBSERVACIONES --- */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-red-500 pb-2">
              4. Observaciones y acciones adoptadas por el proveedor
            </h2>
            <p className="text-sm text-gray-600 bg-gray-100 p-4 rounded-md">
              {formData.detalleProveedor}
            </p>
          </div>


          {/* --- SUBIR ARCHIVO Y BOTÓN DE ENVÍO --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subir Archivo (Opcional)</label>
            <input type="file" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"/>
            <p className="text-xs text-gray-500 mt-1">Solo archivos JPG, PNG o PDF. Peso máximo 4MB.</p>
          </div>

          <div className="text-center pt-6">
            <button type="submit" className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300">
              Enviar Reclamo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}