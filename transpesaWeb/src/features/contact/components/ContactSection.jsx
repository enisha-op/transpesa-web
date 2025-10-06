import React from 'react';
import { useTranslation, Trans } from 'react-i18next'; // 1. Importa

// --- Subcomponente (no necesita cambios) ---
const FloatingLabelInput = ({ type, name, label, isTextArea = false }) => {
  const commonProps = {
    id: name,
    name: name,
    className: "peer block w-full appearance-none border-0 border-b-2 border-red-500 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0",
    placeholder: " ",
  };

  const labelProps = {
    htmlFor: name,
    className: "absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-red-600",
  };

  return (
    <div className="relative z-0">
      {isTextArea ? (
        <textarea {...commonProps} rows="3"></textarea>
      ) : (
        <input type={type} {...commonProps} />
      )}
      <label {...labelProps}>{label}</label>
    </div>
  );
};

// --- Componente principal del formulario de contacto ---
export default function ContactSection() {
  const { t } = useTranslation(); // 2. Usa el hook

  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          
          <div className="flex flex-col justify-center">
            {/* 3. Traduce los textos del formulario */}
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
              {t('contactMainTitle')}
            </h2>
            <p className="mt-2 text-gray-600">
              {t('contactMainSubtitle')}
            </p>

            <form className="mt-8 flex flex-col gap-y-6">
              {/* 4. Pasa las etiquetas ya traducidas como props */}
              <FloatingLabelInput type="text" name="name" label={t('contactFieldName')} />
              <FloatingLabelInput type="email" name="email" label={t('contactFieldEmail')} />
              <FloatingLabelInput type="tel" name="phone" label={t('contactFieldPhone')} />
              <FloatingLabelInput type="text" name="company" label={t('contactFieldCompany')} />
              <FloatingLabelInput name="query" label={t('contactFieldQuery')} isTextArea={true} />
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start">
                  <input id="terms" type="checkbox" className="h-4 w-4 shrink-0 accent-red-600" />
                  {/* 5. Usa <Trans> para el texto con enlaces */}
                  <label htmlFor="terms" className="ml-2 text-xs text-gray-500">
                    <Trans i18nKey="contactCheckboxTerms">
                      <a href="#" className="underline" />
                      <a href="#" className="underline" />
                    </Trans>
                  </label>
                </div>
                <div className="flex items-start">
                  <input id="marketing" type="checkbox" className="h-4 w-4 shrink-0 accent-red-600" />
                  <label htmlFor="marketing" className="ml-2 text-xs text-gray-500">
                    {t('contactCheckboxMarketing')}
                  </label>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  className="rounded-md bg-red-600 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
                >
                  {t('contactButtonSubmit')}
                </button>
              </div>
            </form>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 -top-4 -right-4 bg-red-600" style={{ zIndex: 0 }}></div>
            <div className="relative h-full w-4/5" style={{ zIndex: 1 }}>
              <img 
                src="/camion4.jpg"
                alt={t('contactImageAlt')}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}