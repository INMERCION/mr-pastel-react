// 1. IMPORTAMOS useState y el nuevo CSS
import { useState } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "../styles/nosotros.css"; // <--- ¡Importante!

export default function Nosotros() {
  // 2. ESTADO para controlar el giro de las tarjetas
  const [isMisionFlipped, setIsMisionFlipped] = useState(false);
  const [isVisionFlipped, setIsVisionFlipped] = useState(false);

  return (
    <Container className="py-4">

      {/* --- SECCIÓN HISTORIA (Actualizada al estilo 'Récord') --- */}
      <Row className="text-center mb-5">
        <Col>
          <Card className="p-4 shadow-sm border-0 bg-light">
            <Card.Body>
              <h3 className="mb-4">Nuestra Historia</h3>
              {/* Fila interna para dividir 50/50 */}
              <Row className="g-4 align-items-center text-start">
                {/* Columna de Imagen */}
                <Col md={6}>
                  <img
                    src="/images/historia2.gif"
                    alt="Nuestra Historia"
                    className="img-fluid rounded shadow"
                  />
                </Col>
                {/* Columna de Texto */}
                <Col md={6}>
                  <p>
                    Desde 1995, <strong>Pastelería Mister Pastel</strong> ha
                    sido un verdadero referente en la repostería artesanal
                    chilena. Nacimos como un pequeño emprendimiento familiar
                    en el corazón de Santiago, impulsado por la pasión de
                    compartir momentos dulces y memorables.
                  </p>
                  <p>
                    En nuestros primeros años, elaborábamos tortas y pasteles
                    desde una cocina doméstica, atendiendo pedidos de vecinos
                    y amigos, quienes rápidamente se convirtieron en nuestros
                    primeros clientes fieles. Lo que comenzó como un sueño
                    modesto fue creciendo gracias al boca a boca y al cariño
                    de las personas que reconocieron en cada preparación el
                    sabor auténtico de lo hecho en casa.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- SECCIÓN MISIÓN Y VISIÓN (Flip Cards) --- */}
      <Row className="mb-5 g-4">
        <Col md={6}>
          <div
            className="flip-card"
            onClick={() => setIsMisionFlipped(!isMisionFlipped)}
          >
            <div
              className={`flip-card-inner ${isMisionFlipped ? "flipped" : ""}`}
            >
              <div className="flip-card-front">
                <Image src="/images/mision.jpeg" alt="Nuestra Misión" />
                <h3>Nuestra Misión</h3>
              </div>
              <div className="flip-card-back">
                <h3 className="mb-3 text-center text-danger">Nuestra Misión</h3>
                <p>
                  Nuestra misión es{" "}
                  <strong>
                    crear experiencias dulces que conecten a las personas
                  </strong>
                  . En <em>Pastelería Mister Pastel</em> no solo elaboramos
                  productos, sino que fabricamos recuerdos. Cada pastel,
                  galleta o masa hojaldrada representa un gesto de cariño...
                </p>
                <p>
                  Buscamos que cada cliente se sienta parte de nuestra familia,
                  entregando una atención cercana, cordial y personalizada...
                </p>
                <p>
                  Además, creemos firmemente en el desarrollo sustentable y la
                  responsabilidad social. Apoyamos a pequeños productores
                  locales...
                </p>
              </div>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div
            className="flip-card"
            onClick={() => setIsVisionFlipped(!isVisionFlipped)}
          >
            <div
              className={`flip-card-inner ${isVisionFlipped ? "flipped" : ""}`}
            >
              <div className="flip-card-front">
                <Image src="/images/vision.jpeg" alt="Nuestra Visión" />
                <h3>Nuestra Visión</h3>
              </div>
              <div className="flip-card-back">
                <h3 className="mb-3 text-center text-danger">Nuestra Visión</h3>
                <p>
                  Nuestra visión es{" "}
                  <strong>
                    convertirnos en la pastelería artesanal más querida y
                    reconocida de Chile
                  </strong>
                  , siendo símbolo de calidad, confianza y tradición
                  familiar...
                </p>
                <p>
                  Soñamos con un futuro donde cada persona, al pensar en
                  celebraciones, piense en nosotros...
                </p>
                <p>
                  A mediano plazo, proyectamos incorporar nuevas líneas de
                  productos saludables y gourmet...{" "}
                  <strong>“Innovar con sabor, crecer con corazón.”</strong>
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* --- SECCIÓN RÉCORD 1995 --- */}
      <Row className="text-center mb-5">
        <Col>
          <Card className="p-4 shadow-sm border-0 bg-light">
            <Card.Body>
              <h3 className="mb-4">Récord 1995: Un hito en nuestra historia</h3>
              <Row className="g-4 align-items-center text-start">
                <Col md={6}>
                  <p className="lead">
                    En 1995, año de nuestra fundación,{" "}
                    <em>Pastelería 1000 Sabores</em> obtuvo un reconocimiento
                    que marcó nuestra historia: el{" "}
                    <strong>
                      Récord Nacional de la torta más grande de Chile
                    </strong>
                    .
                  </p>
                  <p>
                    Aquel evento no solo fue una hazaña culinaria, sino también
                    un símbolo de unión comunitaria...
                  </p>
                  <p>
                    Hoy, ese logro sigue siendo un motivo de orgullo y una
                    fuente de inspiración. Nos recuerda que, más allá del
                    tamaño del pastel, lo verdaderamente grande es el corazón
                    con el que trabajamos.
                  </p>
                </Col>
                <Col md={6}>
                  <img
                    src="/images/ganador.gif"
                    alt="Récord Torta 1995"
                    className="img-fluid rounded shadow"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- SECCIÓN EQUIPO --- */}
      <h3 className="text-center mb-4">Nuestro Equipo</h3>
      <Row className="g-4 text-center">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Img
              variant="top"
              src="/images/equipo-ana.jpg"
              alt="Ana Torres - Maestra pastelera"
              className="equipo-img"
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
              className="equipo-img"
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
              className="equipo-img"
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