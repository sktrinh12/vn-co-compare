export interface ImgDataInterface {
  id: number;
  city1: string;
  city2: string;
  img1: string;
  img2: string;
  category: string;
  country1: string;
  country2: string;
  description1: string;
  description2: string;
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
    description1:
      "Postes esqueléticos sostienen un caos de cables negros, una telaraña eléctrica sobre motos zigzagueantes.",
    description2:
      "Postes esqueléticos sostienen un caos de cables negros, una telaraña eléctrica sobre carros y motos zigzagueantes.",
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
    description1:
      "Foto aérea de una calle: una motociclista navega bajo una maraña de cables. Los postes y las sombras tejen un cielo urbano sobre el asfalto vibrante.",
    description2:
      "Desde abajo, los cables crean un laberinto contra el cielo. Al fondo, árboles verdes equilibran lo industrial y lo natural.",
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
    description1:
      "Vista de nivel de una calle que contiene muchos postes esqueléticos.",
    description2: "",
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
    description1:
      "Un poste de teléfono cubierto de cables enredados se convierte en el centro de una escena caótica y llena de vida.",
    description2:
      "Un poste de teléfono se alza como una telaraña de cables, testigo silencioso del ritmo vibrante y la energía de la vida cotidiana en la costa caribeña.",
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
    description1:
      "Un parqueadero subterraneo, algo comun abajo de los centro comerciales y lleno de motos.",
    description2:
      "Un parqueadero abierto o al aire libre que esta arriba tambien es comun en los centro comerciales.",
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
    description1:
      "Bajo un centro comercial en Colombia, un parqueadero subterráneo bañado por luces fluorescentes alberga filas de motos. Su diseño práctico y moderno, similar al de Vietnam, muestra cómo dos culturas distintas comparten soluciones urbanas para el transporte masivo.",
    description2:
      "Un parqueadero subterráneo iluminado por luces fluorescentes, está repleto de motos alineadas en perfecto orden. Su arquitectura funcional y minimalista refleja la eficiencia urbana de un país donde las motos son el corazón del transporte.",
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
    description1:
      "Un mar de motos, la mayoría descompuestas o abandonadas, se extiende sin orden, asi es un desguace de motos.",
    description2:
      "Cientos de motos, muchas rotas o inservibles, se amontonan en un espacio desordenado. Una escena que parece un desguace improvisado.",
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
    description1:
      "El conductor de la moto se ajusta el casco, mientras lleva a su familia; son tres-papá, mamá y su hija—en un viaje cotidiano. Los pasajeros no llevan casco, pero la escena refleja la movilidad audaz y rápida que caracteriza la vida en las calles colombianas.",
    description2:
      "El conductor se pone el casco mientras tres chicos comparten la misma moto. Los otros dos no llevan protección, pero avanzan con confianza en medio del tráfico caótico, mostrando la rapidez y audacia que define la movilidad urbana en este país.",
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
    description1:
      "Calle saturada: motos superan a los carros, pilotos con cascos integrales luchan por espacio. El tráfico es una masa de metal y ruido, sin respiro.",
    description2:
      "Puente abarrotado: motos fluyen como un río, cascos minimalistas sobre rostros libres. Menos carros, más cuerpos en movimiento. Dos ciudades, un idioma: las motos gobiernan el asfalto.",
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
    description1:
      "Calle invisible bajo un mar de motos y carros: luces de neón, faros y tiendas iluminan la noche. Edificios observan el caos desde la derecha. El asfalto desaparece entre el hormiguero de metal.",
    description2:
      "Río de motos bajo luces vibrantes: cascos minimalistas, tiendas abarrotando ambos lados. El tráfico fluye con ritmo frenético pero calculado. La noche asiática brilla con caos organizado.",
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
    description1:
      "Un padre lleva a su familia en moto—tres niñas y la madre—por una calle de barrio, quizás regresando a casa. Solo el padre y la madre llevan casco, pero la madre no lo abrocha, y las niñas no usan protección alguna. La escena refleja la realidad de muchas familias que dependen de las motos para su movilidad diaria, a pesar de los riesgos.",
    description2:
      "Una familia de tres—padre, madre e hijo—viaja junta en moto, todos con casco puesto. El niño, como es común, va sentado entre los adultos. Esta imagen muestra un viaje cotidiano, donde la seguridad es prioridad, pero también resalta la adaptabilidad y la unión familiar en medio del tráfico urbano.",
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
    description1:
      "El Banh Xeo, una delicia vietnamita: crujientes crepas de arroz rellenas de camarones, cerdo, brotes de soja y hierbas frescas, servidas con salsa de pescado. Un festín de texturas y sabores en cada bocado.",
    description2:
      "La arepa, un ícono colombiano: suaves o doradas, rellenas de queso, carne, huevo o simplemente con mantequilla. Un deleite versátil que une tradición y sabor en cada mordisco.",
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
    description1:
      "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    description2:
      "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
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
    description1:
      "Tres mujeres Hmong de Sapa, Vietnam, aparecen sonriendo; lucen sus telas coloridas envueltas alrededor de sus cabezas.",
    description2:
      "Tres mujeres Kogui de la Sierra Nevada de Santa Marta están sentadas en actitud serena y reflexiva. Visten ropa blanca tradicional, tejida con fibras naturales, que simboliza la pureza y la conexión con su entorno sagrado.",
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
    description1:
      "Halong Bay es un paisaje natural impresionante en Vietnam, famoso por sus formaciones rocosas de piedra caliza que emergen del agua. Sus islas flotantes crean un ambiente mágico y tranquilo, ideal para paseos en bote.",
    description2:
      "Guatapé es conocido por su gran embalse y las impresionantes formaciones rocosas, como la Piedra del Peñol, que se eleva sobre el agua. El paisaje es espectacular, con montañas y cuerpos de agua rodeados de rocas.",
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
    description1:
      "Un paisano lleva una montaña de cosas encima de su moto—quién sabe qué serán—mientras otra persona en moto pasa a su lado, yendo en dirección opuesta. La escena refleja la habilidad y creatividad de los colombianos para transportar lo inimaginable en sus motos.",
    description2:
      "Un saigonés carga plantas y otras cosas encima de su moto, mientras otra persona en moto cruza a su lado, yendo en dirección opuesta. Esta imagen captura la destreza y el ingenio de los vietnamitas para mover todo tipo de objetos en medio del bullicio urbano.",
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
    description1:
      "Un trabajador ajusta la telaraña de cables, pero llama la atención la falta de equipo de seguridad, destacando los desafíos cotidianos en el mantenimiento de la infraestructura urbana.",
    description2:
      "Un trabajador se adentra en la telaraña de cables, como si sin equipo de seguridad.",
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
    description1: "El encuentro del río Palomino y el Mar Caribe",
    description2: "Navegación en bote de canasta en Hoi An, Vietnam",
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
    description1: "Los arboles ocultan la tienda de la vista.",
    description2: "Un arbol gigante proyecta una sombra en la calle.",
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
    description1:
      "Indígenas de la Sierra Nevada de Santa Marta hacen pagamento en el santuario de Monserrate.",
    description2:
      "Mujeres Hmong reuniéndose para el té y la conversación en el vibrante mercado",
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
    description1:
      "Identidad y tradición vivas: mujeres Guna luciendo sus elaborados bordados de mola, chaquiras y colores característicos.",
    description2: "Tradición entre la niebla: mujeres Hmong en las montañas de Sa Pa, Vietnam, con sus distintivos textiles y joyas de plata",
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
    description1:
      "Las plantas trepan y cuelgan de las tiendas y casas, mezclando verdes exuberantes con los colores brillantes y vivos de las fachadas, creando un paisaje lleno de vida y armonía",
    description2:
      "El encanto colonial de Cartagena: balcones llenos de flores y fachadas vibrantes que narran historias de color y tradición",
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
    description1:
      "lugares de descana para viajeros que se llamaen, 'Ca Phe Vong', se traduce a hamaca de cafe",
    description2: "Una serie de hamacas para los huespedes",
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
    description1: "La iglesia principal de la ciudad, Saigon",
    description2: "La iglesia principal de la ciudad, Ipiales",
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
    description1:
      "El Keo Me, un dulce tradicional vietnamita: caramelos suaves y pegajosos hechos de tamarindo y naranjas chinas, con un equilibrio perfecto entre lo dulce y lo ácido.",
    description2:
      "El dulce de tamarindo, una joya colombiana: una mezcla de tamarindo maduro, azúcar y especias, creando un sabor único que combina lo dulce, lo ácido. Tambien el bocadillo ",
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
    description1:
      "El Cơm Tấm, un plato emblemático de Vietnam: arroz quebrado servido con cerdo a la parrilla, huevo frito, pepinillos encurtidos y salsa de pescaz dulce. Una combinación de texturas y sabores que captura la autenticidad de la gastronomía vietnamita.",
    description2:
      "El corrientazo, un clásico de la comida colombiana: un plato abundante y reconfortante que incluye arroz, frijoles, carne, plátano maduro, ensalada y huevo frito. Una explosión de sabores que representa la esencia de la cocina casera colombiana",
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
    description1:
      "Faroles de seda iluminan las calles de Hoi An, donde la arquitectura colonial y las plantas trepadoras crean un ambiente mágico bajo la noche estrellada.",
    description2:
      "Luces cálidas iluminan las calles de Cartagena, resaltando balcones llenos de flores y fachadas coloridas, uniendo naturaleza y arquitectura colonial en un escenario encantador.",
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
    description1:
      "Bánh chưng, estos deliciosos pasteles de arroz glutinoso que son verdaderos emblemas culinarios del Año Nuevo vietnamita.",
    description2:
      "Tamales contiene bollo de harina de maíz relleno con carne de cerdo y arvejas, envuelto en hojas de plátano",
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
    description1:
      "Un grupo de mujeres hacen ejercicio en un espacio publico afuera.",
    description2:
      "Un group de mujeres hacen ejercicio en un centro comericial.",
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
    description1: "",
    description2: "",
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
    description1: "",
    description2: "",
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
    description1: "",
    description2: "",
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
    description1: "",
    description2: "",
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
    description1: "",
    description2: "",
  },
];
