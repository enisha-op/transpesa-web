import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Phone, Mail } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next'; // 1. Importa

// Asegúrate de incluir el CSS de Leaflet en tu proyecto principal
// import 'leaflet/dist/leaflet.css';

const BranchDetails = ({ name, addressKey, phone, email }) => {
  const { t } = useTranslation(); // 2. Usa el hook aquí también

  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-xl font-bold sm:text-2xl">{name}</h3>
      <a href="#" className="mt-2 text-sm text-red-600 hover:underline">
        {t(addressKey)} {/* 3. Traduce la dirección */}
      </a>
      <div className="mt-4 space-y-2">
        <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-black">
          <Phone size={16} />
          <span>{phone}</span>
        </a>
        <a href={`mailto:${email}`} className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-black">
          <Mail size={16} />
          <span>{email}</span>
        </a>
      </div>
    </div>
  );
};

export default function BranchesSection() {
  const { t } = useTranslation(); // Usa el hook en el componente principal

  // 4. El array ahora usa claves de traducción
  const branches = [
    {
      name: 'Trujillo',
      addressKey: 'branchAddress1', // Clave de traducción
      phone: '+51 (044) 233498',
      email: 'asistentecomercial@transpesa.com.pe',
      coordinates: [-8.1092, -79.0215],
    },
    {
      name: 'Lima',
      addressKey: 'branchAddress2', // Clave de traducción
      phone: '+51 (044) 233498',
      email: 'asistentecomercial@transpesa.com.pe',
      coordinates: [-12.04318, -77.02824],
    },
  ];

  const mapCenter = [-10.0, -76.0];
  const zoomLevel = 5.5;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* 5. Traduce el título principal con <Trans> */}
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          <Trans i18nKey="branchesMainTitle">
            <span className="text-red-600" />
          </Trans>
        </h2>

        <div className="mt-12 h-[350px] md:h-[450px] w-full rounded-lg shadow-md overflow-hidden">
          <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {branches.map((branch) => (
              <Marker key={branch.name} position={branch.coordinates}>
                <Popup>{branch.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {branches.map((branch) => (
            <BranchDetails key={branch.name} {...branch} />
          ))}
        </div>
      </div>
    </section>
  );
}