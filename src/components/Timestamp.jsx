import "../App.css";
import "./About.css";

export default function About() {
  const [opacity, setOpacity] = useState(0.5);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const element = document.getElementsByClassName(".timeline_container");
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const windowCenter = windowHeight / 2;

    const distance = Math.abs(windowCenter - elementCenter);
    const newOpacity = 1 - distance / (windowHeight / 2);

    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="timeline_container">
        <div className="timeline">
          {/* <div className="line"></div> */}
          <div className="timestamp">
            <div className="dot"></div>
            <div className="year">2006 - 2012</div>
          </div>
        </div>
      </div>
    </>
  );
}
