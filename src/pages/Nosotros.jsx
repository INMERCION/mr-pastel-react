// src/pages/Nosotros.jsx
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Nosotros() {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Nosotros</h1>

      {/* Nuestra Historia */}
      <Row className="mb-5 align-items-center">
        <Col md={6}>
          <img
            src="/images/local-antiguo.jpeg"
            alt="Pastelería 1000 Sabores en 1995"
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={6}>
          <h3 className="mb-3">Nuestra Historia</h3>
          <p>
            Desde 1995, <strong>Pastelería 1000 Sabores</strong> ha sido un
            verdadero referente en la repostería artesanal chilena. Nacimos como
            un pequeño emprendimiento familiar en el corazón de Santiago,
            impulsado por la pasión de compartir momentos dulces y memorables.
            En nuestros primeros años, elaborábamos tortas y pasteles desde una
            cocina doméstica, atendiendo pedidos de vecinos y amigos, quienes
            rápidamente se convirtieron en nuestros primeros clientes fieles. Lo
            que comenzó como un sueño modesto fue creciendo gracias al boca a
            boca y al cariño de las personas que reconocieron en cada
            preparación el sabor auténtico de lo hecho en casa.
          </p>
          <p>
            A lo largo de los años, nuestra pastelería ha evolucionado junto a
            la comunidad que nos rodea. Mantuvimos intactas nuestras recetas
            tradicionales —heredadas de generaciones anteriores— y las
            complementamos con nuevas técnicas de repostería moderna, explorando
            sabores, texturas y presentaciones que cautivan a grandes y pequeños.
            Incorporamos insumos de primera calidad, priorizando siempre
            ingredientes frescos, locales y naturales, porque creemos que la
            excelencia se logra cuando se combina la tradición con la innovación.
          </p>
          <p>
            Hoy, más de tres décadas después, continuamos fieles a nuestros
            valores originales. Nuestros maestros pasteleros siguen elaborando
            cada producto de manera artesanal, cuidando cada detalle desde la
            mezcla hasta la decoración final. Sin embargo, también miramos hacia
            el futuro con entusiasmo: hemos integrado herramientas digitales,
            capacitaciones profesionales y un compromiso sostenido con la
            innovación gastronómica. Así,{" "}
            <em>Pastelería 1000 Sabores</em> sigue siendo sinónimo de calidad,
            cercanía y dedicación, manteniendo viva la esencia que nos vio nacer
            en 1995: <strong>“Endulzar la vida de quienes confían en nosotros,
            un pastel a la vez.”</strong>
          </p>
        </Col>
      </Row>

      {/* Misión y Visión */}
      <Row className="mb-5">
        <Col md={6}>
          <h3 className="mb-3">Nuestra Misión</h3>
          <p>
            Nuestra misión es <strong>crear experiencias dulces que conecten a
            las personas</strong>. En <em>Pastelería 1000 Sabores</em> no solo
            elaboramos productos, sino que fabricamos recuerdos. Cada pastel,
            galleta o masa hojaldrada representa un gesto de cariño hacia
            quienes celebran la vida. Por eso, trabajamos con recetas
            cuidadosamente seleccionadas, ingredientes frescos y un compromiso
            inquebrantable con la calidad.
          </p>
          <p>
            Buscamos que cada cliente se sienta parte de nuestra familia,
            entregando una atención cercana, cordial y personalizada. Nos motiva
            el deseo de innovar constantemente, adaptándonos a los gustos
            actuales sin perder la esencia artesanal que nos caracteriza. Desde
            la elección del chocolate más fino hasta la decoración final de cada
            torta, nuestro equipo se esfuerza por ofrecer una experiencia única,
            llena de sabor y emoción.
          </p>
          <p>
            Además, creemos firmemente en el desarrollo sustentable y la
            responsabilidad social. Apoyamos a pequeños productores locales,
            reducimos el uso de plásticos y promovemos el comercio justo. Así,
            nuestra misión no se limita a endulzar los paladares, sino también a
            contribuir positivamente con nuestra comunidad y con el planeta.
          </p>
        </Col>

        <Col md={6}>
          <h3 className="mb-3">Nuestra Visión</h3>
          <p>
            Nuestra visión es <strong>convertirnos en la pastelería artesanal
            más querida y reconocida de Chile</strong>, siendo símbolo de
            calidad, confianza y tradición familiar. Queremos expandir el legado
            de <em>1000 Sabores</em> más allá de Santiago, llegando a nuevas
            regiones y generaciones sin perder la cercanía que nos distingue.
          </p>
          <p>
            Soñamos con un futuro donde cada persona, al pensar en
            celebraciones, piense en nosotros. Deseamos ser parte de los
            momentos más importantes de la vida de nuestros clientes:
            cumpleaños, aniversarios, graduaciones o simples reuniones
            familiares. Cada uno de esos instantes merece un toque dulce, y
            queremos ser quienes lo hagan posible.
          </p>
          <p>
            A mediano plazo, proyectamos incorporar nuevas líneas de productos
            saludables y gourmet, sin perder nuestro enfoque artesanal.
            Aspiramos también a fortalecer la formación continua de nuestro
            equipo, impulsando la creatividad, la técnica y el amor por la
            pastelería. Nuestra visión se resume en una frase:{" "}
            <strong>“Innovar con sabor, crecer con corazón.”</strong>
          </p>
        </Col>
      </Row>

      {/* Récord 1995 */}
      <Row className="text-center mb-5">
        <Col>
          <Card className="p-4 shadow-sm border-0 bg-light">
            <Card.Body>
              <h3 className="mb-3">Récord 1995: Un hito en nuestra historia</h3>
              <p className="lead">
                En 1995, año de nuestra fundación, <em>Pastelería 1000
                Sabores</em> obtuvo un reconocimiento que marcó nuestra historia:
                el <strong>Récord Nacional de la torta más grande de Chile</strong>.
                Fue una jornada inolvidable en la que más de 800 vecinos se
                reunieron en la plaza central para compartir un pastel de frutas
                de 2,5 metros de diámetro, elaborado completamente de forma
                artesanal.
              </p>
              <p>
                Aquel evento no solo fue una hazaña culinaria, sino también un
                símbolo de unión comunitaria. Familias enteras participaron en
                la preparación, decoración y distribución del pastel, que se
                convirtió en un emblema de trabajo colaborativo y alegría
                colectiva. La noticia recorrió medios locales y nacionales, y
                desde entonces, ese récord quedó grabado como una muestra de lo
                que somos capaces de lograr cuando mezclamos pasión, esfuerzo y
                espíritu familiar.
              </p>
              <p>
                Hoy, ese logro sigue siendo un motivo de orgullo y una fuente de
                inspiración. Nos recuerda que, más allá del tamaño del pastel,
                lo verdaderamente grande es el corazón con el que trabajamos.
                Cada año conmemoramos aquel momento con una jornada especial de
                degustación gratuita, donde revivimos el espíritu de 1995 y
                reafirmamos nuestro compromiso con la comunidad que nos vio
                crecer.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Equipo */}
      <h3 className="text-center mb-4">Nuestro Equipo</h3>
      <Row className="g-4 text-center">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img
              variant="top"
              src="/images/equipo-ana.jpg"
              alt="Ana Torres - Maestra pastelera"
            />
            <Card.Body>
              <Card.Title>Ana Torres</Card.Title>
              <Card.Text>Maestra pastelera y fundadora</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img
              variant="top"
              src="/images/equipo-pablo.jpeg"
              alt="Pablo Díaz - Chef repostero"
            />
            <Card.Body>
              <Card.Title>Pablo Díaz</Card.Title>
              <Card.Text>
                Chef repostero especializado en tortas fondant
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img
              variant="top"
              src="/images/equipo-camila.jpeg"
              alt="Camila Reyes - Diseñadora de postres"
            />
            <Card.Body>
              <Card.Title>Camila Reyes</Card.Title>
              <Card.Text>Diseñadora de postres y decoraciones</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
