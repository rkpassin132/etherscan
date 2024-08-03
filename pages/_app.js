import "../styles/globals.css";
import { EtherProvider } from "../Context/Ethere";

// INTERNAL IMPORT
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const MyApp = ({ Component, pageProps }) => {
  return (
    <EtherProvider>
    <div className="position">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  </EtherProvider>
  );
};

export default MyApp;
