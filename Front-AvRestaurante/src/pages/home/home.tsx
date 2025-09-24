import { Link } from 'react-router-dom';
import ImgCards from '../../assets/card.jpg';

function Home() {

  return (
    <>
      <div 
        className="text-center text-white p-5 mb-5 shadow-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${ImgCards})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '1rem'
        }}
      >
        <h1 className="display-4 fw-bold">Seu Guia Para os Sabores da Cidade</h1>
        <p className="fs-4 col-md-8 mx-auto mt-3">
          Descubra, avalie e compartilhe suas experiências nos melhores restaurantes.
        </p>
        <Link to="/restaurantes" className="btn btn-primary btn-lg mt-4">
          Comece a Explorar
        </Link>
      </div>

      <div className="container my-5 py-5">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h2 className="display-5 fw-bold">Nossa Missão</h2>

            <p className="text-muted">
              O Avalioo nasceu da paixão por boa comida e da vontade de criar uma comunidade confiável. Acreditamos que a melhor recomendação vem de pessoas reais que, como você, amam descobrir novos sabores.
            </p>
            
            <p className="text-muted">
              Nossa plataforma é um espaço para você não só encontrar seu próximo restaurante favorito, mas também para ajudar outros a fazerem o mesmo. Cada avaliação contribui para construir um guia gastronômico mais rico e autêntico para todos.
            </p>
          </div>
          <div className="col-lg-5 text-center d-none d-lg-block">
             <i className="bi bi-bullseye display-1 text-primary opacity-50"></i>
          </div>
        </div>
      </div>

      <div className="container text-center my-5">
        <h2 className="mb-5">Como o Avalioo Funciona</h2>
        <div className="row">
          <div className="col-md-4">
            <i className="bi bi-search fs-1 text-primary"></i>
            <h3 className="mt-3">Descubra</h3>
            <p className="text-muted">Encontre novos lugares e veja o que a comunidade está falando.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-star-fill fs-1 text-primary"></i>
            <h3 className="mt-3">Avalie</h3>
            <p className="text-muted">Deixe sua nota e seu comentário. Sua opinião ajuda outros a escolherem.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-people-fill fs-1 text-primary"></i>
            <h3 className="mt-3">Conecte-se</h3>
            <p className="text-muted">Faça parte de uma comunidade de apaixonados por gastronomia.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;