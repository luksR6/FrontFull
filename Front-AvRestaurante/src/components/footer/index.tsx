// src/components/Footer.tsx

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-3">
            <p className="mb-0">
                &copy; {new Date().getFullYear()} Lucas Rodrigues. Todos os direitos reservados.
            </p>
        </footer>
    )
}

export default Footer;