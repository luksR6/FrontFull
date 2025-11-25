interface SpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

function Spinner({ message = "Carregando...", fullScreen = false }: SpinnerProps) {
  
  const containerClasses = fullScreen 
    ? "position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white bg-opacity-75"
    : "d-flex flex-column justify-content-center align-items-center py-5";

  const zIndexStyle = fullScreen ? { zIndex: 1050, backdropFilter: 'blur(2px)' } : {};

  return (
    <div className={containerClasses} style={zIndexStyle}>
      
      <div 
        className="spinner-border text-primary" 
        role="status" 
        style={{ width: '3rem', height: '3rem', borderWidth: '0.25em' }}
      >
        <span className="visually-hidden">Carregando...</span>
      </div>
      
      <p className="mt-3 text-muted fw-bold animate-pulse">
        {message}
      </p>

    </div>
  );
}

export default Spinner;