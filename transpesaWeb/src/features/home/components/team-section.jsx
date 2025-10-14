import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';

export default function TeamSection() {
  const { t } = useTranslation();

  const teamMembers = [
    { id: 1, nameKey: "teamMember1Name", positionKey: "teamMember1Position", image: "/images/equipo.webp" },
    { id: 2, nameKey: "teamMember2Name", positionKey: "teamMember2Position", image: "/images/equipo.webp" },
    { id: 3, nameKey: "teamMember3Name", positionKey: "teamMember3Position", image: "/images/equipo.webp" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };


  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 👇 AQUÍ LA CORRECCIÓN: Aumentamos el margen inferior de 16 a 24 👇 */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            <Trans i18nKey="teamMainTitle">
              <span className="text-red-600" />
            </Trans>
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('teamMainSubtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-32 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {teamMembers.map((member) => {
            const translatedName = t(member.nameKey);
            return (
              <motion.div
                key={member.id}
                className="relative mx-4"
                variants={itemVariants}
              >
                <motion.div 
                  className="absolute -top-3 -left-3 w-16 h-16 sm:w-24 sm:h-24 border-t-4 border-l-4 border-red-600 rounded-tl-3xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.div 
                  className="absolute -bottom-3 -right-3 w-16 h-16 sm:w-24 sm:h-24 border-b-4 border-r-4 border-red-600 rounded-br-3xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                <motion.div 
                  className="bg-white shadow-xl rounded-2xl p-6 text-center h-full relative z-10"
                  whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <div className="w-32 h-40 sm:w-36 sm:h-48 mx-auto -mt-20 mb-6 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={member.image}
                      alt={t('teamImageAlt', { name: translatedName })}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{translatedName}</h3>
                  <p className="text-gray-500 mb-5">{t(member.positionKey)}</p>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300"
                  >
                    {t('teamButtonLinkedIn')}
                  </button>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}