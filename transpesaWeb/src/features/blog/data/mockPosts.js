// src/features/blog/data/mockPosts.js

export const posts = [
  {
    id: 1,
    slug: 'maximizando-la-eficiencia-en-la-cadena-de-frio',
    category: 'Logística',
    title: 'Maximizando la Eficiencia en la Cadena de Frío',
    imageUrl: '/camion1.jpg',
    author: 'Enrique Pesantes',
    authorImage: '/images/equipo.webp',
    authorBio: 'Especialista en logística con más de 15 años de experiencia en cadenas de suministro y transporte refrigerado.',
    date: 'Octubre 03, 2025',
    excerpt: 'Descubre las claves y tecnologías para mantener la integridad de los productos perecederos durante su transporte.',
    content: `La cadena de frío es uno de los eslabones más críticos en la logística moderna, especialmente en un país con la diversidad geográfica y climática de Perú. Garantizar que los productos perecederos, como alimentos y medicamentos, lleguen a su destino en perfectas condiciones no es solo una cuestión de calidad, sino también de salud pública y seguridad.

    ### Tecnologías Clave en la Cadena de Frío
    Hoy en día, contamos con herramientas avanzadas que nos permiten un control sin precedentes. Los **sensores de temperatura y humedad con IoT (Internet de las Cosas)** son fundamentales. Estos dispositivos monitorean en tiempo real las condiciones del contenedor y envían alertas automáticas si se detecta cualquier desviación de los parámetros establecidos. Esto permite una intervención rápida para corregir el problema antes de que la carga se vea comprometida.

    Otro pilar es el uso de **software de gestión de flotas** especializado. Estas plataformas no solo optimizan las rutas para reducir los tiempos de tránsito, sino que también integran los datos de los sensores, ofreciendo una visibilidad completa de la operación desde un único panel de control. En Transpesa, esta integración nos permite ofrecer a nuestros clientes una total transparencia y confianza.

    ### Retos y Soluciones
    El principal reto sigue siendo la "última milla", el tramo final de la entrega. Aquí, la eficiencia y la rapidez son cruciales. Para ello, implementamos **protocolos de carga y descarga optimizados** y utilizamos vehículos más pequeños y ágiles que están equipados con sistemas de refrigeración compactos y eficientes, asegurando que la cadena de frío no se rompa en ningún momento. La capacitación constante de nuestro personal es igualmente vital para el éxito de estas operaciones.`,
  },
  {
    id: 2,
    slug: 'innovacion-tecnologica-en-almacenes-modernos',
    category: 'Innovación',
    title: 'Innovación Tecnológica en Almacenes Modernos',
    imageUrl: '/camion2.jpg',
    author: 'Ana García',
    authorImage: '/images/equipo.webp',
    authorBio: 'Jefa de Innovación en Transpesa, enfocada en la implementación de tecnologías emergentes en el sector logístico.',
    date: 'Septiembre 28, 2025',
    excerpt: 'Desde la automatización hasta el IoT, exploramos cómo la tecnología está revolucionando la gestión de inventarios.',
    content: `El almacén ha dejado de ser un simple espacio de almacenamiento para convertirse en un centro neurálgico de operaciones, impulsado por la tecnología. La correcta implementación de innovaciones puede significar una reducción drástica de costos, un aumento en la precisión del inventario y una mejora sustancial en los tiempos de respuesta.

    ### Automatización y Robótica
    Los **Sistemas de Gestión de Almacenes (SGA o WMS)** son el cerebro de la operación, pero son los robots y los vehículos de guiado automático (AGV) los que actúan como el músculo. Estos sistemas automatizan tareas repetitivas como el picking, packing y movimiento de mercancías, reduciendo el error humano y aumentando la velocidad de preparación de pedidos.

    La implementación de **drones para el inventario** es otra tendencia en auge. Un dron puede escanear los códigos de barras de un pasillo completo en minutos, una tarea que a un operario le tomaría horas, mejorando la frecuencia y precisión de los conteos de stock.`,
  },
  {
    id: 3,
    slug: 'sostenibilidad-en-el-transporte-de-carga-pesada',
    category: 'Sostenibilidad',
    title: 'Sostenibilidad en el Transporte de Carga Pesada',
    imageUrl: '/imageHero.jpg',
    author: 'Carlos Mendoza',
    authorImage: '/images/equipo.webp',
    authorBio: 'Gerente de Operaciones y Sostenibilidad, dedicado a implementar prácticas eco-amigables en nuestra flota.',
    date: 'Septiembre 15, 2025',
    excerpt: 'Analizamos las nuevas prácticas y vehículos que están haciendo del transporte una industria más verde y responsable.',
    content: `La sostenibilidad ha dejado de ser una opción para convertirse en un pilar fundamental de la logística moderna. En Transpesa, asumimos la responsabilidad de reducir nuestra huella de carbono y promover operaciones más limpias.

    ### Flota Moderna y Eficiente
    La renovación constante de nuestra flota es clave. Incorporamos vehículos con **tecnología Euro V y superiores**, que no solo reducen significativamente las emisiones de gases contaminantes, sino que también son más eficientes en el consumo de combustible. Esto se traduce en un doble beneficio: cuidamos el medio ambiente y optimizamos los costos operativos para nuestros clientes.

    ### Optimización de Rutas
    No se trata solo de tener camiones modernos, sino de usarlos de la manera más inteligente posible. Nuestro software de optimización de rutas utiliza algoritmos avanzados para diseñar los trayectos más cortos y con menos tráfico, minimizando los kilómetros recorridos y, por ende, el combustible consumido. Cada viaje planificado es un paso hacia una logística más sostenible.`
  },
  {
    id: 4,
    slug: 'seguridad-en-la-ruta-protegemos-tu-carga',
    category: 'Seguridad',
    title: 'Seguridad en la Ruta: Cómo Protegemos tu Carga las 24 Horas',
    imageUrl: '/camion4.jpg',
    author: 'Lucía Vargas',
    authorImage: '/images/equipo.webp',
    authorBio: 'Jefa de Seguridad y Monitoreo, experta en sistemas de seguimiento GPS y protocolos de respuesta a incidentes.',
    date: 'Agosto 29, 2025',
    excerpt: 'Un vistazo profundo a nuestras tecnologías y protocolos que garantizan la seguridad de cada envío, de origen a destino.',
    content: `La confianza de nuestros clientes se basa en la certeza de que su carga está segura en todo momento. En Transpesa, la seguridad no es una característica adicional, es la base de todas nuestras operaciones.

    ### Monitoreo Activo 24/7
    Toda nuestra flota está equipada con **sistemas de seguimiento GPS de última generación**. Pero no nos limitamos a saber dónde está un vehículo; nuestro centro de monitoreo opera 24/7, vigilando activamente variables como la velocidad, las paradas no autorizadas y las desviaciones de ruta. Cualquier anomalía activa un protocolo de respuesta inmediata.

    ### Capacitación y Protocolos
    La tecnología es una herramienta, pero nuestro equipo humano es la primera línea de defensa. Todos nuestros conductores reciben una rigurosa capacitación en **manejo defensivo y protocolos de seguridad**. Realizamos verificaciones de antecedentes exhaustivas y promovemos una cultura de prevención para minimizar los riesgos en cada etapa del viaje.`
  },
  {
    id: 5,
    slug: 'desafios-de-la-ultima-milla-en-peru',
    category: 'Distribución',
    title: 'Los Desafíos de la Última Milla en las Ciudades del Perú',
    imageUrl: '/camion1.jpg',
    author: 'Javier Ríos',
    authorImage: '/images/equipo.webp',
    authorBio: 'Coordinador de Distribución Urbana, especializado en optimizar entregas en entornos de alto tráfico.',
    date: 'Agosto 12, 2025',
    excerpt: 'El tramo final de la entrega es el más complejo. Analizamos cómo enfrentamos el tráfico, las entregas programadas y la satisfacción del cliente.',
    content: `La "última milla" se refiere al paso final del proceso de entrega, desde un centro de distribución hasta el cliente final. Aunque es el tramo más corto, a menudo es el más costoso y complejo, especialmente en ciudades congestionadas como las nuestras.

    ### Adaptación a Entornos Urbanos
    Las grandes flotas de carga pesada son eficientes para largas distancias, pero no para navegar por el tráfico urbano. En Transpesa, hemos desarrollado una **estrategia de distribución capilar**, utilizando vehículos más pequeños y ágiles para las entregas urbanas. Esto nos permite no solo ser más rápidos, sino también acceder a zonas con restricciones para vehículos pesados.

    ### Tecnología para la Satisfacción del Cliente
    La clave en la última milla es la comunicación. Ofrecemos a nuestros clientes **seguimiento en tiempo real de sus pedidos** y ventanas de entrega precisas. Nuestro sistema notifica automáticamente sobre el estado del envío, reduciendo la incertidumbre y mejorando la experiencia de recepción.`
  },
  {
    id: 6,
    slug: 'el-motor-de-transpesa-capacitacion-continua',
    category: 'Cultura',
    title: 'El Motor de Transpesa: La Capacitación de Nuestros Colaboradores',
    imageUrl: '/camion2.jpg',
    author: 'Enrique Pesantes',
    authorImage: '/images/equipo.webp',
    authorBio: 'Especialista en logística con más de 15 años de experiencia en cadenas de suministro y transporte refrigerado.',
    date: 'Julio 30, 2025',
    excerpt: 'Creemos que nuestra gente es nuestro mayor activo. Así es como invertimos en su desarrollo profesional y seguridad.',
    content: `Una flota moderna y la mejor tecnología solo son efectivas en manos de un equipo profesional y comprometido. En Transpesa, la inversión en nuestra gente es tan importante como la inversión en nuestros activos.

    ### Programas de Formación Constante
    Implementamos programas de capacitación continua para todo nuestro personal. Nuestros conductores participan en cursos de **manejo defensivo, eficiencia de combustible y primeros auxilios**. Nuestro personal de almacén se forma en las últimas tecnologías de gestión de inventario y protocolos de seguridad industrial.

    ### Una Cultura de Seguridad Primero
    Más allá de los cursos, fomentamos una cultura donde la seguridad es responsabilidad de todos. Realizamos reuniones periódicas, compartimos lecciones aprendidas de incidentes menores y premiamos las conductas seguras. Un equipo seguro es un equipo eficiente y confiable, y esa es la promesa que hacemos a nuestros clientes.`
  },
];