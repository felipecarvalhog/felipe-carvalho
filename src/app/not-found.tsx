import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="conteudo" className="section">
      <div className="container-text">
        <h1>Página não encontrada</h1>
        <p className="section-lede">
          O endereço acessado não existe ou foi alterado.
        </p>
        <p style={{ marginTop: '2rem' }}>
          <Link className="btn btn-primary" href="/">
            Voltar para o início
          </Link>
        </p>
      </div>
    </main>
  );
}
