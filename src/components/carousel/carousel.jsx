import { Alert, Box, Card, CardMedia, Container } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./carousel.css";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { apiUrl, basePath } from "../../config/api";
import useNotifications from "../../hooks/useNotification";
import ReactSession from "../../adapters/session/session";

export default function Carousel(props) {
  const { imgType } = props;
  const [token, setToken] = useState(null);
  const [, notificationsActions] = useNotifications();
  const [files, setFiles] = useState([]);
  const object = ReactSession.get("user") &&  JSON.parse(window.atob(ReactSession.get("user").split(".")[1]));
  const isAdmin = object &&  object.role[0] === 'admin';
  useEffect(() => {
    const tokenData = ReactSession.get("user");
    if (tokenData) {
      setToken(tokenData);
      handleFiles(tokenData);
    }
  }, []);

  const handleFiles = async (token) => {
    try {
      fetch(`${apiUrl}/files`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            notificationsActions.push({
              options: {
                content: (
                  <Alert
                    sx={{ backgroundColor: "#fff" }}
                    variant="outlined"
                    severity="error"
                  >
                    {`${response.status} - ${response.statusText}`}
                  </Alert>
                ),
              },
            });
          }
        })
        .then((json) => {
          if (json) {
            const filteredData = json.filter(
              (data) => (data.country === object.country) && (data.type === imgType)
            );
            setFiles(filteredData);
          }
        })
        .catch((err) => {
          notificationsActions.push({
            options: {
              content: (
                <Alert
                  sx={{ backgroundColor: "#fff" }}
                  variant="outlined"
                  severity="error"
                >
                  {err}
                </Alert>
              ),
            },
          });
        });
    } catch (error) {
      notificationsActions.push({
        options: {
          content: (
            <Alert
              sx={{ backgroundColor: "#fff" }}
              variant="outlined"
              severity="error"
            >
              {error}
            </Alert>
          ),
        },
      });
    }
  };
  return (
    <Fragment>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card>
            <img
              loading="lazy"
              src={
                files.length > 0
                  ? `${basePath}/media/${files[0].url}`
                  : "https://app-acino.com/media/banner-1.jpg"
              }
            />
          </Card>
        </SwiperSlide>
      </Swiper>
    </Fragment>
  );
}
