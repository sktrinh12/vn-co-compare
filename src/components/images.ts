export interface LocalizedText {
  es: string;
  en?: string;
  vi?: string;
}

export interface ImgDataInterface {
  id: number;
  city1: string;
  city2: string;
  img1: string;
  img2: string;
  category: string;
  country1: string;
  country2: string;
  description1: LocalizedText;
  description2: LocalizedText;
}

export const imgData: ImgDataInterface[] = [
  {
    id: 1,
    city1: "Saigon",
    city2: "Barranquilla",
    country1: "VN",
    country2: "CO",
    img1: "/images/teleranas-de-cable/1-vn-saigon.webp",
    img2: "/images/teleranas-de-cable/1-co-barranquilla.webp",
    category: "teleranas de cable",
    description1: {
      es: "Un caos de cables negros forma una telaraña sobre las motos.",
    },
    description2: {
      es: "Un caos de cables negros forma una telaraña sobre carros y motos.",
    },
  },
  {
    id: 2,
    city1: "Saigon",
    city2: "Medellin",
    country1: "VN",
    country2: "CO",
    img1: "/images/teleranas-de-cable/2-vn-saigon.webp",
    img2: "/images/teleranas-de-cable/2-co-medellin.webp",
    category: "teleranas de cable",
    description1: {
      es: "Foto aérea: una moto navega bajo una maraña de cables.",
    },
    description2: {
      es: "Vista desde abajo: los cables forman un laberinto contra el cielo, con árboles al fondo.",
    },
  },
  {
    id: 3,
    city1: "Saigon",
    city2: "Medellin",
    country1: "VN",
    country2: "CO",
    img1: "/images/teleranas-de-cable/3-vn-saigon.webp",
    img2: "/images/teleranas-de-cable/3-co-medellin.webp",
    category: "teleranas de cable",
    description1: {
      es: "Vista a nivel de una calle con muchos postes esqueléticos.",
    },
    description2: {
      es: "",
    },
  },
  {
    id: 4,
    city1: "Ha Noi",
    city2: "Santa Marta",
    country1: "VN",
    country2: "CO",
    img1: "/images/teleranas-de-cable/4-vn-ha-noi.webp",
    img2: "/images/teleranas-de-cable/4-co-santa-marta.webp",
    category: "teleranas de cable",
    description1: {
      es: "Un poste cubierto de cables enredados, centro de una escena caótica y viva.",
    },
    description2: {
      es: "Un poste se alza como telaraña de cables en la costa caribeña.",
    },
  },
  {
    id: 5,
    city1: "Medellin",
    city2: "Ha Noi",
    country1: "CO",
    country2: "VN",
    img1: "/images/transporte/5-co-medellin.webp",
    img2: "/images/transporte/5-vn-ha-noi.webp",
    category: "Transporte",
    description1: {
      es: "Parqueadero subterráneo, común bajo los centros comerciales, lleno de motos.",
    },
    description2: {
      es: "Parqueadero abierto al aire libre, también común arriba de los centros comerciales.",
    },
  },
  {
    id: 6,
    city1: "Villavicencio",
    city2: "Saigon",
    country1: "CO",
    country2: "VN",
    img1: "/images/transporte/6-co-villavicencio.webp",
    img2: "/images/transporte/6-vn-saigon.webp",
    category: "Transporte",
    description1: {
      es: "Parqueadero subterráneo bajo un centro comercial: filas de motos bajo luces fluorescentes.",
    },
    description2: {
      es: "Parqueadero subterráneo iluminado, con motos alineadas en perfecto orden.",
    },
  },
  {
    id: 7,
    city1: "Bogota",
    city2: "Saigon",
    country1: "CO",
    country2: "VN",
    img1: "/images/transporte/7-co-bogota.webp",
    img2: "/images/transporte/7-vn-saigon.webp",
    category: "Transporte",
    description1: {
      es: "Un mar de motos descompuestas o abandonadas: un desguace sin orden.",
    },
    description2: {
      es: "Cientos de motos rotas amontonadas: un desguace improvisado.",
    },
  },
  {
    id: 8,
    city1: "Bogota",
    city2: "Saigon",
    country1: "CO",
    country2: "VN",
    img1: "/images/transporte/8-co-bogota.webp",
    img2: "/images/transporte/8-vn-saigon.webp",
    category: "Transporte",
    description1: {
      es: "El conductor se ajusta el casco mientras lleva a su familia: papá, mamá e hija en una sola moto.",
    },
    description2: {
      es: "El conductor se pone el casco mientras tres personas comparten la misma moto.",
    },
  },
  {
    id: 9,
    city1: "Cali",
    city2: "Saigon",
    country1: "CO",
    country2: "VN",
    img1: "/images/transporte/9-co-cali.webp",
    img2: "/images/transporte/9-vn-saigon.webp",
    category: "Transporte",
    description1: {
      es: "Calle saturada: las motos superan a los carros en una masa de metal y ruido.",
    },
    description2: {
      es: "Puente abarrotado: las motos fluyen como un río y gobiernan el asfalto.",
    },
  },
  {
    id: 10,
    city1: "Cali",
    city2: "Saigon",
    country1: "CO",
    country2: "VN",
    img1: "/images/transporte/10-co-cali.webp",
    img2: "/images/transporte/10-vn-saigon.webp",
    category: "Transporte",
    description1: {
      es: "La calle desaparece bajo un mar de motos y carros iluminados por la noche.",
    },
    description2: {
      es: "Río de motos bajo luces vibrantes: la noche asiática brilla con caos organizado.",
    },
  },
  {
    id: 11,
    city1: "Da Nang",
    city2: "Cali",
    country1: "VN",
    country2: "CO",
    img1: "/images/transporte/11-vn-da-nang.webp",
    img2: "/images/transporte/11-co-cali.webp",
    category: "Transporte",
    description1: {
      es: "Un padre lleva a su familia—la madre y tres niñas—en moto por una calle de barrio.",
    },
    description2: {
      es: "Una familia de tres—padre, madre e hijo—viaja junta en moto, todos con casco.",
    },
  },
  {
    id: 12,
    city1: "Da Nang",
    city2: "Quindio",
    country1: "VN",
    country2: "CO",
    img1: "/images/comida/12-vn-da-nang.webp",
    img2: "/images/comida/12-co-quindio.webp",
    category: "Comida",
    description1: {
      es: "Banh Xeo: crujientes crepas de arroz con camarones, cerdo y brotes de soja.",
    },
    description2: {
      es: "La arepa, ícono colombiano: rellena de queso, carne o huevo.",
    },
  },
  {
    id: 13,
    city1: "Hanoi",
    city2: "Cartagena",
    country1: "VN",
    country2: "CO",
    img1: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/13-vn-hanoi.webp",
    img2: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/13-co-cartagena.webp",
    category: "Integracion de la naturaleza entre estructuras artificiales",
    description1: {
      es: "Descripción pendiente.",
    },
    description2: {
      es: "Descripción pendiente.",
    },
  },
  {
    id: 14,
    city1: "Sapa",
    city2: "Santa Marta",
    country1: "VN",
    country2: "CO",
    img1: "/images/indigenas/14-vn-sapa.webp",
    img2: "/images/indigenas/14-co-santa-marta.webp",
    category: "Indigenas",
    description1: {
      es: "Tres mujeres Hmong sonríen con sus telas coloridas en la cabeza.",
    },
    description2: {
      es: "Tres mujeres Kogui vestidas de blanco, en actitud serena.",
    },
  },
  {
    id: 15,
    city1: "Ha Long",
    city2: "Guatape",
    country1: "VN",
    country2: "CO",
    img1: "/images/naturaleza/15-vn-ha-long.webp",
    img2: "/images/naturaleza/15-co-guatape.webp",
    category: "Naturaleza",
    description1: {
      es: "Halong Bay: formaciones de piedra caliza emergen del agua, un paisaje mágico.",
    },
    description2: {
      es: "Guatapé: su gran embalse y la Piedra del Peñol sobre el agua.",
    },
  },
  {
    id: 16,
    city1: "Medellin",
    city2: "Saigon",
    country1: "CO",
    country2: "VN",
    img1: "/images/transporte/16-co-medellin.webp",
    img2: "/images/transporte/16-vn-saigon.webp",
    category: "Transporte",
    description1: {
      es: "Un paisano carga una montaña de cosas en su moto, con creatividad colombiana.",
    },
    description2: {
      es: "Un saigonés carga plantas y más en su moto, con ingenio vietnamita.",
    },
  },
  {
    id: 17,
    city1: "Medellin",
    city2: "Ha Noi",
    country1: "CO",
    country2: "VN",
    img1: "/images/teleranas-de-cable/17-co-medellin.webp",
    img2: "/images/teleranas-de-cable/17-vn-ha-noi.webp",
    category: "teleranas de cable",
    description1: {
      es: "Un trabajador ajusta los cables sin equipo de seguridad.",
    },
    description2: {
      es: "Un trabajador entre la telaraña de cables, sin protección.",
    },
  },
  {
    id: 18,
    city1: "Palomino",
    city2: "Hoi An",
    country1: "CO",
    country2: "VN",
    img1: "/images/naturaleza/18-co-palomino.webp",
    img2: "/images/naturaleza/18-vn-hoi-an.webp",
    category: "Naturaleza",
    description1: {
      es: "El encuentro del río Palomino y el Mar Caribe.",
    },
    description2: {
      es: "Navegación en bote de canasta en Hoi An, Vietnam.",
    },
  },
  {
    id: 19,
    city1: "Ha Noi",
    city2: "Cali",
    country1: "VN",
    country2: "CO",
    img1: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/19-vn-ha-noi.webp",
    img2: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/19-co-cali.webp",
    category: "Integracion de la naturaleza entre estructuras artificiales",
    description1: {
      es: "Los árboles ocultan la tienda a la vista.",
    },
    description2: {
      es: "Un árbol gigante proyecta su sombra en la calle.",
    },
  },
  {
    id: 20,
    city1: "Uraba",
    city2: "Sapa",
    country1: "CO",
    country2: "VN",
    img1: "/images/indigenas/20-co-uraba.webp",
    img2: "/images/indigenas/20-vn-sapa.webp",
    category: "Indigenas",
    description1: {
      es: "Indígenas de la Sierra Nevada hacen pagamento en el santuario de Monserrate.",
    },
    description2: {
      es: "Mujeres Hmong comparten té y conversación en el mercado.",
    },
  },
  {
    id: 21,
    city1: "ONIC, Bogota",
    city2: "Sapa",
    country1: "CO",
    country2: "VN",
    img1: "/images/indigenas/21-co-onic-bogota.webp",
    img2: "/images/indigenas/21-vn-sapa.webp",
    category: "Indigenas",
    description1: {
      es: "Mujeres Guna con sus elaborados bordados de mola y chaquiras.",
    },
    description2: {
      es: "Mujeres Hmong entre la niebla, con sus textiles y joyas de plata.",
    },
  },
  {
    id: 22,
    city1: "Hoi An",
    city2: "Cartagena",
    country1: "VN",
    country2: "CO",
    img1: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/22-vn-hoi-an.webp",
    img2: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/22-co-cartagena.webp",
    category: "Integracion de la naturaleza entre estructuras artificiales",
    description1: {
      es: "Las plantas trepan por tiendas y casas entre fachadas de colores vivos.",
    },
    description2: {
      es: "Cartagena colonial: balcones con flores y fachadas vibrantes.",
    },
  },
  {
    id: 23,
    city1: "Delta de Mekong",
    city2: "La Guajira",
    country1: "VN",
    country2: "CO",
    img1: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/23-vn-delta-de-mekong.webp",
    img2: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/23-co-la-guajira.webp",
    category: "Integracion de la naturaleza entre estructuras artificiales",
    description1: {
      es: "Lugares de descanso llamados 'Ca Phe Vong': hamaca de café.",
    },
    description2: {
      es: "Una serie de hamacas para los huéspedes.",
    },
  },
  {
    id: 24,
    city1: "Saigon",
    city2: "Ipiales",
    country1: "VN",
    country2: "CO",
    img1: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/24-vn-saigon.webp",
    img2: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/24-co-ipiales.webp",
    category: "Integracion de la naturaleza entre estructuras artificiales",
    description1: {
      es: "La iglesia principal de la ciudad, Saigon.",
    },
    description2: {
      es: "La iglesia principal de la ciudad, Ipiales.",
    },
  },
  {
    id: 25,
    city1: "Dak Lak",
    city2: "Cartagena",
    country1: "VN",
    country2: "CO",
    img1: "/images/comida/25-vn-dak-lak.webp",
    img2: "/images/comida/25-co-cartagena.webp",
    category: "Comida",
    description1: {
      es: "Keo Me: dulces de tamarindo y naranja, entre lo dulce y lo ácido.",
    },
    description2: {
      es: "Dulce de tamarindo: tamarindo maduro, azúcar y especias.",
    },
  },
  {
    id: 26,
    city1: "Saigon",
    city2: "Bogota",
    country1: "VN",
    country2: "CO",
    img1: "/images/comida/26-vn-saigon.webp",
    img2: "/images/comida/26-co-bogota.webp",
    category: "Comida",
    description1: {
      es: "Cơm Tấm: arroz quebrado con cerdo a la parrilla, huevo frito y encurtidos.",
    },
    description2: {
      es: "El corrientazo: arroz, frijoles, carne, plátano maduro y huevo frito.",
    },
  },
  {
    id: 27,
    city1: "Hoi An",
    city2: "Cartagena",
    country1: "VN",
    country2: "CO",
    img1: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/27-vn-hoi-an.webp",
    img2: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/27-co-cartagena.webp",
    category: "Integracion de la naturaleza entre estructuras artificiales",
    description1: {
      es: "Faroles de seda iluminan las calles nocturnas de Hoi An.",
    },
    description2: {
      es: "Luces cálidas resaltan los balcones floridos de Cartagena.",
    },
  },
  {
    id: 28,
    city1: "Saigon",
    city2: "Antioqueno",
    country1: "VN",
    country2: "CO",
    img1: "/images/comida/28-vn-saigon.webp",
    img2: "/images/comida/28-co-antioqueno.webp",
    category: "Comida",
    description1: {
      es: "Bánh chưng: pasteles de arroz glutinoso del Año Nuevo vietnamita.",
    },
    description2: {
      es: "Tamales: masa de maíz rellena de cerdo y arvejas, envueltos en hojas de plátano.",
    },
  },
  {
    id: 29,
    city1: "Saigon",
    city2: "Medellin",
    country1: "VN",
    country2: "CO",
    img1: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/29-vn-saigon.webp",
    img2: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/29-co-medellin.webp",
    category: "Integracion de la naturaleza entre estructuras artificiales",
    description1: {
      es: "Un grupo de mujeres hace ejercicio en un espacio público.",
    },
    description2: {
      es: "Un grupo de mujeres hace ejercicio en un centro comercial.",
    },
  },
  {
    id: 30,
    city1: "Medellin",
    city2: "Hanoi",
    country1: "CO",
    country2: "VN",
    img1: "/images/comida/30-co-medellin.webp",
    img2: "/images/comida/30-vn-hanoi.webp",
    category: "Comida",
    description1: {
      es: "",
    },
    description2: {
      es: "",
    },
  },
  {
    id: 31,
    city1: "Medellin",
    city2: "Hanoi",
    country1: "CO",
    country2: "VN",
    img1: "/images/comida/31-co-medellin.webp",
    img2: "/images/comida/31-vn-hanoi.webp",
    category: "Comida",
    description1: {
      es: "",
    },
    description2: {
      es: "",
    },
  },
  {
    id: 33,
    city1: "Medellin",
    city2: "Saigon",
    country1: "CO",
    country2: "VN",
    img1: "/images/transporte/33-co-medellin.webp",
    img2: "/images/transporte/33-vn-saigon.webp",
    category: "Transporte",
    description1: {
      es: "",
    },
    description2: {
      es: "",
    },
  },
  {
    id: 34,
    city1: "Salento",
    city2: "Da Nang",
    country1: "CO",
    country2: "VN",
    img1: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/34-co-salento.webp",
    img2: "/images/integracion-de-la-naturaleza-entre-estructuras-artificiales/34-vn-da-nang.webp",
    category: "Integracion de la naturaleza entre estructuras artificiales",
    description1: {
      es: "",
    },
    description2: {
      es: "",
    },
  },
  {
    id: 35,
    city1: "San Andres",
    city2: "Phu Quoc",
    country1: "CO",
    country2: "VN",
    img1: "/images/naturaleza/35-co-san-andres.webp",
    img2: "/images/naturaleza/35-vn-phu-quoc.webp",
    category: "Naturaleza",
    description1: {
      es: "",
    },
    description2: {
      es: "",
    },
  },
];
