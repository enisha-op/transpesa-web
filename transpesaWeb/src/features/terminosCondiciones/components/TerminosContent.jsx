// src/features/terminosCondiciones/components/TerminosContent.jsx

import React from 'react';

// Un componente pequeño para estilizar las secciones y mantener el código limpio
const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>
    <div className="space-y-4 text-gray-600 leading-relaxed">
      {children}
    </div>
  </section>
);

export default function TerminosContent() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Section title="1. Introducción y Aceptación">
          <p>
            Bienvenido a Grupo Transpesa. Los presentes Términos y Condiciones regulan el uso de nuestro sitio web y los servicios ofrecidos a través del mismo. Al acceder y utilizar nuestro sitio web, usted ("el Usuario") acepta y se compromete a cumplir con todos los términos aquí descritos. Si no está de acuerdo con alguna de estas condiciones, por favor, no utilice nuestro sitio.
          </p>
        </Section>
        
        <Section title="2. Uso del Sitio Web">
          <p>
            El Usuario se compromete a utilizar el sitio web de manera lícita, de acuerdo con la moral, el orden público y lo dispuesto en estos términos. Queda estrictamente prohibido:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Utilizar el sitio con fines fraudulentos o ilícitos.</li>
            <li>Intentar acceder a áreas restringidas del sitio o de nuestros sistemas.</li>
            <li>Introducir o difundir virus informáticos o cualquier otro sistema que pueda causar daños.</li>
            <li>Reproducir, copiar o distribuir el contenido del sitio sin autorización expresa de Grupo Transpesa.</li>
          </ul>
        </Section>
        
        <Section title="3. Propiedad Intelectual">
          <p>
            Todo el contenido presente en este sitio web, incluyendo pero no limitado a textos, gráficos, logotipos, íconos, imágenes y software, es propiedad exclusiva de Grupo Transpesa o de sus licenciantes y está protegido por las leyes de propiedad intelectual de Perú y tratados internacionales.
          </p>
        </Section>

        <Section title="4. Limitación de Responsabilidad">
          <p>
            Grupo Transpesa no se hace responsable por los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
          </p>
        </Section>
        
        <Section title="5. Ley Aplicable y Jurisdicción">
          <p>
            Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes de la República del Perú. Cualquier controversia derivada de la aplicación o interpretación de los mismos será sometida a la jurisdicción de los tribunales de Trujillo, Perú.
          </p>
        </Section>
        
        <Section title="6. Contacto">
          <p>
            Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos a través de la sección de "Contáctanos" de nuestro sitio web o enviando un correo a <strong className="text-gray-800">legal@transpesa.com.pe</strong>.
          </p>
        </Section>

      </div>
    </div>
  );
}