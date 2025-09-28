import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-void-primary">
      <div className="text-center">
        <h1 className="mb-8 text-display text-display-xl text-blood-accent">404</h1>
        <p className="mb-8 text-mono-prompt text-document-aged">SECTOR NOT FOUND</p>
        <p className="mb-12 text-mono text-shadow-whisper">[ REQUESTED PROTOCOL DOES NOT EXIST ]</p>
        <a 
          href="/" 
          className="text-mono-button px-8 py-4 border border-blood-accent text-blood-accent hover:bg-blood-accent hover:text-void-primary transition-all duration-200"
        >
          [ RETURN TO MAINFRAME ]
        </a>
      </div>
    </div>
  );
};

export default NotFound;
