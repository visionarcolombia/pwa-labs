import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./player.css";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import useWindowOrientation from "use-window-orientation";
import IframeResizer from "iframe-resizer-react";

export default function PlayerPage() {
  let { id,  } = useParams();
  const navigate = useNavigate();
  let decodedUrl = base64_decode(id);
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const logData = JSON.parse(localStorage.getItem("logPlayer")) || []
  const resourceSelected = logData.filter((log) => decodedUrl.includes(log.resource))
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const { orientation, portrait, landscape } = useWindowOrientation({
    defaultOrientation: resourceSelected[0].orientation.includes('horizontal') ? "landscape" : "portrait",
  });

  useEffect(() => {
    if((landscape && resourceSelected[0].orientation.includes('vertical')) || (portrait && resourceSelected[0].orientation.includes('horizontal'))){
     navigate(-1)
    }
  },[orientation])


  return (
    <Fragment>
      <div className="container-responsive">
        <IframeResizer
          log
          tolerance={1}
          resizeFrom="parent"
          scrolling={false}
          width={screenSize.dynamicWidth}
          height={screenSize.dynamicHeight - 64}
          heightCalculationMethod="documentElementOffset"
          src={decodedUrl}
        />
      </div>
    </Fragment>
  );
}
